import Sidebar from "../components/Sidebar";
import React from 'react';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                </header>

                <div className="dashboard-cards">
                    <div className="card">
                        <h2>Products</h2>
                        <p>New Orders</p>
                    </div>
                    <div className="card">
                        <h2>$500k</h2>
                        <p>Sales</p>
                    </div>
                    <div className="card">
                        <h2>423</h2>
                        <p>Total Orders</p>
                    </div>
                    <div className="card">
                        <h2>100</h2>
                        <p>Low Stock</p>
                    </div>
                </div>

                <div className="dashboard-body">
                    <div className="chart-section">

                    </div>
                    <div className="chart-section">

                    </div>
                    <div className="returns-section">

                    </div>
                </div>


            </div>
        </div>
    );
};

export default DashboardPage;