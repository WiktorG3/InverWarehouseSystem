import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomersTable from '../components/CustomersTable';
import Sidebar from '../components/Sidebar';
import '../styles/CustomerPage.css';
import Navbar from "../components/Navbar";

const CustomerPage = () => {
    const[customers, setCustomers] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [page, searchTerm]);

    const fetchProducts = () => {
        axios.get(`http://localhost:8080/api/customers?page=${page}&size=${size}&searchTerm=${searchTerm}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                setCustomers(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error(error));
    };

    const filteredCustomers = Array.isArray(customers)
        ? customers.filter(customer =>
            customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="customer-page-container">
            <Sidebar />
            <div className="main-page">
                <Navbar />
                <div className="customer-page-content">
                    <div className="customer-page-header">
                        <div className="header-left">
                            <span>Customers</span>
                            <span>Categories</span>
                        </div>

                        <div className="header-right">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <CustomersTable customers={filteredCustomers}/>
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

export default CustomerPage;