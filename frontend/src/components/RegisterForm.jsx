import React, {useState} from 'react';
import '../styles/RegisterPage.css'
import axios from "axios";

const RegisterForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        axios.post('http://localhost:8080/api/users/register', {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
        })
            .then(response => {
                setSuccess('Registration successful');
                setError('');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            })
            .catch(error => {
                setError('An error occurred while registering');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                    type="username"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="firstName"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="lastName"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
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

            <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
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

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <button type="submit" className="register-button">Register</button>
        </form>
    );
};

export default RegisterForm;