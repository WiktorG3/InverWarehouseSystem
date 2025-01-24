import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import PrivateRoute from './components/PrivateRoute';
import OrderPage from "./pages/OrderPage";
import CustomerPage from "./pages/CustomerPage";

const App = () => {
    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="/product" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
                <Route path="/order" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
                <Route path="/customer" element={<PrivateRoute><CustomerPage /></PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default App;