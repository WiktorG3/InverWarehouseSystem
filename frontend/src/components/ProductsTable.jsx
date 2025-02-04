import React from 'react';
import { formatCurrency } from '../components/currencyUtils';

const ProductsTable = ({ products, onEdit, onDelete }) => {
    if (!Array.isArray(products) || products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div className="table-container">
            <table className="products-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>{formatCurrency(product.price)}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <button className="action-btn" onClick={() => onEdit(product)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="action-btn" onClick={() => onDelete(product)}>
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

export default ProductsTable;