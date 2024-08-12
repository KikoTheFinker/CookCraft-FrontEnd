import RecipeCard from "./RecipeCard";

import image1 from "../images/gokiTestImages/dish1.jpg"
import image2 from "../images/gokiTestImages/dish2.jpg"
import image3 from "../images/gokiTestImages/dish3.jpg"

const FavoriteRecipesSection = () => {
    return <div className="profile-section">
        <RecipeCard imageURL={image1}/>
        <RecipeCard imageURL={image2}/>
        <RecipeCard imageURL={image3}/>
    </div>
}

export default FavoriteRecipesSection