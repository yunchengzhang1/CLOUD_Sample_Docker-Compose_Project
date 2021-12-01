import React, { Component } from 'react';
import './styles/Registration.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Repository } from './api/repository'
import { Account } from './models/Account'

export class Registration extends Component {

    repository = new Repository();

    // const [usernameReg, setUsernameReg] = useState('');
    // const [passwordReg, setPasswordReg] = useState('');

    regiDone = params => {
        var userID = Date.now().toString(36) + Math.random().toString(36); //uniqueID generator
        this.props.onSetUser(userID);
        return <Redirect to="/battlePage"></Redirect>
    }

    handleSubmit = e => {
        e.preventDefault();
        const data={
            username: this.name,
            password: this.password,
            userID: (Date.now().toString(36) + Math.random().toString(36))
        }
        this.repository.addAccount(data);
        console.log(data);
    }

    render() {
        return (
            <section id="Registration">
                <h1>SETUP YOUR FLAME WAR ACCOUNT</h1>
                <form className="container" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="info"
                            id="name"
                            name="name"
                            placeholder={"Username"}
                            onChange={e=>this.name= e.target.value}
                            className="form-control" />
                    </div>


                    <div className="form-group">
                        <input type="info"
                            id="pass"
                            name="password"
                            minlength="8" required
                            placeholder={"Password (minimum length 8)"}
                            onChange={e=>this.password= e.target.value}
                            className="form-control" />
                    </div>
                    <button>
                        Sign Up
                    </button>

                </form>

                <p id="toLogin">Nevermind, take me to <Link id="returnButton" to={"/"}>Login</Link></p>


            </section>

        )
    }



}