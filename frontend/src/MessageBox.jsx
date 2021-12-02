import React from "react";
import { Repository } from "./api";
import { Message } from "./models/Message";
import './styles/BattleLog.css';
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
        const message={
            battleID: this.props.activeBattleID,
            message: this.state.text,
            senderName: userName,
            senderID: userID,
            timestamp: Date.now()
        }
        this.repository.postMessage(message);
        console.log("sent ", message);
    }

    render() {
        return <div>
            <h2 id="battle-log-text">Send a Message!</h2>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="inputMessage" id="battle-log-text">Message</label>
                <input type="text" className="form-control" id="inputMessage" value={this.state.text} onChange={this.handleChange}/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    }
}