import React from "react";
import { Repository } from "./api";
import './styles/BattleLog.css';
import {Message} from './models/Message'
export class MessageBox extends React.Component {
    repository = new Repository();
    state = {
        text: ""
    };

    sendMessage = (e) => {
        e.preventDefault();
        this.props.onMessageSent(this.state.text);
        this.setState({text: ""});
    }
    handleChange = (e) => {
        this.setState({text: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const userID = this.props.userID;
        var userName = "";
        this.repository.getUserById(userID).then(x => {
            userName = x.userName;
        })
        console.log(userName);
        //use real message object here
        let message = new Message(
            (Date.now().toString(36) + Math.random().toString(36)),
            this.props.activeBattleID,
            this.state.text,
            userName,
            userID,
            Date.now()
        );
        this.repository.postMessage(message);
        console.log("sent ", message);
        this.setState({text: ""});
    }

    render() {
        return <div className = "message">
            <h2 id="battle-log-text">Send a Message!</h2>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="inputMessage" id="battle-log-text">Message</label>
                <input type="text" className="form-control" id="inputMessage" value={this.state.text} onChange={this.handleChange}/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    }
}