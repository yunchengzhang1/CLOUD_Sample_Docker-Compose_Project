import React from "react";
import equal from 'fast-deep-equal'
import './styles/MessageArea.css';
import axios from "axios";
import { Repository } from "./api";
import { BattleLog } from './BattleLog';
import { MessageBox } from './MessageBox';
import { ScoreBoard } from "./ScoreBoard";
export class MessageArea extends React.Component {
    repository = new Repository();
    state = {
        messages: [],
        user1Score: 0,
        user2Score: 0,
    };

    componentDidUpdate(prevProps) {

        if (!equal(this.props.battle.battleID, prevProps.battle.battleID)) {
            this.updateMessages();

        }
    }

    async componentDidMount() {
        await this.repository.getMessagesById(this.props.battle.battleID)
            .then(
                x => {
                    console.log("messagesbyID returns", x)
                    this.setState({ messages: x });
                }
            ).catch();

    }

    async updateMessages() {
        await this.repository.getMessagesById(this.props.battle.battleID)
            .then(
                x => {
                    this.setState({ messages: x });
                    console.log("messagesbyID returns", x)
                }
            ).catch();
    }

    async updateScore() {
        console.log("updating Score");
        let url = "http://localhost:8000"
        let promises = [];
        for(var i = 0; i < this.state.messages.length; i++){
            let append = "/?battleID=" + this.state.messages[i].battleID + "&userID=" + this.props.battle.user1;
            promises.push(
                axios.get(`${url}/getbattlescore`+append, this.config).then(response => {
                    console.log(response.data);
                })
            )
        }
        Promise.all(promises);

    //     var score1 =0;
    //     var score2 =0;
    //     var score =0;
    //     for(var i = 0; i < this.state.messages.length; i++){
    //         if(this.state.messages[i].userID === this.props.battle.user1){
    //             await this.repository.getBattleScore(this.state.messages[i].messageID, this.props.battle.user1).then(x => {
    //                 var score = x.data;
    //                 console.log("score", x.data)
    //                 score1 = score1 + score
    //             })
    //         }
    //         //this.repository.getBattleScore(messages[i].messageID, this. props)
    //     }
    //     console.log("score1", score1)
    //    //this.repository.getBattleScore()
    }

    render() {
        console.log(this.props.battle.user1)
        console.log(this.props.userID)
        if (this.props.battle.user1 === this.props.userID || this.props.battle.user2 === this.props.userID) {
            console.log("got here");
            return <div>
                <div>
                    <BattleLog onUpdateScore={() => this.updateScore()} userID={this.props.userID} battle={this.props.battle} messages={this.state.messages} />
                </div>
                <MessageBox activeBattleID={this.props.battle.battleID} userID={this.props.userID} onMessageSent={text => this.sendMessage(text)} />
                <ScoreBoard user1Score={this.state.user1Score} user2Score={this.state.user2Score}></ScoreBoard>
            </div>
        }
        return <div>
            <BattleLog userID={this.props.userID} battle={this.props.battle} messages={this.state.messages} />
        </div>
    }
}