import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="container">
            <div className="left-side">
                <div className="form">
                    <h1 className="title">Create your account</h1>
                    <RegisterForm />
                    <p className="login-link">Already have an account? <a href="/login">Log in here!</a></p>
                </div>
            </div>

            <div className="right-side">
                <div className="register-content">
                    <h1>INV<span>er</span></h1>
                    <p>Your one stop solution for inventory management</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;