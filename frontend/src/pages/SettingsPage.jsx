import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../styles/SettingsPage.css';

const SettingsPage = () => {
    const [userData, setUserData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [editingField, setEditingField] = useState(null);
    const [updatedValue, setUpdatedValue] = useState("");
    const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
    const [currency, setCurrency] = useState('USD');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            setUserData(response.data);
            setCurrency(response.data.currency || 'USD');
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const handleEdit = (field) => {
        setEditingField(field);
        setUpdatedValue(userData[field]);
        setPasswords({ password: '', confirmPassword: '' });
    };

    const handleUpdate = (field) => {
        setError(null);
        if(field === 'password') {
            if(passwords.password !== passwords.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }

        const data =
            field === 'password' ? { password: passwords.password } : field === 'currency' ? { currency } : { [field]: updatedValue };

        axios
            .put(
                `http://localhost:8080/api/users/update`, data, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            )
            .then(() => {
                if(field !== 'password' && field !== 'currency') setUserData({ ...userData, [field]: updatedValue });
                setEditingField(null);
                setSuccess(`${field === 'password' ? 'Password' : field} updated successfully!`);
                setError(null);
            })
            .catch((error) => {
                console.error('Error updating field:', error);
                setError(`Failed to update ${field}.`);
                setSuccess(null);
            });
    };

    const handleCancel = () => {
        setEditingField(null);
        setUpdatedValue('');
        setPasswords({ password: '', confirmPassword: '' });
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            axios
                .delete('http://localhost:8080/api/users/delete', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
                .then(() => {
                    setSuccess('Account deleted successfully. Redirecting to login page...');
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }, 3000);
                })
                .catch(() => setError('Failed to delete account.'));
        }
    }

    return (
        <div className="settings-page-container">
            <Sidebar />
            <div className="settings-page-content">
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="settings-card table-container">
                    <h2>Your profile</h2>

                    <div className="settings-item">
                        <span>Username:</span>
                        {editingField === 'username' ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedValue}
                                    onChange={(e) => setUpdatedValue(e.target.value)}
                                    placeholder="Enter new username"
                                />
                                <button className="add-product-btn" onClick={() => handleUpdate('username')}>
                                    Save
                                </button>
                                <button className="add-product-btn" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <strong>{userData.username}</strong>
                                <button className="add-product-btn" onClick={() => handleEdit('username')}>
                                    Change
                                </button>
                            </>
                        )}
                    </div>

                    <div className="settings-item">
                        <span>First Name:</span>
                        {editingField === 'firstName' ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedValue}
                                    onChange={(e) => setUpdatedValue(e.target.value)}
                                    placeholder="Enter new first name"
                                />
                                <button className="add-product-btn" onClick={() => handleUpdate('firstName')}>
                                    Save
                                </button>
                                <button className="add-product-btn" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <strong>{userData.firstName}</strong>
                                <button className="add-product-btn" onClick={() => handleEdit('firstName')}>
                                    Change
                                </button>
                            </>
                        )}
                    </div>

                    <div className="settings-item">
                        <span>Last Name:</span>
                        {editingField === 'lastName' ? (
                            <>
                                <input
                                    type="text"
                                    value={updatedValue}
                                    onChange={(e) => setUpdatedValue(e.target.value)}
                                    placeholder="Enter new last name"
                                />
                                <button className="add-product-btn" onClick={() => handleUpdate('lastName')}>
                                    Save
                                </button>
                                <button className="add-product-btn" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <strong>{userData.lastName}</strong>
                                <button className="add-product-btn" onClick={() => handleEdit('lastName')}>
                                    Change
                                </button>
                            </>
                        )}
                    </div>

                    <div className="settings-item">
                        <span>Email:</span>
                        {editingField === 'email' ? (
                            <>
                                <input
                                    type="email"
                                    value={updatedValue}
                                    onChange={(e) => setUpdatedValue(e.target.value)}
                                    placeholder="Enter new email"
                                />
                                <button className="add-product-btn" onClick={() => handleUpdate('email')}>
                                    Save
                                </button>
                                <button className="add-product-btn" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <strong>{userData.email}</strong>
                                <button className="add-product-btn" onClick={() => handleEdit('email')}>
                                    Change
                                </button>
                            </>
                        )}
                    </div>

                    <div className="settings-item">
                        <span>Password:</span>
                        {editingField === 'password' ? (
                            <>
                                <input
                                    type="password"
                                    value={passwords.password}
                                    onChange={(e) =>
                                        setPasswords({...passwords, password: e.target.value})
                                    }
                                    placeholder="Enter new password"
                                />
                                <input
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) =>
                                        setPasswords({...passwords, confirmPassword: e.target.value})
                                    }
                                    placeholder="Confirm new password"
                                />
                                <button className="add-product-btn" onClick={() => handleUpdate('password')}>
                                    Save
                                </button>
                                <button className="add-product-btn" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <strong>********</strong>
                                <button className="add-product-btn" onClick={() => handleEdit('password')}>
                                    Change
                                </button>
                            </>
                        )}
                    </div>

                    <div className="settings-item">
                        <span>Currency Format:</span>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="PLN">PLN</option>
                        </select>
                        <button className="add-product-btn" onClick={() => handleUpdate('currency')}>Change</button>
                    </div>
                </div>

                <div className="settings-card">
                    <h2>Account Management</h2>
                    <div className="settings-item">
                        <span>Delete Account:</span>
                        <strong>{userData.username}</strong>
                        <button className="delete-button" onClick={handleDeleteAccount}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;