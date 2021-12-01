/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import { Repository } from './api';
import './styles/BattleList.css';

export class BattleList extends React.Component {
    repository = new Repository();
    state = {
        battles: []
    }


    componentDidMount(){
        console.log("componentDidMount, updating state");
        // console.log(this.props.battles);
        let cloneState = this.props.battles.slice();
        // console.log(cloneState);
        this.setState({
            battles:cloneState
        })
    }

    joinBattle(battleID) {
        this.repository.joinBattle(battleID, this.props.userID);
    }
    refreshList = () =>{
        console.log(this.props.battles);
        // let curr_battles = this.repository.getBattles();
        
        // console.log(curr_battles);

        this.repository.getBattles().then(x => {
            console.log(x.data);
            this.setState({battles: x.data})});

        // this.setState({battles:curr_battles}, ()=>console.log(this.state.battles));
        // this.forceUpdate();
    }
    render() {
        console.log("render() method");
        console.log(this.state.battles);
        return <div>
            {this.props.battles.length === 0 &&
                <div>
                    No active battles
                </div>
            }
            <div className="list-group ">
                {this.state.battles.map(x => 
                    <div className="list-group-item" key={x.battleID}>
                        <div className="card" onClick={e => this.props.onBattleSelected(x.battleID)}>
                            <div className="card-body">
                                <h5 className="card-title">{x.battleTitle}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{x.user1} vs {x.user2}</h6>
                                {/* {this.repository.getUserById(x.user1).name} */}
                                <p className="card-text">{x.battleDescription}</p>
                            </div>
                            {x.user2 === "undefined" && (
                                <form>
                                    <button type="button" onClick={() => this.joinBattle(x.battleID)}>Join Battle</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
                <button type="button" onClick={() => this.refreshList()}>Refresh List</button>
            </div>
        </div>
    }
};