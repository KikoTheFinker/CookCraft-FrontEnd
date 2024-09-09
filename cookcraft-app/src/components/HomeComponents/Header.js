import React, { useState, useEffect} from "react";
import Logo from "../../images/logo.png"; 
import styles from "../../css/HomeCss/header.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import ShoppingCart from '../ShoppingCartComponents/ShoppingCart'; 

function Header({ ingredients = [] }) { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ username: '', usersurname: '' });
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userName = localStorage.getItem('userName') || 'User';
      const userSurname = localStorage.getItem('userSurname') || 'Name';
      setUser({ username: userName, usersurname: userSurname });
      checkUserType(token);
    }
  }, []);

  const checkUserType = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/usertype", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRole(data); 
      } else {
        console.log("Error getting response.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={Logo} alt="CookCraft Logo" className={styles.logoImage} />
            <span className={styles.logoText}>
              Cook<span className={styles.accentColor}>Craft</span>
            </span>
          </div>
        </Link>
        <nav className={styles.navContainer}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/Recipes" className={styles.navLink}>Recipes</Link>
          <a href="/About" className={styles.navLink}>About</a>
          {
            role === "User" ?
              <Link to="/apply" className={styles.navLink}>Apply for Delivery</Link>
              : role === "DeliveryPerson" ?
                <Link to="/deliver" className={styles.navLink}>Start Delivering</Link>
                : role === "Admin" ?
                  <Link to="/admin" className={styles.navLink}>Administrator</Link>
                  : null
          }
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
                  <Link to="/profile" state={{selected: 0}} className={styles.dropdownLink}>Profile</Link>
                  <Link to="/profile" state={{selected: 1}} className={styles.dropdownLink}>Favorite Recipes</Link>
                  <Link to="/profile" state={{selected: 2}} className={styles.dropdownLink}>My Reviews</Link>
                  <Link to="/profile" state={{selected: 3}} className={styles.dropdownLink}>Order History</Link>
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
            <ShoppingCart ingredients={ingredients} hideIngredients={true} />
        </nav>
      </div>
    </header>
  );
}

export default Header;
