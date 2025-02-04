import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from 'react';
import '../styles/DashboardPage.css';
import Navbar from "../components/Navbar";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/dashboard', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => setDashboardData(response.data))
            .catch(error => console.error(error));
    })
    const revenueVsCostsData = dashboardData.revenueVsCosts || [];
    const months = revenueVsCostsData.map(item => `M${item.month}`);
    const revenue = revenueVsCostsData.map(item => item.revenue);
    const costs = revenueVsCostsData.map(item => item.costs);
    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Revenue',
                data: revenue,
                borderColor: 'green',
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                fill: true,
            },
            {
                label: 'Costs',
                data: costs,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                fill: true,
            }
        ]
    };
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };
    const todayOrdersList = dashboardData.todayOrdersList || [];
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
                            {revenueVsCostsData.length > 0 ? (
                                <div className="chart-wrapper">
                                    <Line data={chartData} options={chartOptions}/>
                                </div>
                            ) : (
                                <p>Loading data...</p>
                            )}
                        </div>
                        <div className="chart-section">
                            <h3>Today's Orders</h3>
                            {todayOrdersList.length > 0 ? (
                                <ul style={{listStyle: 'none', padding: 0}}>
                                    {todayOrdersList.map(order => (
                                        <li key={order.id} style={{
                                            marginBottom: '1rem',
                                            borderBottom: '1px solid #ddd',
                                            paddingBottom: '0.5rem'
                                        }}>
                                            <strong>{order.orderNumber}</strong> –
                                            ${Number(order.orderAmount).toFixed(2)} – {order.orderStatus} – {new Date(order.orderDate).toLocaleTimeString()}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No orders for today.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;