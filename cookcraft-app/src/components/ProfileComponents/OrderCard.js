import styles from '../../css/ProfileCss/orderHistory.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown as Dislike, faThumbsUp as Like } from "@fortawesome/free-solid-svg-icons";

const OrderCard = () => {
    return (
        <div className={styles.orderCard}>
            <div className={styles.orderDescription}>
                <p>
                    <strong>Order id:</strong> a7FS53l
                    <strong>Location:</strong> Bul. Ilinden 103/6
                    <strong>Delivery Person:</strong> Kristijan Petkov
                </p>
            </div>
            <div className={styles.orderReviewButtons}>
                <span>
                    <FontAwesomeIcon icon={Like} className={styles.orderBtn} />
                </span>
                <span>
                    <FontAwesomeIcon icon={Dislike} className={styles.orderBtn} />
                </span>
            </div>
        </div>
    );
}

export default OrderCard;
