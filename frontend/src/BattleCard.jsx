import { Repository } from './api';
import React from 'react';
import axios from 'axios';

export class BattleCard extends React.Component {
    repository = new Repository();
    state = {
        username1: "undefined",
        username2: "undefined"
    }

    async componentDidMount() {
        var url = "http://localhost:8000"
        let append1 = "/?userID=" + this.props.battle.user1;
        let append2 = "/?userID=" + this.props.battle.user2;
        await axios.get(`${url}/getuserbyid` + append1, this.config)
        .then(x => {
            console.log(x.data);
            if(x.data[0]){
                this.setState({ username1: x.data[0].username })
            }
        }).catch();
        await axios.get(`${url}/getuserbyid` + append2, this.config)
        .then(x => {
            console.log(x.data);
            if(x.data[0]){
                this.setState({ username2: x.data[0].username })
            }
        }).catch();

    }

    render() {
        return <div>
            <div className="card" onClick={e => this.props.onBattleSelected(this.props.battle.battleID)}>
                <div className="card-body">
                    <h5 id="card-title" className="card-title">{this.props.battle.battleTitle}</h5>
                    <h6 id="vs" className="card-subtitle mb-2 text-muted">{this.state.username1} vs {this.state.username2}</h6>
                    <p className="card-text">{this.props.battle.battleDescription}</p>
                </div>
            </div>
        </div>
    }
}