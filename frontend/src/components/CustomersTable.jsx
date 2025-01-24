import React from 'react';

const CustomersTable = ({ customers }) => {
    if (!Array.isArray(customers) || customers.length === 0) {
        return <div>No customers found.</div>;
    }
    return (
        <div className="customers-table-container">
            <table className="customers-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    {/*<th>Orders</th>*/}
                </tr>
                </thead>
                <tbody>
                {customers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        {/*<td>{customer.orders.length}</td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomersTable;