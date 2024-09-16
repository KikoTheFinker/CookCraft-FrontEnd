import styles from "../../css/AdminPanelCss/admin-style.module.css";

const AdminOrderCard = ({ data, onClick }) => {

    const address= data.order.address !== undefined ? data.order.address.split(";") : ["","",""];

    return (
        <div className={`${styles.card} ${styles.adminOrderCard}`} onClick={onClick}>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                    User: {data.user.name} {data.user.surname}
                </h3>
                <p><strong>Address:</strong> {address[0]} {address[1]} {address[2]}</p>
            </div>
        </div>
    );
}

export default AdminOrderCard;