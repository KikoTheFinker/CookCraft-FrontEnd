import styles from "../../css/AdminPanelCss/admin-style.module.css";

const AdminOrderReviewCard = ({ data, onClick }) => {
    if(data.user === undefined)
    {
        return;
    }
    const { user, order } = data

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                    User: {user.name !== undefined ? user.name : "Unknown"}
                </h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rating:</strong> {order.rating}</p>
            </div>
        </div>
    );
}

export default AdminOrderReviewCard;