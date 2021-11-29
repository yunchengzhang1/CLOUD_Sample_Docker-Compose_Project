/* eslint-disable no-lone-blocks */
import React from 'react';
import { Repository } from './api';
import './styles/BattleList.css';

export class BattleList extends React.Component {
    repository = new Repository();
    state = {
        battles: []
    }
    joinBattle(battleID) {
        this.repository.joinBattle(battleID, this.props.userID)
    }
    render() {
        return <div>
            {this.props.battles.length === 0 &&
                <div>
                    No active battles
                </div>
            }
            <div className="list-group ">
                {this.props.battles.map(x =>
                    <div className="list-group-item" key={x.battleID}>
                        <div className="card" onClick={e => this.props.onBattleSelected(x.battleID)}>
                            <div className="card-body">
                                <h5 className="card-title">{x.battleTitle}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{x.user1} vs {x.user2}</h6>
                                <p className="card-text">{x.battleDescription}</p>
                            </div>
                            {x.user2 === "undefined" && (
                                <form>
                                    <button type="button" onClick={this.joinBattle(x.battleID)}>Join Battle</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    }
};