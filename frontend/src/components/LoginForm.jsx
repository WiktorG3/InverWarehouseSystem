import React, { useState } from 'react';
import '../styles/LoginPage.css'
import axios from "axios";

const LoginForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {username, password});
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard';
            }
        } catch(error) {
            if (error.response && error.response.status === 401) {
                setError(error.response.data);
            }
            else {
                setError('An error occurred while logging in');
            }
        }
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
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={handleTogglePassword}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                </div>
                {error && <p className="error">{error}</p>}

                <div className="options">
                    <label className="remember-me">
                        <input type="checkbox"/>
                        <span>Remember me</span>
                    </label>
                    <a href="/forgot-password" className="forgot-passwd">Forgot Password?</a>
                </div>

                <button type="submit" className="login-button">Login</button>
        </form>
);
};

export default LoginForm;