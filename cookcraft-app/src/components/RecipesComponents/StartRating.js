import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from '../../css/RecipesCss/recipe-card-style.module.css';

const StarRating = ({ rating, setRating, readOnly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (starValue) => {
    if (!readOnly) {
      setHoverRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  const handleClick = (starValue) => {
    if (!readOnly && setRating) {
      setRating(starValue);
    }
  };

  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            className={`${styles.star} ${
              (hoverRating || rating) >= starValue ? styles.active : ''
            }`}
            onMouseOver={() => handleMouseOver(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
