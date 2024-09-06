import React, { useEffect, useState } from 'react';
import styles from '../../css/ProfileCss/myReviews.module.css';
import ReviewCard from "./ReviewCard";

const MyReviewsSection = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("User not authenticated. Please log in first.");
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/reviews/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setReviews(data);
                } else {
                    console.error("Failed to fetch reviews. Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className={styles.profileSection}>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <ReviewCard
                        key={index}
                        imageURL={review.mealThumb}
                        rating={review.rating}
                        reviewText={review.review}
                        recipeName={review.recipeName}
                        recipeId={review.recipeId}
                        isUserReview={true}
                        
                    />
                ))
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
};

export default MyReviewsSection;
