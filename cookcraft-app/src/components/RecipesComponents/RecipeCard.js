import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaTrash } from "react-icons/fa"; 
import StarRating from "./StarRating";
import Modal from "./ReviewModal"; 
import styles from "../../css/RecipesCss/recipe-card-style.module.css";

const RecipeCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [recipeAndProducts, setRecipeAndProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState(3);
    const [isFavorite, setIsFavorite] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleteReviewId, setDeleteReviewId] = useState(null);
    const [modalMessage, setModalMessage] = useState(""); 

    const userEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/recipes/${id}`);
                const data = await response.json();

                setRecipeAndProducts(data);
                setReviews(data.reviews);

    
                const userReview = data.reviews.find(review => review.userEmail === userEmail);
                setHasReviewed(!!userReview); 

                const favoriteResponse = await fetch(`http://localhost:8080/api/favorite/check?userEmail=${userEmail}&recipeId=${id}`);
                const isFavorited = await favoriteResponse.json();
                setIsFavorite(isFavorited);

                setLoading(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, userEmail]);

    const handleBackClick = () => {
        if (location.state?.fromMyReviews) {
            navigate('/profile', { state: { selected: 2 } });
        } else if(location.state?.fromMyFavoriteRecipes) {
            navigate('/profile', { state: { selected: 1 } })
        } else if (location.state?.fromHomepage) {
            navigate("/");
            window.scrollTo({ top: 550, behavior: "smooth" });
        } else if (location.state) {
            const { category, nationality, page, productIds } = location.state;
            const searchParams = new URLSearchParams();
            if (category) searchParams.set('category', category);
            if (nationality) searchParams.set('nationality', nationality);
            if (productIds && productIds.length > 0) {
                productIds.forEach(id => searchParams.append('productId', id));
            }
            searchParams.set('page', page || 0);
            navigate(`/recipes?${searchParams.toString()}`, { state: location.state });
        } else {
            navigate("/recipes");
        }
    };
    const handleReviewSubmit = async () => {
        if (!token) {
            setModalMessage("You need to log in to submit a review.");
            setShowModal(true);
            return;
        }

        if (hasReviewed) {
            setModalMessage("You have already submitted a review for this recipe."); 
            setShowModal(true);
            return;
        }
        if (rating === 0){
            setModalMessage("You cannot leave a rating of 0."); 
            setShowModal(true);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ recipeId: id, review: newReview, rating }),
            });

            if (response.ok) {
                const updatedReviews = await response.json();
                setReviews(updatedReviews.sort((a, b) => b.rating - a.rating));
                setNewReview("");
                setRating(0);
                setHasReviewed(true); 
                
            } else {
                console.error("Failed to submit review:", await response.text());
                setModalMessage("Failed to submit review.");
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setModalMessage("Error submitting review.");
            setShowModal(true);
        }
    };

    const handleDeleteReview = async () => {
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:8080/api/reviews/${deleteReviewId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.ok) {
                setReviews(reviews.filter(review => review.id !== deleteReviewId));
                setDeleteReviewId(null);
                setHasReviewed(false);  
                setShowModal(false);
            } else {
                console.error('Error deleting review');
                setModalMessage("Error deleting review.");
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            setModalMessage("Error deleting review.");
            setShowModal(true);
        }
    };
    const handleFavoriteClick = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/favorite", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: localStorage.getItem("email"),
                    recipeId: id
                })
            });

            if (response.ok) {
                setIsFavorite(!isFavorite);
            } else {
                alert("Failed to update favorite status.");
            }
        }
        catch (error) {
            alert("An error occurred while trying to add the recipe to your favorites.")
        }
    };

    const openDeleteModal = (reviewId) => {
        setDeleteReviewId(reviewId);
        setModalMessage("Are you sure you want to delete this review?");
        setShowModal(true);  
    };

    const closeModal = () => {
        setShowModal(false);
        setDeleteReviewId(null);  
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (!recipeAndProducts) return <div className={styles.noRecipe}>No recipe found.</div>;

    return (
        <div className={styles.recipeCard}>
<Modal 
    isOpen={showModal} 
    onClose={closeModal} 
    title="Notification" 
    deleteReviewId={deleteReviewId} 
    handleDeleteReview={handleDeleteReview}
>
    <p>{modalMessage}</p>
</Modal>
            <div className={styles.backArrow} onClick={handleBackClick}>
                <FaArrowLeft />
            </div>

            <button 
                className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`} 
                onClick={handleFavoriteClick}
            >
                <FaHeart />
            </button>

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
                <h3>Ingredients</h3>
                <ul>
                    {recipeAndProducts.productsInRecipes.map(product => (
                        <li key={product.id}>{product.name} - {product.measurement}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.videoSection}>
    <h3>Recipe Video</h3>
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
            <div className={styles.reviewsSection}>
    <h3>REVIEWS</h3>
    <ul>
    {reviews.slice(0, visibleReviews).map(review => (
       <li key={review.id} className={styles.reviewItem}>
       <div className={styles.reviewContent}>
           <strong>{review.userName} {review.userSurname}</strong>
           <span>{review.review}</span>
       </div>
       <span className={styles.ratingText}>Rating: {review.rating}</span>
       {review.userEmail === userEmail && (
           <button onClick={() => openDeleteModal(review.id)} className={styles.deleteButton}>
               <FaTrash /> Delete
           </button>
       )}
   </li>
   
    ))}
</ul>
                {visibleReviews < reviews.length && (
                    <button onClick={() => setVisibleReviews(prev => prev + 3)} className={styles.showMoreButton}>
                        Show More
                    </button>
                )}

                <div className={styles.addReview}>
                    <h4>Add Your Review</h4>
                    <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review here..."
                    />
                    <StarRating rating={rating} setRating={setRating} />
                    <button 
                        onClick={handleReviewSubmit}
                        className={styles.submitReviewButton}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
