import styles from "../../css/AdminPanelCss/admin-style.module.css";

const AdminOrderCard = ({ data, onClick }) => {

    console.log(data)

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                    Test
                </h3>
                <p><strong>Email:</strong> email test</p>
                <p><strong>Phone Number:</strong> numberTest</p>
            </div>
        </div>
    );
}

export default AdminOrderCard;