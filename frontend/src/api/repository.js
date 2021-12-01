import axios from 'axios';


export class Repository {
    url = "http://localhost:8000"

    config = {
        headers: {

        }
    };

    addBattle(battle){
        console.log("Adding Battle", battle);
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/makeBattle`, battle, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    joinBattle(battleID, user2) {
        console.log("Joining Battle", battleID, user2);
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/joinbattle`, {battleID, user2}, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getBattles() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getbattles`, this.config)
                .then(x =>{
                    //alert(x.data);
                    console.log(x.data);
                    resolve(x.data)
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    postMessage(message) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postmessage`, message, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }
    
    getMessagesById(params) {
        if(params){
            this.config.params = params;
        }
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getmessagesbyid`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    addAccount(user){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/signup`, user, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }
    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getUserById(userID) {
        if(userID){
            this.config.userID = userID;
        }
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getuserbyid`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }
}