import React from "react";
import Logo from "../../images/logo.png";
import styles from "../../css/HomeCss/header.module.css";
import { Link } from 'react-router-dom';

function Header() {
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
          <Link to="/login" className={styles.authButton}>Log In</Link>
          <Link to="/register" className={styles.authButton}>Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;