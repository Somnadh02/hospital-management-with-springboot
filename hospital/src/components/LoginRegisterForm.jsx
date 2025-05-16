import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegisterForm.css';

const LoginRegisterForm = () => {
    const [role, setRole] = useState('Receptionist');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup
    const navigate = useNavigate();

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
        if (selectedRole === 'Admin') {
            setIsLogin(true);
        }
    };

    const handleModeSwitch = () => {
        setIsLogin(!isLogin);
        setErrorMessage('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const apiUrl = isLogin ? "http://localhost:8080/api/auth/login" : "http://localhost:8080/api/auth/register";

        const data = {
            email: email,
            password: password,
            role: role.toLowerCase()
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (isLogin) {
                    // Navigate to the appropriate dashboard based on role
                    if (data.role === 'Admin') navigate('/admin');
                    else if (data.role === 'doctor') navigate('/doctor');
                    else if (data.role === 'receptionist') navigate('/receptionist');
                } else {
                    // Show success popup on successful registration
                    setShowSuccessPopup(true);
                    setTimeout(() => {
                        setShowSuccessPopup(false);
                        setIsLogin(true); // Switch to login mode after registration
                    }, 2000);
                }
            } else {
                setErrorMessage(data.message || 'Invalid credentials. Please try again.');
            }
        })
        .catch(error => {
            console.error("Error:", error);
            setErrorMessage('Something went wrong. Please try again.');
        });
    };

    return (
        <div className="form-container">
            <div className="welcome-section">
                <h2>Welcome TO</h2>
                <h3>MediCare Hub</h3>
            </div>
            <div className="form-section">
                <h3>{isLogin ? `Login as ${role}` : `Register as ${role}`}</h3>
                <div className="role-selector">
                    {['Receptionist', 'Doctor'].map((item) => (
                        <button
                            key={item}
                            className={`role-button ${role === item ? 'active' : ''}`}
                            onClick={() => handleRoleChange(item)}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        className={`role-button ${role === 'Admin' ? 'active' : ''}`}
                        onClick={() => handleRoleChange('Admin')}
                    >
                        Admin
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-row">
                        <input
                            type="email"
                            placeholder="Your Email *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password *"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {role !== 'Admin' && (
                        <p className="switch-link">
                            {isLogin ? (
                                <>
                                    Don’t have an account? <span onClick={handleModeSwitch} className="link">Register</span>
                                </>
                            ) : (
                                <>
                                    Already have an account? <span onClick={handleModeSwitch} className="link">Login</span>
                                </>
                            )}
                        </p>
                    )}
                </form>
                {showSuccessPopup && (
                    <div className="success-popup">
                        Registered successfully!
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginRegisterForm;
