import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomersTable from '../components/CustomersTable';
import Sidebar from '../components/Sidebar';
import '../styles/CustomerPage.css';

const CustomerPage = () => {
    const[customers, setCustomers] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/customers', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {console.log(response.data); setCustomers(response.data); })
            .catch(error => console.error(error));
    }, []);

    const filteredCustomers = Array.isArray(customers)
        ? customers.filter(customer =>
            customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="customer-page-container">
            <Sidebar />
            <div className="customer-page-content">
                <div className="customer-page-header">
                    <h1>Customers</h1>
                    <input type="text" className="search-input" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <CustomersTable customers={filteredCustomers} />
            </div>
        </div>
    );
};

export default CustomerPage;