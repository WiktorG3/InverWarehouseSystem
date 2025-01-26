import React from 'react';
import {
    FaBox,
    FaTruck,
    FaUser,
    FaChartLine,
    FaThLarge,
    FaCog,
    FaShoppingCart,
} from 'react-icons/fa';
import '../styles/Sidebar.css';



const Sidebar = () => {
    return (
        <div className="sidebar">
            <h1 className="logo">INV<span>er</span></h1>
            <ul className="menu">
                <li><a href="/dashboard"><FaThLarge className="icon"/>Dashboard</a></li>
                <li><a href="/product"><FaBox className="icon"/>Products</a></li>
                <li><a href="/order"><FaShoppingCart className="icon"/>Orders</a></li>
                <li><a href="/customer"><FaUser className="icon"/>Customers</a></li>
                <li><a href="/supplier"><FaTruck className="icon"/>Suppliers</a></li>
                <li><a href="/reports"><FaChartLine className="icon"/>Reports</a></li>
                <li><a href="/settings"><FaCog className="icon"/>Settings</a></li>
            </ul>
            <footer className="sidebar-footer">
                <p>INVer Version 1.0 WiktorG3</p>
                <p>© 2025 All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default Sidebar;