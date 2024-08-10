import React, { useState, useEffect } from 'react';
import '../css/login-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const emailField = document.querySelector(".email-input");
    const emailLabel = emailField.nextElementSibling;
    const passwordFields = document.querySelectorAll(".password-input");
    const passwordLabels = document.querySelectorAll(".password-input + span");

    emailField.addEventListener("input", function () {
      const emailValue = emailField.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailValue)) {
        emailLabel.style.color = "red";
      } else {
        emailField.style.borderColor = "#ccc";
        emailLabel.style.color = "#FFA500";
      }
    });

    emailField.addEventListener("focus", function () {
      emailLabel.style.top = "3px";
      emailLabel.style.fontSize = "0.85em";
      emailLabel.style.fontWeight = "600";
      emailLabel.style.transform = "translateY(0)";
      emailLabel.style.color = "#FFA500";
    });

    emailField.addEventListener("blur", function () {
      if (!emailField.value) {
        emailLabel.style.top = "50%";
        emailLabel.style.fontSize = "1.1em";
        emailLabel.style.fontWeight = "normal";
        emailLabel.style.transform = "translateY(-50%)";
        emailLabel.style.color = "rgba(51, 51, 51, 0.5)";
      }
    });

    passwordFields.forEach((field, index) => {
      const passwordLabel = passwordLabels[index];
      field.addEventListener("focus", function () {
        passwordLabel.style.top = "3px";
        passwordLabel.style.fontSize = "0.85em";
        passwordLabel.style.fontWeight = "600";
        passwordLabel.style.transform = "translateY(0)";
        passwordLabel.style.color = "#FFA500";
      });

      field.addEventListener("blur", function () {
        if (!field.value) {
          passwordLabel.style.top = "50%";
          passwordLabel.style.fontSize = "1.1em";
          passwordLabel.style.fontWeight = "normal";
          passwordLabel.style.transform = "translateY(-50%)";
          passwordLabel.style.color = "rgba(51, 51, 51, 0.5)";
        }
      });
    });

    return () => {
      emailField.removeEventListener("input", () => {});
      emailField.removeEventListener("focus", () => {});
      emailField.removeEventListener("blur", () => {});
      passwordFields.forEach((field) => {
        field.removeEventListener("focus", () => {});
        field.removeEventListener("blur", () => {});
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

  return (
    <div>
      <div className="background-container"></div>
      <div className="overlay">
        <form className="form" action="#" method="POST" id="login-form">
          <img src={logo} alt="Logo" className="logo" />
          <p className="title">Log in to see more</p>
          <label>
            <input
              className="input email-input"
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
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span>Password</span>
            <span className="eye" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} id="show-password" />
            </span>
          </label>
          <button className="submit">Log in</button>
          <p className="signin">Don't have an account? <Link to="/Register">Sign up here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
