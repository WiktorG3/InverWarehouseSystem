import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTable from '../components/OrdersTable';
import Sidebar from '../components/Sidebar';
import '../styles/OrderPage.css';

const OrderPage = () => {
    const[orders, setOrders] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/orders', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => setOrders(response.data))
            .catch(error => console.error(error));
    }, []);

    const filteredOrders = orders.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.orderStatus && order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="order-page-container">
            <Sidebar />
            <div className="order-page-content">
                <div className="order-page-header">
                    <h1>Orders</h1>
                    <input type="text" className="search-input" placeholder="Search by number or status..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <OrderTable orders={filteredOrders} />
            </div>
        </div>
    );
};

export default OrderPage;