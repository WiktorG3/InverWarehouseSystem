import React, {useState, useEffect} from "react";
import axios from 'axios';
import SupplierForm from "../components/SupplierForm";
import SuppliersTable from "../components/SuppliersTable";
import '../styles/SupplierPage.css';
import Sidebar from "../components/Sidebar";

const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/supplier', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response =>  setSuppliers(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAddSupplier = (supplier) => {
        axios.post('http://localhost:8080/api/supplier', supplier)
            .then(response => setSuppliers([...suppliers, response.data]))
            .catch(error => console.error(error));
    };

    const handleEditSuppliers = (supplier) => {
        axios.put(`http://localhost:8080/api/supplier/${supplier.id}`, supplier)
            .then(response => setSuppliers(suppliers.map(p => p.id === supplier.id ? response.data : p)))
            .catch(error => console.error(error));
    };

    const handleDeleteSupplier = (supplier) => {
        axios.delete(`http://localhost:8080/api/supplier/${supplier.id}`)
            .then(() => setSuppliers(suppliers.filter(p => p.id !== supplier.id)))
            .catch(error => console.error(error));
    };

    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="supplier-page-container">
            <Sidebar />
            <div className="supplier-page-content">
                <div className="supplier-page-header">
                    <div className="header-left">
                        <span>All</span>
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
                        <button
                            className="add-supplier-btn"
                            onClick={() => {
                                setSelectedSupplier(null);
                                setShowModal(true);
                            }}
                        >
                            + Add New Item
                        </button>
                    </div>
                </div>

                <SuppliersTable
                    suppliers={filteredSuppliers}
                    onEdit={(supplier) => {
                        setSelectedSupplier(supplier);
                        setShowModal(true);
                    }}
                    onDelete={handleDeleteSupplier}
                />

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                                &times;
                            </button>
                            <SupplierForm
                                onAddSupplier={handleAddSupplier}
                                onClose={() => setShowModal(false)}
                                selectedSupplier={selectedSupplier}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupplierPage;