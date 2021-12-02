import React, { useEffect, useState } from "react";
import { Repository } from "./api";
import './styles/BattleLog.css';
import axios from 'axios';
import equal from 'fast-deep-equal'

export class BattleLog extends React.Component{
    repository = new Repository();
    // [messages, setMessages] = useState(undefined);
    state = {
        userID1: "",
        userID2: ""
    }
    
    render(){
        if(this.props.battle.battleID === undefined){
            return <div id="battle-log-text">No Battle Selected</div>
        }
        if(this.props.messages === undefined){
            return <div id="battle-log-text">No Messages</div>
        }
        console.log("rendering", this.props.messages)
        return <div>
        <h2 id="battle-log-text" >{this.props.battle.battleTopic} Battle Log</h2>
        <div className="list-group">
            {
                this.props.messages.map(x => 
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