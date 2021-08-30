import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {

    state = {
        username: '',
        password: '',
        redirect: false,
        authError: false,
        errorMsg: '',
        isLoading: false
    };

    handleLogin() {
        this.setState({ isLoading: true });
        const options = {
            url: 'http://localhost:8080/rest/usermanagement/auth/login',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                username: this.state.username,
                password: this.state.password
            }
        };

        axios(options).then(response => {
            if (response.data.success.token != null) {
                localStorage.setItem('token', response.data.success.token);
                localStorage.setItem('user', JSON.stringify(response.data.success.user));
                this.setState({ redirect: true, isLoading: false });
            } else {
                const reason = response.data.failure.reason;
                this.setState({ authError: true, errorMsg: reason });
            }
        }).catch(error => {
            console.log(error);
            this.setState({ authError: true, isLoading: false });
            alert('Sorry, something went wrong.');
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/home' />
        }
    }

    render() {
        if (localStorage.getItem('token') != null) {
            this.setState({ redirect: true })
        }
        return (
            <div>
                <h1>This is login component.</h1>
                <div>
                    <input type="text"
                        placeholder="username"
                        onChange={
                            (e) => {
                                this.setState({ username: e.target.value })
                            }
                        }
                    />
                </div>
                <div>
                    <input type="text"
                        placeholder="password"
                        onChange={
                            (e) => {
                                this.setState({ password: e.target.value })
                            }
                        }
                    />
                </div>
                <div>
                    <button onClick={() => this.handleLogin()}>Login</button>
                </div>
                <div>
                    <Link to="/registration">Registration</Link>
                </div>
                {this.renderRedirect()}
                <div>{this.state.authError ? <h3>{this.state.errorMsg}</h3> : <span></span>}</div>
            </div>
        )
    }
}
