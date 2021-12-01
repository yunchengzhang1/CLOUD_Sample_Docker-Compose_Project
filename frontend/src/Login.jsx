import './styles/Login.css';
import React from 'react';
import { v1 as uuidv1 } from 'uuid';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Repository } from './api';
export class Login extends React.Component {
    repository = new Repository();
    state = {
        name: '',
        email: '',
        password: ''
    };

    async validateLogin(){
        var userID = ""//Date.now().toString(36) + Math.random().toString(36)""; //uniqueID generator
        this.props.onSetUser(userID);
        await this.repository.login(this.state.name, this.state.password).then(x => {
            console.log("get user by id", x)
            userID = x.userID;
        });
        return <Redirect to="/battlePage"></Redirect>
    }
    
    render (){
        const isAuthenticated = this.props.isAuthenticated;
        if (isAuthenticated){
            console.log("authenticated");
            return <Redirect to="/battlePage"></Redirect>
        }
        return <div>
            <section id="LoginPage">
                {/* a box extending the width of the screen with margins up and down to show the background picture */}
                {/* have a default login image of a person or something here */}
                <img src={"https://via.placeholder.com/150"} alt="Login Person"/>
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
                            value={this.state.name}
                            placeholder={"Username"}
                            onChange={ event => this.setState({ name: event.target.value }) }
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
                    <button onClick={e => this.validateLogin()}>
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