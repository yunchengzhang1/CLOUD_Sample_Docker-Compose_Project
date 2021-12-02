/* eslint-disable no-lone-blocks */
import { Repository } from './api';
import React from 'react';
import './styles/BattleList.css';
import { BattleCard } from './BattleCard';

export class BattleList extends React.Component {
    repository = new Repository();
    state = {
        battles: []
    }


    // componentDidMount(){
    //     console.log("componentDidMount, updating state");
    //     // console.log(this.props.battles);
    //     let cloneState = this.props.battles.slice();
    //     // console.log(cloneState);
    //     this.setState({
    //         battles:cloneState
    //     })
    // }

    joinBattle(battleID) {
        this.repository.joinBattle(battleID, this.props.userID);
    }
    refreshList = () =>{
        
        console.log("refreshlist", this.props.battles);
        // let curr_battles = this.repository.getBattles();
        this.props.onUpdateBattles();
        // console.log(curr_battles);
        this.setState({battles: this.props.battles})
        // this.repository.getBattles().then(x => {
        //     console.log(x.data);
        //     this.setState({battles: x.data})});

        // this.setState({battles:curr_battles}, ()=>console.log(this.state.battles));
        // this.forceUpdate();
    }
    render() {
        console.log("render() method");
        console.log(this.state.battles);
        return <div id="battle-list">
            {this.state.battles.length === 0 &&
                <div id="no-active">
                    No active battles
                </div>
            }
            <div className="list-group ">
                {this.props.battles.map(x => 
                    <div className="list-group-item" key={x.battleID}>
                        <BattleCard battle={x} onBattleSelected={this.props.onBattleSelected}></BattleCard>
                        {/* <div  className="card" onClick={e => this.props.onBattleSelected(x.battleID)}>
                            <div className="card-body">
                                <h5 id="card-title" className="card-title">{x.battleTitle}</h5>
                                <h6 id="vs" className="card-subtitle mb-2 text-muted">{() => this.repository.getUserById(x.user1)} vs {x.user2}</h6>

                                <p className="card-text">{x.battleDescription}</p>
                            </div>
                            {x.user2 === "undefined" && (
                                <form>
                                    <button id="join-battle"type="button" onClick={() => this.joinBattle(x.battleID)}>Join Battle</button>
                                </form>
                            )}
                        </div> */}
                    </div>
                )}
                <button type="button" onClick={() => this.refreshList()}>Refresh List</button>
            </div>
        </div>
    }
};