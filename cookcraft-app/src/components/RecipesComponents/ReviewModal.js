import React from 'react';
import styles from '../../css/RecipesCss/review-modal.module.css'; 

const Modal = ({ isOpen, onClose, title, children, deleteReviewId, handleDeleteReview }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>{title}</h3>
                <div>{children}</div>
                <div>
                    {deleteReviewId && (
                        <button 
                            onClick={handleDeleteReview} 
                            className={`${styles.modalButton} ${styles.modalButtonDelete}`}
                        >
                            Yes, delete
                        </button>
                    )}
                    <button 
                        onClick={onClose} 
                        className={`${styles.modalButton} ${styles.modalButtonClose}`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
