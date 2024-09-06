import styles from '../../css/ProfileCss/myReviews.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

const RecipeCard = ({ recipeId, name, description, category, origin, imageURL }) => {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/recipes/${recipeId}`, {
            state: { fromMyFavoriteRecipes: true }
        });
    }

    return (
        <div className={styles.cardContainer} onClick={handleCardClick}>
            <div className={styles.imgContainer}>
                <img src={imageURL} className={styles.img} alt={name}/>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.description}>
                    <p>{description}</p>
                </div>
            </div>
            <div className={styles.favoriteButton}>
                <span><FontAwesomeIcon icon={faSolidHeart} /></span>
            </div>
        </div>
    );
}

export default RecipeCard;
