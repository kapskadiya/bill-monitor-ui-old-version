import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Registration extends Component {

    state = {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        mobileNo: 0,
        email: '',
        redirect: false,
        saveError: false,
        errorMsg: ''
    };


    handleRegister() {
        const options = {
            url: 'http://localhost:8080/rest/usermanagement/user/add',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                firstname: this.state.username,
                lastname: this.state.lastname,
                username: this.state.username,
                password: this.state.password,
                mobileNo: this.state.mobileNo,
                email: this.state.email        
            }
        };

        axios(options).then(response => {   
            console.log(response);         
            if (response.data.success.isSaved) {
                this.setState({ redirect: true });
            } else {
                const reason = response.data.failure.reason;
                this.setState({ saveError: true, errorMsg: reason });
            }
        }).catch(error => {
            console.log(error);
            this.setState({ saveError: true });
        });

    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }

    render() {
        return (
            <div>
                <h1>This is registration component.</h1>
                <div>
                    <input placeholder='firstname' type="text" onChange={(e) => this.setState({ firstname: e.target.value })} />
                </div>
                <div>
                    <input placeholder='lastname' type="text" onChange={(e) => this.setState({ lastname: e.target.value })} />
                </div>
                <div>
                    <input placeholder='username' type="text" required onChange={(e) => this.setState({ username: e.target.value })} />
                </div>
                <div>
                    <input placeholder='password' type="password" required onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
                <div>
                    <input placeholder='email' type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                </div>
                <div>
                    <input placeholder='mobileNo' type="number" onChange={(e) => this.setState({ mobileNo: e.target.value })} />
                </div>
                <div>
                    <button onClick={() => this.handleRegister()}>Register</button>
                </div>
                {this.renderRedirect()}
                <div>{this.state.saveError ? <h3>{this.state.errorMsg}</h3> : <span></span>}</div>
            </div>
        )
    }
}
