import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTable from '../components/OrdersTable';
import Sidebar from '../components/Sidebar';
import '../styles/OrderPage.css';
import Navbar from "../components/Navbar";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchOrders();
    }, [page, searchTerm]);

    const fetchOrders = () => {
        axios.get(`http://localhost:8080/api/orders?page=${page}&size=${size}&searchTerm=${searchTerm}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                setOrders(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="order-page-container">
            <Sidebar/>
            <div className="main-page">
                <Navbar/>
                <div className="order-page-content">
                    <div className="order-page-header">
                        <div className="header-left">
                            <span>Orders</span>
                        </div>

                        <div className="header-right">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by number or status..."
                                value={searchTerm}
                                onChange={(e) =>
                                {
                                    setSearchTerm(e.target.value);
                                    setPage(0);
                                }}
                            />
                        </div>
                    </div>
                    <OrderTable orders={orders}/>
                    <div className="pagination">
                        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
                        <span>Page {page + 1} of {totalPages}</span>
                        <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;