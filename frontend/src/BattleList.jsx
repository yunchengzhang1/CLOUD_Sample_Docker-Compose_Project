/* eslint-disable no-lone-blocks */
import React from 'react';
import { Repository } from './api';
import './styles/BattleList.css';

export class BattleList extends React.Component {
    repository = new Repository();
    state = {
        battles: []
    }
    joinBattle() {
        console.log("joining battle");
    }
    componentDidMount() {
        console.log("setting state")
        this.repository.getBattles().then(x => {
            console.log(x.data);
            this.setState({battles: x.data})});
    }
    render() {
        return <div>
            {this.state.battles.length === 0 &&
                <div>
                    No active battles
                </div>
            }
            <div className="list-group ">
                {this.state.battles.map(x =>
                    <div className="list-group-item" key={x.id}>
                        <div className="card" onClick={e => this.props.onBattleSelected(x.id)}>
                            <div className="card-body">
                                <h5 className="card-title">{x.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">USER NAME vs USER NAME TODO</h6>
                                <p className="card-text">{x.description}</p>
                            </div>
                            {x.userID2 === undefined && (
                                <form>
                                    <button type="button" onClick={this.joinBattle(x.id)}>Join Battle</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    }
};