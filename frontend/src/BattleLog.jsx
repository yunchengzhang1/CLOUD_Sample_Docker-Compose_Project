import React, { useEffect, useState } from "react";
import { Repository } from "./api";
import './styles/BattleLog.css';

export const BattleLog = props => {
    const repository = new Repository();
    const [messages, setMessages] = useState(undefined);

    useEffect(() => {
        console.log("getting messages");
        repository.getMessagesById(props.battleID)
    }, []);

    if(!messages){
        return <div id="battle-log-text">Loading...</div>
    }
    return <div>
        <h2 id="battle-log-text" >Battle Log</h2>
        <div >Showing log for{this.props.battle}</div>
    </div>
};