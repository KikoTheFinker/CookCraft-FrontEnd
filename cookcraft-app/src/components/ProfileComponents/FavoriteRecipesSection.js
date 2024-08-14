import styles from '../../css/ProfileCss/profile-view-style.module.css';
import RecipeCard from "./RecipeCard";
import image1 from "../../images/Dinner.jpg";
import image2 from "../../images/Dinner.jpg";
import image3 from "../../images/Dinner.jpg";

const FavoriteRecipesSection = () => {
    return (
        <div className={styles.profileSection}>
            <RecipeCard imageURL={image1} />
            <RecipeCard imageURL={image2} />
            <RecipeCard imageURL={image3} />
        </div>
    );
}

export default FavoriteRecipesSection;