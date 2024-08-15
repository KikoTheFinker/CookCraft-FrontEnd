import React, { useState, useEffect } from "react";
import Logo from "../../images/logo.png"; 
import styles from "../../css/HomeCss/header.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ username: '', usersurname: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userName = localStorage.getItem('userName') || 'User';
      const userSurname = localStorage.getItem('userSurname') || 'Name';
      setUser({ username: userName, usersurname: userSurname });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={Logo} alt="CookCraft Logo" className={styles.logoImage} />
          <span className={styles.logoText}>
            Cook<span className={styles.accentColor}>Craft</span>
          </span>
        </div>
        <nav className={styles.navContainer}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <a href="#recipes" className={styles.navLink}>Recipes</a>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
          {isLoggedIn && (
            <div className={styles.profileMenu}>
              <button onClick={toggleDropdown} className={styles.profileButton}>
                <FontAwesomeIcon icon={faCog} className={styles.settingsIcon} /> 
              </button>
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.greeting}>
                    Hello, <br/>{user.username} {user.usersurname}
                  </div>
                  <Link to="/profile" className={styles.dropdownLink}>Profile</Link>
                  <Link onClick={handleLogout} className={styles.dropdownLink}>Logout</Link>
                </div>
              )}
            </div>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/login" className={styles.authButton}>Log In</Link>
              <Link to="/register" className={styles.authButton}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
