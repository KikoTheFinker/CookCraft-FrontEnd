import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../RecipesComponents/StarRating'; 
import styles from '../../css/ShoppingCartCss/delivery-review-style.module.css';

const DeliveryReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = localStorage.getItem('orderId');
    if (!orderId) {
      navigate('/');
    }
  }, [navigate]);

  const handleConfirm = () => {
    const orderId = localStorage.getItem('orderId');
    if (orderId && (rating > 0 || comment.trim() !== '')) {
      const token = localStorage.getItem('token'); 
      fetch(`http://localhost:8080/api/orders/${orderId}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          review: comment,
          rating: rating
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setShowModal(true);
          setTimeout(() => {
            navigate('/');
            localStorage.removeItem('orderId');
            window.location.reload();
          }, 2000);
        }
      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
    } else {
      alert('Please provide a rating or a comment!');
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <h2>Rate Your Delivery Experience</h2>

      <StarRating rating={rating} setRating={setRating} />

      <textarea
        className={styles.reviewComment}
        placeholder="Leave a comment (optional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button onClick={handleConfirm} className={styles.confirmButton}>
        Confirm Review
      </button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Thank you for the review!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryReview;
