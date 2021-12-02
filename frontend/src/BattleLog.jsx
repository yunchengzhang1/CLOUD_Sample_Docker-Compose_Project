import React, { useEffect, useState } from "react";
import { Repository } from "./api";
import './styles/BattleLog.css';
import axios from 'axios';
import equal from 'fast-deep-equal'

export class BattleLog extends React.Component{
    repository = new Repository();
    // [messages, setMessages] = useState(undefined);
    state = {
        messages:[],
        userID1: "",
        userID2: ""
    }

    componentDidUpdate(prevProps) {
        
        if (!equal (this.props.battleID, prevProps.battleID)){
            this.updateMessages();
            
        }
    }

    async componentDidMount(){
            await this.repository.getMessagesById(this.props.battleID)
            .then(
                x =>{
                    console.log("messagesbyID returns", x)
                    this.setState({messages: x});
                }
            )

    }

    async updateMessages(){
        console.log("update messages");

        await this.repository.getMessagesById(this.props.battleID)
            .then(
                x =>{
                    this.setState({messages: x});
                    console.log("messagesbyID returns", x)
                }
            )
        console.log("before Render");
    }
    
    render(){
        if(this.props.battleID === undefined){
            return <div id="battle-log-text">No Battle Selected</div>
        }
        if(this.state.messages === undefined){
            return <div id="battle-log-text">No Messages</div>
        }
        console.log("rendering", this.state.messages)
        return <div>
        <h2 id="battle-log-text" >Battle Log</h2>
        <div className="list-group">
            {
                this.state.messages.map(x => 
                    <div className="message-card">
                        <div className="card text-white">
                            {/* {x.message.senderID === this.state.userID1 &&
                                <h4 id="user1" className="card-title">{x.message}</h4>
                            }
                            {x.message.senderID === this.state.userID2 &&
                                <h4 id="user2" className="card-title">{x.message}</h4>
                            } */}
                            <h4 id="user2" className="card-title">{x.message}</h4>
                            
                        </div>
                    </div>
                )
            }
        </div>
    </div>
    }
    
};