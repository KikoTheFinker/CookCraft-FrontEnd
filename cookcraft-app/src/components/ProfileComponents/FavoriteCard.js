import styles from '../../css/ProfileCss/myReviews.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

const RecipeCard = ({ recipeId, name, category, origin, imageURL }) => {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/recipes/${recipeId}`, {
            state: { fromMyFavoriteRecipes: true }
        });
    }

    return (
        <div className={styles.cardContainer} onClick={handleCardClick}>
            <div className={styles.imgContainer}>
                <img
                    src={imageURL}
                    className={styles.img}
                    alt={name}/>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.textSection}>
                    <h3 className={styles.recipeName}>{name}</h3>
                    <div>
                        <span className={styles.userFavoriteIndicator}>Origin:</span>
                        <span className={styles.userFavoriteCuisineText}>{origin}</span>
                    </div>
                    <div>
                        <span className={styles.userFavoriteIndicator}>Category:</span>
                        <span className={styles.userFavoriteCuisineText}>{category}</span>
                    </div>
                </div>
                <div className={styles.favoriteButton}>
                    <span><FontAwesomeIcon icon={faSolidHeart} style={{ color: 'red' }}/></span>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;