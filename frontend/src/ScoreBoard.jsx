import React from "react";
import { Repository } from "./api";

export class ScoreBoard extends React.Component {

    render() {
        return <div>
            <h3>ScoreBoard</h3>
            <h2>{this.props.user1Score} to {this.props.user2Score}</h2>
        </div>
    }
}