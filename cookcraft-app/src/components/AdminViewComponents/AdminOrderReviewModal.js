import styles from "../../css/AdminPanelCss/modal-style.module.css";

const AdminOrderReviewModal = ({ isOpen, onClose, reviewData, onRemove }) => {
    if (!isOpen) return null;

    const handleRemove = () => {
        //onRemove(reviewData.id);
        onClose();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Review Details</h2>

                <h3>User Details</h3>
                <p><strong>Name:</strong> Test Test </p>
                <p><strong>Email:</strong> test@gmail.com </p>
                <p><strong>Phone Number:</strong> 075333222</p>
                <p><strong>Deliver To:</strong> Shekerinska 27 5</p>

                <h3>Delivery Person Details</h3>
                <p><strong>Name:</strong> Test Test </p>
                <p><strong>Email:</strong> test@gmail.com </p>
                <p><strong>Phone Number:</strong> 075300200 </p>

                <h4>Review:</h4>
                <p><strong>Rating:</strong> 5</p>
                <p>That was amazing fast delivery!</p>

                <button onClick={handleRemove} className={styles.removeButton}>
                    Remove Review
                </button>
            </div>
        </div>
    );
}

export default AdminOrderReviewModal;