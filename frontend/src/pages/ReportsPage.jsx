import React, { useState, useEffect } from 'react';
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/ReportsPage.css';
import Navbar from "../components/Navbar";

const ReportsPage = () => {
    const [statusData, setStatusData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [monthlyOrdersData, setMonthlyOrdersData] = useState([]);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

    useEffect(() => {
        axios.get('http://localhost:8080/api/reports/orders-by-status', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => setStatusData(response.data))
            .catch(error => console.error(error));

        axios.get('http://localhost:8080/api/reports/monthly-orders', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => setMonthlyOrdersData(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="reports-page-container">
            <Sidebar/>
            <div className="main-page">
                <Navbar/>
                <div className="reports-page-content">
                    <h1>Reports</h1>
                    <div className="chart-container">
                        <div className="chart">
                            <h2>Orders by Status</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        dataKey="count"
                                        nameKey="status"
                                        innerRadius={50}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={2}
                                        label
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>


                        <div className="chart">
                            <h2>Monthly Orders Summary</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyOrdersData}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="month"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="count" fill="#8884d8"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReportsPage;