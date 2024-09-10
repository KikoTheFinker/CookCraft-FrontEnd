import styles from "../../css/AdminPanelCss/modal-style.module.css";

const ReviewModal = ({ isOpen, onClose, reviewData, onRemove }) => {
    if (!isOpen) return null;
    console.log(reviewData);

    const handleRemove = () => {
        onRemove(reviewData.id);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Review Details</h2>
                <p><strong>Name:</strong> {reviewData.userName} {reviewData.userSurname}</p>
                <p><strong>Email:</strong> {reviewData.userEmail}</p>
                <p><strong>Recipe Name:</strong> {reviewData.recipeName}</p>
                <p><strong>Rating:</strong> {reviewData.rating}</p>
                <p><strong>Review Text:</strong> {reviewData.review}</p>
                <button onClick={handleRemove} className={styles.removeButton}>
                    Remove Review
                </button>
            </div>
        </div>
    );
};

export default ReviewModal;