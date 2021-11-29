import React from "react";
import { Battle } from "./models/Battle";
import { Repository } from "./api/repository";

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
        battle.description = this.state.description;
        battle.battleTopic = this.state.title;
        battle.user1 = this.props.userID;
        this.repository.addBattle(battle);
        this.setState({title: ""});
        this.setState({description: ""});
    };


    render() {
        return <>
            <div className="list-group">
                <h2 className="list-group-item" >Add Battle</h2>
                <form onSubmit={this.addBattle}>
                    <div className="form-group">
                        <label htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control mb-3" id="inputTitle" value={this.state.title} onChange={e => this.setState({title: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="inputDescription">Description</label>
                        <textarea className="form-control" rows="3" id="inputDescription" value={this.state.description} onChange={e => this.setState({description: e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    }
}