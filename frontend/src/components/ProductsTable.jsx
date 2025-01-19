import React from 'react';

const ProductsTable = (products, onEdit, onDelete) => {
    return (
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
                        <td>{product.price.toFixed(2)}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <button onClick={() => onEdit(product)}>Edit</button>
                            <button onClick={() => onDelete(product)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;