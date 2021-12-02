import './styles/Login.css';
import loginPic from './styles/images/login.png';
import React from 'react';
import { v1 as uuidv1 } from 'uuid';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Repository } from './api';
import axios from 'axios';
export class Login extends React.Component {
    repository = new Repository();
    state = {
        username: '',
        password: ''
    };

    async validateLogin(e){
        e.preventDefault();
        var url = "http://localhost:8000"
        let append = "/?username=" + this.state.username + "&password=" + this.state.password;
        var res = await new Promise((resolve, reject) => {
            axios.get(`${url}/login` + append, this.config)
                .then(x => {
                    console.log(x);
                    resolve(x.data[0].userID)
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
        this.props.onSetUser(res);
        console.log("valid!")
        return <Redirect to="/battlePage"></Redirect>
    }
    
    render (){
        const isAuthenticated = this.props.isAuthenticated;
        if (isAuthenticated){
            return <Redirect to="/battlePage"></Redirect>
        }
        return <div>
            <section id="LoginPage">
                {/* a box extending the width of the screen with margins up and down to show the background picture */}
                {/* have a default login image of a person or something here */}
                <img src={loginPic} alt="Login Person"/>
                {/* login title*/}
                <h1>FLAME WAR LOGIN</h1>
                {/* inside the box, have:
                two text fields for login username and password
                a button to login
                a generic login picture above these
                */}
                <form className="container">
                    <div className="form-group">
                        <input type="info"
                            id="name"
                            name="name"
                            value={this.state.username}
                            placeholder={"Username"}
                            onChange={ event => this.setState({ username: event.target.value }) }
                            className="form-control" />
                    </div>


                    <div className="form-group">
                        <input type="info"
                            id="pass"
                            name="password"
                            value={this.state.password}
                            placeholder={"Password"}
                            onChange={ event => this.setState({ password: event.target.value }) }
                            className="form-control" />
                    </div>
                    <button onClick={(e) => this.validateLogin(e)}>
                        Login
                    </button>
                </form>
                <br/>
                <p>New user? <Link to={"/registration"}>SIGN UP</Link></p>
            </section>
        </div>
    }
    componentDidMount() {
        this.repository.getUsers().then(x => {
        console.log(x);
    })}
}