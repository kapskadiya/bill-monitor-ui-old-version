import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            data: {},
            labels: [],
            values: []
        };
        this.getData = this.getData.bind(this);
    }

    getFullname() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user == null) {
            return;
        }
        return user.firstname + ' ' + user.lastname;
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const token = localStorage.getItem('token');

        const options = {
            url: 'http://localhost:8080/rest/analytics/monthAndAmount/ELECTRICITY',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };

        axios(options).then(response => {
            this.setState({ data: response.data });
            this.extractAndStoreData()
        }).catch(error => {
            console.log(error);
            alert('Sorry, something went wrong.');
        });
    }

    extractAndStoreData() {
        if (this.state.data !== '') {
            Object.keys(this.state.data).map((key, i) => {
                this.state.labels.push(key);
                this.state.values.push(this.state.data[key]);
            });
        }
    }

    prepareData = () => {
        const data = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'MonthVsAmount',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.state.values
                }
            ]
        };
        return data;
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Welcome to Bill Monitor platform <br /> {this.getFullname()}</h1>
                    <h1>This is Home component.</h1>
                </div>
                <div>
                    <Bar
                        data={this.prepareData}
                        height={400}
                        width={600}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>
        )
    }
}
