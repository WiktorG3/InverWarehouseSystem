import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="container">
            <div className="left-side">
                <div className="form">
                    <h1 className="title">Login to your account</h1>
                    <LoginForm />
                    <p className="signup-link">Don't have an account? <a href="/register">Sign up now!</a></p>
                </div>
            </div>

            <div className="right-side">
                <div className="login-content">
                    <h1>INV<span>er</span></h1>
                    <p>Your one stop solution for inventory management</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;