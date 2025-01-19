import React, { useState, useEffect } from 'react';

const ProductForm = ({ onAddProduct, selectedProduct }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand: '',
        price: '',
        quantity: '',
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddProduct(formData);
    }


    return (
    <div className="product-form">
        <h2>{selectedProduct ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
            <label htmlFor="brand">Brand:</label>
            <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} />
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
            <button type="submit">{selectedProduct ? 'Update' : 'Add'}</button>
        </form>
    </div>
    );
};

export default ProductForm;