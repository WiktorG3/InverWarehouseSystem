import React, { useState } from 'react';
import '../styles/LoginPage.css'
import axios from "axios";

const LoginForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/login', { username, password })
            .then(response => {
             if(response.data){
                localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard';
            }else{
                setError('Invalid username or password');
            }
            })
            .catch(error => {
                setError('An error occurred while logging in');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
                <label htmlFor="username">Username </label>
                <input
                    type="username"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="options">
                <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                </label>
                <a href="/forgot-password" className="forgot-passwd">Forgot Password?</a>
            </div>

            <button type="submit" className="login-button">Login</button>
        </form>
    );
};

export default LoginForm;