import React from "react";
import { Battle } from "./models/Battle";
import { Repository } from "./api/repository";
import './styles/BattleCreator.css';

export class BattleCreator extends React.Component {
    repository = new Repository();
    state = {
        title: "",
        description: ""
    }

    addBattle = (e) => { 
        console.log("adding battle");
        e.preventDefault();
        let battle = new Battle()
        battle.battleDescription = this.state.description;
        battle.battleTopic = this.state.title;
        battle.user1 = this.props.userID;
        battle.battleID = Date.now().toString(36) + Math.random().toString(36);
        this.props.onBattleAdded(battle); 
        this.setState({title: ""});
        this.setState({description: ""});
    };


    render() {
        return <>
            <div id="battle-creator" className="list-group">
                <h2 id="add-battle" className="list-group-item" >Add Battle</h2>
                <form onSubmit={this.addBattle}>
                    <div className="form-group">
                        {/* <label htmlFor="inputTitle">Title</label> */}
                        <input type="text" className="form-control mb-3" id="inputTitle" value={this.state.title} placeholder={"Title"} onChange={e => this.setState({title: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        {/* <label className="form-label" htmlFor="inputDescription">Description</label> */}
                        <textarea id="description-box"className="form-control" rows="3" id="inputDescription" value={this.state.description} placeholder={"Description"} onChange={e => this.setState({description: e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    }
}