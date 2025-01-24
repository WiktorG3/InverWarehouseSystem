import React, { useState, useEffect } from 'react';

const SupplierForm = ({ onAddSupplier, onClose, selectedSupplier }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        if (selectedSupplier) {
            setFormData(selectedSupplier);
        }
    }, [selectedSupplier]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddSupplier(formData);
        onClose();
    };

    return (
        <div className="supplier-form">
            <h2>{selectedSupplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                <button type="submit">{selectedSupplier ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default SupplierForm;