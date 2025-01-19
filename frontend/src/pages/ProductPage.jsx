import React, {useState, useEffect} from "react";
import axios from 'axios';
import ProductForm from "../components/ProductForm";
import ProductsTable from "../components/ProductsTable";
import '../styles/ProductPage.css';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/product')
            .then(response => setProducts(response.data))
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

    return (
        <div className="product-page-container">
            <div className="product-page-header">
                <h1>Products</h1>
                <button className="add-product-btn" onClick={() => setShowForm(true)}>Add New Product</button>
            </div>
            {showForm ? (
                <ProductForm onAddProduct={handleAddProduct}
                             onClose={() => setShowForm(false)}
                             selectedProduct={selectedProduct}
                />
            ) : (
                <ProductsTable products={products}
                               onEdit={handleEditProduct}
                               onDelete={handleDeleteProduct}
                />
            )}
        </div>
    )
}

export default ProductPage;