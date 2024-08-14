import styles from '../../css/ProfileCss/myReviews.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ imageURL }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
                <img src={imageURL} className={styles.img} />
            </div>
            <div className={styles.description}>
                <p>Lorem ipsum dolor sit amet. Est possimus dolorem ut quia dolorem ea optio dicta nam amet corporis. Ut quia tenetur eum mollitia suscipit ut magnam soluta. Id magnam quia qui delectus alias qui fugiat voluptatem rem laborum modi id sunt dolores id voluptas nemo.</p>
            </div>
            <div className={styles.favoriteButton}>
                <span><FontAwesomeIcon icon={faSolidHeart} /></span>
            </div>
        </div>
    );
}

export default RecipeCard;
