import React, { Component } from 'react'

export default class Home extends Component {

    getFullname() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user == null) {
            return;
        }
        return user.firstname + ' ' + user.lastname;
    }

    render() {
        return (
            <div>
                <h1>Welcome to Bill Monitor platform <br/> { this.getFullname() }</h1>               
                <h1>This is Home component.</h1>
            </div>
        )
    }
}
