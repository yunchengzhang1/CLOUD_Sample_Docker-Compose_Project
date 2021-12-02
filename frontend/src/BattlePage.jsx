import React from 'react';
import { BattleList } from './BattleList';
import { BattleCreator } from './BattleCreator';
import { BattleLog } from './BattleLog';
import './styles/BattlePage.css'
import { MessageBox } from './MessageBox';
import { Repository } from './api';

import { Redirect } from 'react-router-dom';

export class BattlePage extends React.Component {
    repository = new Repository();
    state = {
        activeBattle: {},
        battles: []
    };

    async addBattle(battle) {
        await this.repository.addBattle(battle);
        await this.repository.getBattles().then(x => {
            console.log(x.data);
            this.setState({battles: x.data})
        });
    }

    setActiveBattle(battleID) {
        console.log("Selected battleID", battleID);
        let battle = this.searchBattleID(battleID);
        console.log(battle[0]);
        this.setState({activeBattle: battle[0]});
    }

    searchBattleID(battleID){
        return this.state.battles.filter(battle => {
            return battle.battleID === battleID;
        })

    }

    setUserID(userID){
        this.setState({currentUserID: userID});
        this.setState({loggedIn: true})
    }
    sendMessage(text) {
        this.repository.postMessage(text);
    }
    async updateBattles() {
        await this.repository.getBattles().then(x => {
            console.log(x.data);
            this.setState({battles: x.data})});
    }
    handleChange = async (event) => {
        await this.setState({
            battles: this.repository.getBattles()
        })
        console.log("onchange triggered")
    }

    render() {
        if(!this.props.isAuthenticated){
            console.log("authenticated");
            return <Redirect to="/"></Redirect>
        }
        return <div id="battle-page">
            <div className="topnav">
                {/*<img class = "navLogo" src="imageurl" alt="logo for top navbar"/>*/}
                <h1>*Flame War*</h1>
                {/*<img className="loginPic" src="https://via.placeholder.com/55" alt="login pic"/>*/}
                {/*<h2>{this.props.username}</h2>*/}
            </div>
            <div className="sidebar">
                <div>
                    <BattleCreator onBattleAdded={ battle => this.addBattle(battle)} userID={this.props.userID}/>
                    <BattleList onUpdateBattles={() => this.updateBattles()} userID={this.props.userID} onBattleSelected={battleID => this.setActiveBattle(battleID)} battles={this.state.battles}/>
                </div>
            </div>
            <div className="battleLog">
                <div>
                    <BattleLog battleID={this.state.activeBattle.battleID} />
                    {this.state.activeBattle.userID1 === this.props.userId && (
                        <MessageBox activeBattleID={this.state.activeBattle.battleID} userID={this.state.currentUserID} onMessageSent={text => this.sendMessage(text)}/>
                    )}
                </div>
            </div>
        </div>
    }
    async componentDidMount() {
        console.log("setting state")
        this.repository.getBattles().then(x => {
            console.log(x.data);
            this.setState({battles: x.data})});
    }
}