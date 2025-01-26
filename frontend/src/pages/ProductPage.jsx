import React, {useState, useEffect} from "react";
import axios from 'axios';
import ProductForm from "../components/ProductForm";
import ProductsTable from "../components/ProductsTable";
import '../styles/ProductPage.css';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/product', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response =>  setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleAddProduct = (product) => {
        axios.post('http://localhost:8080/api/product', product)
            .then(response => setProducts([...products, response.data]))
            .catch(error => console.error(error));
    };

    const handleEditProduct = (product) => {
        axios.put(`http://localhost:8080/api/product/${product.id}`, product)
            .then(response => setProducts(products.map(p => p.id === product.id ? response.data : p)))
            .catch(error => console.error(error));
    };

    const handleDeleteProduct = (product) => {
        axios.delete(`http://localhost:8080/api/product/${product.id}`)
            .then(() => setProducts(products.filter(p => p.id !== product.id)))
            .catch(error => console.error(error));
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-page-container">
            <Sidebar/>
            <div className="main-page">
                <Navbar/>
                <div className="product-page-content">
                    <div className="product-page-header">
                        <div className="header-left">
                            <span>All</span>
                            <span>Categories</span>
                        </div>


                        <div className="header-right">
                            <button
                                className="add-product-btn"
                                onClick={() => {
                                    setSelectedProduct(null);
                                    setShowModal(true);
                                }}
                            >
                                + Add New Item
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

                    <ProductsTable
                        products={filteredProducts}
                        onEdit={(product) => {
                            setSelectedProduct(product);
                            setShowModal(true);
                        }}
                        onDelete={handleDeleteProduct}
                    />

                    {showModal && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                                    &times;
                                </button>
                                <ProductForm
                                    onAddProduct={handleAddProduct}
                                    onClose={() => setShowModal(false)}
                                    selectedProduct={selectedProduct}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;