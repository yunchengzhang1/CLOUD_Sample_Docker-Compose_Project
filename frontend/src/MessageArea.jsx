import React from "react";
import equal from 'fast-deep-equal'
import './styles/MessageArea.css';
import { Repository } from "./api";
import { BattleLog } from './BattleLog';
import { MessageBox } from './MessageBox';
export class MessageArea extends React.Component {
    repository = new Repository();
    state = {
        messages: []
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
            )

    }

    async updateMessages() {
        await this.repository.getMessagesById(this.props.battle.battleID)
            .then(
                x => {
                    this.setState({ messages: x });
                    console.log("messagesbyID returns", x)
                }
            )
    }

    render() {
        console.log(this.props.battle.user1)
        console.log(this.props.userID)
        if (this.props.battle.user1 === this.props.userID) {
            console.log("got here");
            return <>
                <div id="rhs">
                    <BattleLog userID={this.props.userID} battle={this.props.battle} messages={this.state.messages} />
                </div>
                <MessageBox activeBattleID={this.props.battle.battleID} userID={this.props.userID} onMessageSent={text => this.sendMessage(text)} />
            </>
        }
        return <div id="lhs">
            <BattleLog userID={this.props.userID} battle={this.props.battle} messages={this.state.messages} />
        </div>
    }
}