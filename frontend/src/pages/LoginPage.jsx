import React from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', credentials);
            console.log('Login successful:', response.data);

            localStorage.setItem('token', response.data.token);

            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response.data);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmit={handleLogin} />
        </div>
    );
};

export default LoginPage;