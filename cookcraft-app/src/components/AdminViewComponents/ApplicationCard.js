import styles from "../../css/AdminPanelCss/admin-style.module.css";

const ApplicationCard = () => {
    return <>
        <div className={styles.card}>
            <img
                src="https://via.placeholder.com/100"
                alt="Spaghetti Bolognese"
                className={styles.cardImage}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Spaghetti Bolognese</h3>
                <p><strong>Origin:</strong> Italian</p>
                <p><strong>Category:</strong> Beef</p>
            </div>
        </div>
    </>
}

export default ApplicationCard;