import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if(token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return <Navigate to="/login" />;
        }
        return children;
    }
    return <Navigate to="/login" />;
};

export default PrivateRoute;
