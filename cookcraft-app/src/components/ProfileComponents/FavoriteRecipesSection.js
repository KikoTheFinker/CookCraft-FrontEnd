import styles from '../../css/ProfileCss/profile-view-style.module.css';
import FavoriteCard from "./FavoriteCard";
import {useEffect, useState} from "react";

const FavoriteRecipesSection = () => {

    const [favoriteRecipes, setFavoriteRecipes] = useState([])

    useEffect(() => {

        const fetchFavoriteRecipes = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                alert("User not authorized.")
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/api/favorite/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}}`,
                        'Content-Type': 'application/json'
                    }
                })

                if(response.ok)
                {
                    const data = await response.json()
                    const sortedData = data.sort((a, b) => b.id - a.id);
                    setFavoriteRecipes(sortedData);
                }
                else
                {
                    console.error(response.status)
                }
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchFavoriteRecipes()
    }, []);

    return (
        <div className={styles.profileSection}>
            {
                favoriteRecipes.length === 0 ?
                    (<p>No recipes found.</p>)
                    :
                    favoriteRecipes.map((recipe, index) => (
                        <FavoriteCard
                            key = {index}
                            recipeId = {recipe.id}
                            name = {recipe.strMeal}
                            description = {recipe.strInstructions}
                            category = {recipe.strCategory}
                            origin = {recipe.strArea}
                            imageURL = {recipe.strMealThumb}
                        />
                    ))

            }
        </div>
    );
}

export default FavoriteRecipesSection;