import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaStar } from 'react-icons/fa';
import styles from '../../css/ProfileCss/myReviews.module.css';

const ReviewCard = ({ imageURL, rating, reviewText, recipeName, recipeId, isUserReview }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/recipes/${recipeId}`, {
            state: { fromMyReviews: true } 
        });
    };

    const renderStars = () => {
        return (
            <div className={styles.starRating}>
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={styles.star}
                        color={index < rating ? "#FFA550" : "#ccc"}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={styles.cardContainer} onClick={handleCardClick}>
            <div className={styles.imgContainer}>
                <img
                    alt={recipeName}
                    src={imageURL}
                    className={styles.img}
                />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.textSection}>
                    <h3 className={styles.recipeName}>{recipeName}</h3>
                    {isUserReview && <span className={styles.userReviewIndicator}>Your Review:</span>}
                    <p className={styles.reviewText}>{reviewText || "No review provided."}</p>
                </div>
                <div className={styles.ratingSection}>
                    {renderStars()}
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
