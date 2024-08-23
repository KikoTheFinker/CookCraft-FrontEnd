import styles from "../../css/RecipesCss/recipe-card-style.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const RecipeCard = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = `http://localhost:8080/api/recipes/${id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!recipe) {
        return <div>No recipe found.</div>;
    }

    return (
        <div className={styles.recipeCard}>
            <div className={styles.recipeDetails}>
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className={styles.recipeImage}
                />
                <div>
                    <h2>{recipe.strMeal}</h2>
                    <p className={styles.description}>{recipe.strInstructions}</p>
                </div>
            </div>
            <div className={styles.ingredients}>
                <div>
                    <h3>Ingredients:</h3>
                    <ul>
                        <li>Chicken - 500g</li>
                        <li>Yogurt - 1 cup</li>
                        <li>Onion - 2 medium, finely chopped</li>
                        <li>Ginger Garlic Paste - 1 tbsp</li>
                        <li>Spices (turmeric, red chili powder, garam masala, etc.)</li>
                        <li>Oil - 2 tbsp</li>
                        <li>Salt to taste</li>
                    </ul>
                </div>
                <div className={styles.video}>
                    <h3>Watch the Recipe:</h3>
                    <iframe
                        src={recipe.strYoutube.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
