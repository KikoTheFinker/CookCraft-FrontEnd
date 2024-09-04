import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "../../css/RecipesCss/recipe-card-style.module.css";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

const RecipeCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
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
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!recipeAndProducts) {
        return <div className={styles.noRecipe}>No recipe found.</div>;
    }

    const handleBackClick = () => {
        if (location.state?.fromHomepage) {
            navigate("/");
            window.scrollTo({ top: 550, behavior: "smooth" });
        } else if (location.state) {
            const { category, nationality, page, productIds } = location.state;
            const searchParams = new URLSearchParams();
            if (category) {
                searchParams.set('category', category);
            }
            if (nationality) {
                searchParams.set('nationality', nationality);
            }
            if (productIds && productIds.length > 0) {
                productIds.forEach(id => {
                    searchParams.append('productId', id);
                });
            }
            searchParams.set('page', page || 0);
    
            navigate(`/recipes?${searchParams.toString()}`, { state: location.state });
        } else {
            navigate("/recipes");
        }
    };
    

    return (
        <div className={styles.recipeCard}>
            <div className={styles.backArrow} onClick={handleBackClick}>
                <FaArrowLeft />
            </div>
            <div className={styles.recipeDetails}>
                <img
                    src={recipeAndProducts.recipe.strMealThumb}
                    alt={recipeAndProducts.recipe.strMeal}
                    className={styles.recipeImage}
                />
                <div className={styles.textSection}>
                    <h2>{recipeAndProducts.recipe.strMeal}</h2>
                    <p className={styles.description}>{recipeAndProducts.recipe.strInstructions}</p>
                </div>
            </div>
            <div className={styles.ingredients}>
                <div>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipeAndProducts.productsInRecipes.map(product => (
                            <li key={product.id}>{product.name} - {product.measurement}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.videoSection}>
                    <h3>Watch the Recipe</h3>
                </div>
                <div className={styles.video}>
                    <iframe
                        src={recipeAndProducts.recipe.strYoutube.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
