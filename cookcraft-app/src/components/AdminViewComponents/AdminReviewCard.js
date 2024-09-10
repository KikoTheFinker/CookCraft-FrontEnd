import styles from "../../css/AdminPanelCss/admin-style.module.css";

const AdminReviewCard = ({ data, onClick }) => {
    const { userName, userSurname, recipeName, rating } = data;

    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                    {userName} {userSurname}
                </h3>
                <p>
                    <strong>Recipe:</strong> {recipeName}
                </p>
                <p>
                    <strong>Rating:</strong> {rating}
                </p>
            </div>
        </div>
    );
};

export default AdminReviewCard;
