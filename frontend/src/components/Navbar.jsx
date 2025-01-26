import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import '../styles/Navbar.css';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState({ username: '' });
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((response) => {
                setUser({
                    username: response.data.username,
                });
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            });
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
        <div className="navbar">
            <div className="navbar-profile">
                <FaUserCircle size={40} color="#6b46c1" />
                <div className="profile-info">
                    <span>{user.username || 'Loading...'}</span>
                    <small>Logged In</small>
                </div>
                <i className="fas fa-chevron-down" onClick={toggleDropdown}></i>
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Log Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;