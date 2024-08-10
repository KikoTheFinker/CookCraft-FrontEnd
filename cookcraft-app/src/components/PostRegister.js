import React, { useEffect } from 'react';
import '../css/login-style.css'; 
import logo from '../images/logo.png'; 
import { useNavigate } from 'react-router-dom';

const PostRegister = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000);

        return () => clearTimeout(timer);
    });

    return (
        <div>
            <div className="background-container"></div>
            <div className="overlay">
                <div className="form">
                    <img src={logo} alt="Logo" className="logo" />
                    <p className="title">Registration Complete</p>
                    <p className="message">
                        Thank you for registering. Your account has been successfully created.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostRegister;
