import styles from '../../css/ProfileCss/myReviews.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as Like, faThumbsDown as Dislike } from "@fortawesome/free-solid-svg-icons";


const ReviewCard = ({ imageURL, isPositive, reviewText }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
                <img alt="Image of the Recipe" src={imageURL} className={styles.img} />
            </div>
            <div className={styles.description}>
                <p>{reviewText}</p>
            </div>
            <div className={styles.favoriteButton}>
                <span><FontAwesomeIcon icon={isPositive ? Like : Dislike} /></span>
            </div>
        </div>
    );
};

export default ReviewCard;