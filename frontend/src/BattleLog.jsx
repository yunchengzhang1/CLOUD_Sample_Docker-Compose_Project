import React, { useEffect, useState } from "react";
import { Repository } from "./api";
import './styles/BattleLog.css';
import axios from 'axios';
import equal from 'fast-deep-equal'

export class BattleLog extends React.Component{
    repository = new Repository();
    // [messages, setMessages] = useState(undefined);
    state = {
        messages:[]
    }

    async componentDidUpdate(prevProps) {
        // console.log("getting messages");
        // console.log(this.props.battleID);
        // this.repository.getMessagesById(this.props.battleID)
        //     .then(
        //         x =>{
        //             this.setState({messages: x.data});
        //         }
        //     )
        if (!equal (this.props.battleID, prevProps.battleID)){
            await this.updateMessages();
            
        }
    }

    async componentDidMount(){
            this.repository.getMessagesById(this.props.battleID)
            .then(
                x =>{
                    this.setState({messages: x.data});
                }
            )
            // console.log("battleID defined")
            // const res = new Promise((resolve, reject) => {
            //     axios.get(`${url}/getmessagesbyid` ,props.battleID)
            //         .then(
            //             x => {
            //                 // console.log(x.data)
            //                 resolve(x.data)})
            //         .catch(x => {
            //             alert(x);
            //             reject(x);
            //         })
            // });
            // console.log(res);
            // var arr=["hi"];
            // this.setState(res);
    }

    updateMessages(){
        console.log("update messages");

        this.repository.getMessagesById(this.props.battleID)
        .then(
            x =>{
                this.setState(x.data);
                console.log(x);
            }
        ) 
    }
    
    render(){
        if(this.props.battleID === undefined){
            return <div id="battle-log-text">No Battle Selected</div>
        }
        return <div>
        <h2 id="battle-log-text" >Battle Log</h2>
        <div >Showing log for{this.props.battle}</div>
    </div>
    }
    
};