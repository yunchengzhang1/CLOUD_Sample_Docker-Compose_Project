import React, { useEffect, useState } from "react";
import { Repository } from "./api";
import './styles/BattleLog.css';
import axios from 'axios';
import equal from 'fast-deep-equal'
import { BattleMessage } from "./BattleMessage";

export class BattleLog extends React.Component {
    repository = new Repository();
    // [messages, setMessages] = useState(undefined);
    state = {
        username1: "undefined",
        username2: "undefined"
    }
    async componentDidMount() {
        var url = "http://ec2-52-15-121-86.us-east-2.compute.amazonaws.com:8000"
        let append1 = "/?userID=" + this.props.battle.user1;
        let append2 = "/?userID=" + this.props.battle.user2;
        await axios.get(`${url}/getuserbyid` + append1, this.config)
            .then(x => {
                console.log("getuserbyid", x.data);
                if (x.data[0]) {
                    this.setState({ username1: x.data[0].username })
                }
            }).catch();
        await axios.get(`${url}/getuserbyid` + append2, this.config)
            .then(x => {
                console.log("getuserbyid", x.data);
                if (x.data[0]) {
                    this.setState({ username2: x.data[0].username })
                }
            }).catch();

    }

    onUpdateScore(){
        this.props.onUpdateScore();
    }

    render() {
        if (this.props.battle.battleID === undefined) {
            return <div id="battle-log-text">No Battle Selected</div>
        }
        if (this.props.messages === undefined) {
            return <div id="battle-log-text">No Messages</div>
        }
        console.log("rendering", this.props.messages)
        return <div className="list-messages">

            <h2 id="battle-log-text" >{this.props.battle.battleTopic} Battle Log</h2>

            <div className="list-group">
                {
                    this.props.messages.map(x =>
                        <BattleMessage onUpdateScore={() => this.onUpdateScore()} username1={this.state.username1} username2={this.state.username2} battle={this.props.battle} message={x} userID={this.props.userID}></BattleMessage>
                        // <div className="message-card">
                        //     <div className="card text-white">
                        //         {this.props.battle.user1 === x.userID &&
                        //         <div>
                        //             <button onClick={() => this.handleLike()} className="like-button">{heart}</button>
                        //             <div id="user1" >
                        //                 <h5 >{this.state.username1}</h5>
                        //                 <h4 className="card-title">{x.message}</h4>
                        //             </div>
                        //         </div> 
                        //         }
                        //         {this.props.battle.user2 === x.userID &&
                        //         <div>
                        //             <button onClick={() => this.handleLike()} className="like-button">{heart}</button>
                        //             <div id="user2" >
                        //                 <h5 >{this.state.username2}</h5>
                        //                 <h4 className="card-title">{x.message}</h4>
                        //             </div>
                        //         </div> 
                        //         }
                        //     </div>
                        // </div>
                    )
                }
            </div>
        </div>
    }

};