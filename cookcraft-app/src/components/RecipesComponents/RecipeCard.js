import styles from "../../css/RecipesCss/recipe-card-style.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const RecipeCard = () => {
    const { id } = useParams();
    const [recipeAndProducts, setRecipeAndProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = `http://localhost:8080/api/recipes/${id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setRecipeAndProducts(data);
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

    if (!recipeAndProducts) {
        return <div>No recipe found.</div>;
    }

    return (
        <div className={styles.recipeCard}>
            <div className={styles.recipeDetails}>
                <img
                    src={recipeAndProducts.recipe.strMealThumb}
                    alt={recipeAndProducts.recipe.strMeal}
                    className={styles.recipeImage}
                />
                <div>
                    <h2>{recipeAndProducts.recipe.strMeal}</h2>
                    <p className={styles.description}>{recipeAndProducts.recipe.strInstructions}</p>
                </div>
            </div>
            <div className={styles.ingredients}>
                <div>
                    <h3>Ingredients:</h3>
                    <ul>
                        {recipeAndProducts.productsInRecipes.map(product => (
                            <li key={product.id}>{product.name} - {product.measurement}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.video}>
                    <h3>Watch the Recipe:</h3>
                    <iframe
                        src={recipeAndProducts.recipe.strYoutube.replace("watch?v=", "embed/")}
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
