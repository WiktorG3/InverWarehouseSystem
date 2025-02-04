import React, {useState, useEffect} from "react";
import axios from 'axios';
import SupplierForm from "../components/SupplierForm";
import SuppliersTable from "../components/SuppliersTable";
import '../styles/SupplierPage.css';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [page, searchTerm]);

    const fetchProducts = () => {
        axios.get(`http://localhost:8080/api/supplier?page=${page}&size=${size}&searchTerm=${searchTerm}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                setSuppliers(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error(error));
    };

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
            <Sidebar/>
            <div className="main-page">
                <Navbar/>
                <div className="supplier-page-content">
                    <div className="supplier-page-header">
                        <div className="header-left">
                            <span>All</span>
                            <span>Categories</span>
                        </div>

                        <div className="header-right">
                            <button
                                className="add-supplier-btn"
                                onClick={() => {
                                    setSelectedSupplier(null);
                                    setShowModal(true);
                                }}
                            >
                                + Add New Supplier
                            </button>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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
                    <div className="pagination">
                        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
                        <span>Page {page + 1} of {totalPages}</span>
                        <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
                    </div>

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
        </div>
    );
};

export default SupplierPage;