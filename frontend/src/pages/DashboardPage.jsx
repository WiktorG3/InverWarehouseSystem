import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from 'react';
import '../styles/DashboardPage.css';
import Navbar from "../components/Navbar";
import axios from "axios";

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/dashboard', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => setDashboardData(response.data))
            .catch(error => console.error(error));
    })

    return (
        <div className="dashboard-container">
            <Sidebar/>
            <div className="main-page">
                <Navbar/>
                <div className="dashboard-content">
                    <header className="dashboard-header">
                        <h1>Dashboard</h1>
                    </header>

                    <div className="dashboard-cards">
                        <div className="card">
                            <h2>Total Customers</h2>
                            <p className="stat">{dashboardData.totalCustomers}</p>
                        </div>
                        <div className="card">
                            <h2>Total Sales</h2>
                            <p className="stat">${dashboardData.totalOrders?.toFixed(2)}</p>
                        </div>
                        <div className="card">
                            <h2>Products on Site</h2>
                            <p className="stat">{dashboardData.totalProducts}</p>
                        </div>
                        <div className="card">
                            <h2>Today's Orders</h2>
                            <p className="stat">{dashboardData.todayOrders}</p>
                        </div>
                    </div>

                    <div className="dashboard-body">
                        <div className="chart-section">
                            <h3>Revenue vs Costs</h3>

                        </div>
                        <div className="chart-section">
                            <h3>Sales by Category</h3>

                        </div>
                        <div className="today-orders">
                            <h3>Today's orders</h3>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;