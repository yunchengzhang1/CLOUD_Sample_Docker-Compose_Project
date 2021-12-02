import { Repository } from './api';
import React from 'react';
import axios from 'axios';

export class BattleMessage extends React.Component {
    repository = new Repository();
    state = {
        likedByUser: false
    }

    handleLike() {
        this.setState({ likedByUser: !this.state.likedByUser })
        if (!this.state.likedByUser) {
            console.log("liking message")
            this.repository.likeMessage(this.props.message.messageID, this.props.userID)
        }
        else {
            console.log("unliking message")
            this.repository.unlikeMessage(this.props.message.messageID, this.props.userID)
        }
        this.props.onUpdateScore();
    }

    render() {
        var heart;
        if (this.state.likedByUser === false) {
            heart = '\u2661';
        }
        if (this.state.likedByUser === true) {
            heart = '\u2764';
        }
        return <div className="message-card">
            <div className="card text-white">
                {this.props.battle.user1 === this.props.message.userID &&
                    <div>
                        <button onClick={() => this.handleLike()} className="like-button">{heart}</button>
                        <div id="user1" >
                            <h5 >{this.props.username1}</h5>
                            <h4 className="card-title">{this.props.message.message}</h4>
                        </div>
                    </div>
                }
                {this.props.battle.user2 === this.props.message.userID &&
                    <div>
                        <button onClick={() => this.handleLike()} className="like-button">{heart}</button>
                        <div id="user2" >
                            <h5 >{this.props.username2}</h5>
                            <h4 className="card-title">{this.props.message.message}</h4>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
}