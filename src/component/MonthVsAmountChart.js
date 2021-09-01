import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function MonthVsAmountChart() {
    const [data, setData] = useState({});

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = () => {
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

        console.log(options);
        axios(options).then(response => {
            console.log(response.data);
            setData(response.data);
        }).catch(error => {
            console.log(error);
            alert('Sorry, something went wrong.');
        });
    }


    return (
        <div>
            <Bar
                data={
                    data.length > 0 ?
                        Object.keys(data.object).map((key, i) => (
                            {
                                labels: [key],
                                datasets: [
                                    {
                                        label: 'Rainfall',
                                        backgroundColor: 'rgba(75,192,192,1)',
                                        borderColor: 'rgba(0,0,0,1)',
                                        borderWidth: 2,
                                        data: [data.object[key]]
                                    }
                                ]
                            }
                        ))
                        : {
                            labels: ['January', 'February', 'March',
                                'April', 'May'],
                            datasets: [
                                {
                                    label: 'Rainfall',
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 2,
                                    data: [65, 59, 80, 81, 56]
                                }
                            ]
                        }
                }
                height={400}
                width={600}
                options={{ maintainAspectRatio: false }}
            />
        </div>
    )
}

export default MonthVsAmountChart;