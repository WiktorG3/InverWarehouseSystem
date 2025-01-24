import React from 'react';

const SuppliersTable = ({ suppliers, onEdit, onDelete }) => {
    if (!Array.isArray(suppliers) || suppliers.length === 0) {
        return <div>No suppliers available</div>;
    }

    return (
        <div className="table-container">
            <table className="suppliers-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                        <td>{supplier.id}</td>
                        <td>{supplier.name}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.phone}</td>
                        <td>{supplier.address}</td>
                        <td>
                            <button className="action-btn" onClick={() => onEdit(supplier)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="action-btn" onClick={() => onDelete(supplier)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuppliersTable;