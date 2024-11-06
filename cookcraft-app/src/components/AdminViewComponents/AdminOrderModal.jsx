import styles from "../../css/AdminPanelCss/modal-style.module.css";

const AdminOrderModal = ({ isOpen, onClose, orderData }) => {
    if (!isOpen) return null;

    const { user, order, deliveryPerson} = orderData;
    const splittedAddress = order.address !== undefined ? order.address.split(";") : ["", "", ""];

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>Order Details</h2>

                <h3>User Details</h3>
                <p><strong>Name:</strong> {user.name} {user.surname} </p>
                <p><strong>Email:</strong> {user.email} </p>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                <p><strong>Deliver To:</strong> {splittedAddress[0]} {splittedAddress[1]} {splittedAddress[2]}</p>

                {
                    deliveryPerson !== null &&
                    <>
                        <h3>Delivery Person Details</h3>
                        <p><strong>Name:</strong> {deliveryPerson.name} </p>
                        <p><strong>Email:</strong> {deliveryPerson.email} </p>
                        <p><strong>Phone Number:</strong> {deliveryPerson.name} </p>
                    </>
                }
            </div>
        </div>
    );
}

export default AdminOrderModal;