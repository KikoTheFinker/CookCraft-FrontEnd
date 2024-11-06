import React from 'react';
import styles from '../../css/ShoppingCartCss/error-modal.module.css';

const ErrorModal = ({ message, onClose, onLogin }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Notification</h2>
                <p>{message}</p>
                <button className={styles.modalButtonClose} onClick={onClose}>Close</button>
                <button className={styles.modalButtonLogin} onClick={onLogin}>Go to Login</button>
            </div>
        </div>
    );
};

export default ErrorModal;
