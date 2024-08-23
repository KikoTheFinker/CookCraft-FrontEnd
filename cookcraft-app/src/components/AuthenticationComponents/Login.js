import React, { useState, useEffect } from 'react';
import styles from '../../css/AuthenticationCss/login-style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const emailField = document.querySelector(`.${styles.emailInput}`);
    const emailLabel = emailField.nextElementSibling;
    const passwordFields = document.querySelectorAll(`.${styles.passwordInput}`);
    const passwordLabels = document.querySelectorAll(`.${styles.passwordInput} + span`);
  
    const handleEmailValidation = () => {
      const emailValue = emailField.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(emailValue)) {
        emailLabel.style.color = 'red';
      } else {
        emailField.style.borderColor = '#ccc';
        emailLabel.style.color = '#FFA500';
      }
    };
  
    const handleFocus = (label) => {
      label.style.top = '3px';
      label.style.fontSize = '0.85em';
      label.style.fontWeight = '600';
      label.style.transform = 'translateY(0)';
      label.style.color = '#FFA500';
    };
  
    const handleBlur = (field, label) => {
      if (!field.value) {
        label.style.top = '50%';
        label.style.fontSize = '1.1em';
        label.style.fontWeight = 'normal';
        label.style.transform = 'translateY(-50%)';
        label.style.color = 'rgba(51, 51, 51, 0.5)';
      }
    };
  
    emailField.addEventListener('input', handleEmailValidation);
    emailField.addEventListener('focus', () => handleFocus(emailLabel));
    emailField.addEventListener('blur', () => handleBlur(emailField, emailLabel));
  
    passwordFields.forEach((field, index) => {
      const passwordLabel = passwordLabels[index];
      field.addEventListener('focus', () => handleFocus(passwordLabel));
      field.addEventListener('blur', () => handleBlur(field, passwordLabel));
    });
  
    return () => {
      emailField.removeEventListener('input', handleEmailValidation);
      emailField.removeEventListener('focus', () => handleFocus(emailLabel));
      emailField.removeEventListener('blur', () => handleBlur(emailField, emailLabel));
  
      passwordFields.forEach((field, index) => {
        const passwordLabel = passwordLabels[index];
        field.removeEventListener('focus', () => handleFocus(passwordLabel));
        field.removeEventListener('blur', () => handleBlur(field, passwordLabel));
      });
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json(); 
        const { token, user_name, user_surname, email, phone_number} = data;
  
        localStorage.setItem('token', token);
        localStorage.setItem('userName', user_name);
        localStorage.setItem('userSurname', user_surname);
        localStorage.setItem('email', email);
        phone_number === undefined ? localStorage.setItem("phoneNumber", "") : localStorage.setItem("phoneNumber", phone_number)
  
        navigate('/');
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className={styles.loginContainer}>
      <div className={styles.backgroundContainer}></div>
      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={handleLogin} id="login-form">
          <img src={logo} alt="Logo" className={styles.logo} />
          <p className={styles.title}>Log in to see more</p>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <label>
            <input
              className={`${styles.input} ${styles.emailInput}`}
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <span>Email</span>
          </label>
          <label>
            <input
              className={`${styles.input} ${styles.passwordInput}`}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span>Password</span>
            <span className={styles.eye} onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} id="show-password" />
            </span>
          </label>
          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
          <p className={styles.signin}>
            Don't have an account? <Link to="/Register">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;