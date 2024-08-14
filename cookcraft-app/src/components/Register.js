import React, { useState, useEffect } from 'react';
//import '../css/register-style.css';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import PostRegister from './PostRegister';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordIndicatorColor, setPasswordIndicatorColor] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [hasBeenRegistered, setHasBeenRegistered] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const isStrongPassword = validatePassword();

    if (password !== confirmPassword) {
      setPasswordStrength('Passwords do not match');
      setPasswordIndicatorColor('red');
    } else if (!isStrongPassword) {
      e.preventDefault();
    } else if (!emailIsValid) {
      e.preventDefault();
    } else {
      setHasBeenRegistered(true);
    }
  };

  useEffect(() => {
    const emailField = document.querySelector(".email-input");
    const emailLabel = emailField.nextElementSibling;

    const handleFocus = () => {
      emailLabel.style.top = "3px";
      emailLabel.style.fontSize = "0.9em";
      emailLabel.style.fontWeight = "600";
      emailLabel.style.transform = "translateY(0)";
      emailLabel.style.color = emailIsValid ? "#FFA500" : "red";
    };

    const handleBlur = () => {
      if (!emailField.value) {
        emailLabel.style.top = "50%";
        emailLabel.style.fontSize = "1em";
        emailLabel.style.fontWeight = "normal";
        emailLabel.style.transform = "translateY(-50%)";
        emailLabel.style.color = "rgba(51, 51, 51, 0.5)";
      } else {
        emailLabel.style.color = emailIsValid ? "#FFA500" : "red";
      }
    };

    emailField.addEventListener("focus", handleFocus);
    emailField.addEventListener("blur", handleBlur);

    return () => {
      emailField.removeEventListener("focus", handleFocus);
      emailField.removeEventListener("blur", handleBlur);
    };
  }, [emailIsValid]);

  return (
    <>
      {hasBeenRegistered ? (
        <PostRegister />
      ) : (
        <div className="register-page">
          <div className="background-container"></div>
          <div className="overlay">
            <form className="form" id="register-form" onSubmit={handleSubmit}>
              <img src={logo} alt="Logo" className="logo" />
              <p className="title">Create an Account</p>
              <p className="message">Signup now and get full access to our app.</p>
              <div className="flex">
                <label>
                  <input className="input" type="text" required />
                  <span>Firstname</span>
                </label>
                <label>
                  <input className="input" type="text" required />
                  <span>Lastname</span>
                </label>
              </div>
              <label>
                <input
                  className={`input email-input ${emailIsValid ? '' : 'invalid'}`}
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <span>Email</span>
              </label>
              <label>
                <input
                  className="input password-input"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span>Password</span>
                <span className="eye" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} id="show-password" />
                </span>
              </label>
              <label>
                <input
                  className="input password-input"
                  type={showPassword ? 'text' : 'password'}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <span>Confirm password</span>
              </label>
              <div id="password-indicator" className="password-indicator" style={{ color: passwordIndicatorColor }}>
                {passwordStrength}
              </div>
              <button className="submit" type="submit">
                Create account
              </button>
              <p className="signin">
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
