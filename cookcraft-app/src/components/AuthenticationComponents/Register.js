import React, { useState, useEffect } from 'react';
import loginStyles from '../../css/AuthenticationCss/login-style.module.css';
import registerStyles from '../../css/AuthenticationCss/register-style.module.css';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import PostRegister from './PostRegister';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordIndicatorColor, setPasswordIndicatorColor] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [hasBeenRegistered, setHasBeenRegistered] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleNameChange = (e) => {
    setFirstName(capitalizeFirstLetter(e.target.value));
  };

  const handleSurnameChange = (e) => {
    setLastName(capitalizeFirstLetter(e.target.value));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailIsValid(emailRegex.test(emailValue));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = () => {
    let strengthMessage = '';
    let strengthColor = '';
    let isStrongPassword = false;
  
    if (password.length < 6) {
      strengthMessage = 'Password must be at least 6 characters';
      strengthColor = 'red';
    } else {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
      if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
        isStrongPassword = true;
      } else {
        strengthMessage = 'Password should include uppercase, lowercase, numbers, and special characters';
        strengthColor = 'orange';
      }
    }
  
    setPasswordStrength(strengthMessage);
    setPasswordIndicatorColor(strengthColor);
  
    return isStrongPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isStrongPassword = validatePassword();
  
    if (password !== confirmPassword) {
      setPasswordStrength('Passwords do not match');
      setPasswordIndicatorColor('red');
      return;
    } 
  
    if (!isStrongPassword) {
      return;
    }
  
    if (!emailIsValid) {
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name: firstName,  
          surname: lastName,   
        }),
      });
  
      if (response.ok) {
        setHasBeenRegistered(true);
      } else {
        const errorText = await response.text();
        setPasswordStrength(errorText);
        setPasswordIndicatorColor('red');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setPasswordStrength('An error occurred during registration. Please try again.');
      setPasswordIndicatorColor('red');
    }
  };

  return (
    <>
      {hasBeenRegistered ? (
        <PostRegister />
      ) : (
        <div className={loginStyles.loginContainer}>
          <div className={loginStyles.backgroundContainer}></div>
          <div className={loginStyles.overlay}>
            <form className={loginStyles.form} id="register-form" onSubmit={handleSubmit}>
              <img src={logo} alt="Logo" className={loginStyles.logo} />
              <p className={loginStyles.title}>Create an Account</p>
              <p className={registerStyles.message}>Signup now and get full access to our app.</p>
              <div className={registerStyles.flex}>
                <label>
                  <input 
                    className={loginStyles.input} 
                    type="text" 
                    value={firstName} 
                    onChange={handleNameChange} 
                    required 
                  />
                  <span>Firstname</span>
                </label>
                <label>
                  <input 
                    className={loginStyles.input} 
                    type="text" 
                    value={lastName} 
                    onChange={handleSurnameChange} 
                    required 
                  />
                  <span>Lastname</span>
                </label>
              </div>

              <label>
                <input
                  className={`${loginStyles.input} ${emailIsValid ? '' : registerStyles.invalid}`}
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <span>Email</span>
              </label>

              <label>
                <input
                  className={`${loginStyles.input} ${loginStyles.passwordInput}`}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span>Password</span>
                <span className={loginStyles.eye} onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} id="show-password" />
                </span>
              </label>
              <label>
                <input
                  className={`${loginStyles.input} ${loginStyles.passwordInput}`}
                  type={showPassword ? 'text' : 'password'}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <span>Confirm password</span>
              </label>
              <div id="password-indicator" className={registerStyles.passwordIndicator} style={{ color: passwordIndicatorColor }}>
                {passwordStrength}
              </div>
              <button className={loginStyles.submit} type="submit">
                Create account
              </button>
              <p className={loginStyles.signin}>
                Already have an account? <Link to="/Login">Log into existing account</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
