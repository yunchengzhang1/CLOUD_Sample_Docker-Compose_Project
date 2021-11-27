import React from 'react';
import { BattleList } from './BattleList';
import { BattleCreator } from './BattleCreator';
import { BattleLog } from './BattleLog';
import './styles/BattlePage.css'
import { MessageBox } from './MessageBox';
import { Repository } from './api';
export class BattlePage extends React.Component {
    repository = new Repository();
    state = {
        activeBattle: {},
        battles: []
    };

    addBattle(battle){
        this.setState(prevState => {
            let battles = prevState.battles;
            console.log(battles);
            battles.push(battle);
            return{battles}
        })
    }

    setActiveBattle(battleID) {
        console.log(battleID);
        let battle = this.searchBattleID(battleID);
        console.log(battle[0]);
        this.setState({activeBattle: battle[0]});
    }

    searchBattleID(battleID){
        return this.state.battles.filter(battle => {
            return battle.id === battleID;
        })
    }
    
    setUserID(userID){
        this.setState({currentUserID: userID});
        this.setState({loggedIn: true})
    }
    sendMessage(text) {
        this.repository.postMessage();
    }

    render() {
        return <div>
            <div className="sidebar">
                <div>
                    <BattleList onBattleSelected={battleID => this.setActiveBattle(battleID)} battles={this.state.battles}/>
                    <BattleCreator onBattleAdded={ battle => this.addBattle(battle)} userID={this.state.currentUserID}/>
                </div>
            </div>
            <div className="battleLog">
                <div>
                    <BattleLog battleID={this.state.activeBattle.id} />
                    {this.state.activeBattle.userID1 === this.props.userId && (
                        <MessageBox activeBattleID={this.state.activeBattle.id} userID={this.state.currentUserID} onMessageSent={text => this.sendMessage(text)}/>
                    )}
                </div>
            </div>
        </div>
    }
}