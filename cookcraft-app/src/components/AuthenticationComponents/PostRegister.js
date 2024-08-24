import React, { useEffect, useState } from 'react';
import loginStyles from '../../css/AuthenticationCss/login-style.module.css';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

const PostRegister = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(4);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            navigate('/login');
        }
    }, [countdown, navigate]);

    return (
        <div className={loginStyles.loginContainer}>
            <div className={loginStyles.backgroundContainer}></div>
            <div className={loginStyles.overlay} style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
                <div className={`${loginStyles.form}`} style={{ padding: '40px 60px', textAlign: 'center', maxWidth: '500px' }}>
                    <img src={logo} alt="Logo" className={loginStyles.logo} />
                    <p className={loginStyles.title} style={{ fontSize: '28px', fontWeight: 'bold' }}>Registration Complete</p>
                    <p className={loginStyles.message} style={{ fontSize: '18px', marginBottom: '20px' }}>
                        Thank you for registering. Your account has been successfully created.
                    </p>
                    <p className={loginStyles.message} style={{ fontSize: '18px', color: '#FFA500', fontWeight: 'bold' }}>
                        You are being redirected to Login in {countdown}...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostRegister;