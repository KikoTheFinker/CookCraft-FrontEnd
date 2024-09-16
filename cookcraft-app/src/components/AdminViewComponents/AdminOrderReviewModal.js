import styles from "../../css/AdminPanelCss/modal-style.module.css";

const AdminOrderReviewModal = ({ isOpen, onClose, orderReviewData, onRemove }) => {
    if (!isOpen ||
        orderReviewData.user === undefined ||
        orderReviewData.order === undefined ||
        orderReviewData.deliveryPerson === null
    ) return null;

    const { user, order, deliveryPerson } = orderReviewData
    const addr = order.address.split(";");
    console.log(addr)
    console.log(user)
    console.log(order)
    console.log(deliveryPerson)
    console.log(order.id)

    const handleRemove = () => {
        onRemove(order.id);
        onClose();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Review Details</h2>

                <h3>User Details</h3>
                <p><strong>Name:</strong> {user.name} {user.surname} </p>
                <p><strong>Email:</strong> {user.email} </p>
                <p><strong>Phone Number:</strong> {user.phoneNumber} </p>
                <p><strong>Deliver To:</strong> {addr[0] || ""} {addr[1] || ""} {addr[2] || ""} </p>

                <h3>Delivery Person Details</h3>
                <p><strong>Name:</strong> {deliveryPerson.name} {deliveryPerson.surname} </p>
                <p><strong>Email:</strong> {deliveryPerson.email} </p>
                <p><strong>Phone Number:</strong> {deliveryPerson.phoneNumber} </p>

                <h3>Review:</h3>
                <p><strong>Rating:</strong> {order.rating}</p>
                <p>{order.review}</p>

                <button onClick={handleRemove} className={styles.removeButton}>
                    Remove Review
                </button>
            </div>
        </div>
    );
}

export default AdminOrderReviewModal;