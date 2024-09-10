import React, { useContext, useState } from 'react';
import { FaTrashAlt, FaUtensils, FaArrowLeft } from "react-icons/fa";
import { CartContext } from './CartContext'; 
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ShoppingCartCss/checkout-style.module.css';

const Checkout = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(cart.map(item => ({ id: item.id, grams: "" }))); 
  const cartLength = cart?.length || 0;
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); 
  };

  const handleQuantityChange = (id, newGrams) => {
    const validGrams = Math.max(100, Math.min(2000, parseInt(newGrams) || "")); 
    setQuantities(prevQuantities =>
      prevQuantities.map(q => q.id === id ? { ...q, grams: validGrams } : q)
    );
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    setQuantities(prevQuantities => prevQuantities.filter(q => q.id !== item.id));
  };

  const allInputsFilled = quantities.every(q => q.grams >= 100 && q.grams <= 2000);

  const handleProceed = () => {
    const itemsWithQuantities = cart.map((item) => ({
      id: item.id,
      name: item.name,
      measurement: item.measurement,
      grams: quantities.find(q => q.id === item.id)?.grams || 0
    }));
    navigate('/delivery-details', { state: { itemsWithQuantities } });
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutCard}>
        <h2 className={styles.checkoutTitle}>Checkout</h2>
        <div className={styles.backArrow} onClick={handleBackClick}>
          <FaArrowLeft />
        </div>
        {cartLength === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className={styles.cartItems}>
            <p>You have {cartLength} items in your cart:</p>
            <p>Enter the amount of grams needed for each ingredient:</p>
            <ul className={styles.itemList}>
              {cart.map((item, index) => {
                const currentQuantity = quantities.find(q => q.id === item.id)?.grams || "";
                return (
                  <li key={index} className={styles.cartItem}>
                    <FaUtensils className={styles.cartItemIcon} />
                    <div className={styles.itemDetails}>
                      <p className={styles.itemLabel}>{item.name}</p>
                      <p className={styles.quantityLabel}>In Recipe: {item.measurement}</p>
                    </div>
                    <input
                      type="number"
                      min="100"
                      max="2000"
                      step="50" 
                      value={currentQuantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className={styles.quantityInput}
                      placeholder="Enter grams"
                    />
                    <p className={styles.gramsInfo}>100g - 2000g</p>
                    <button 
                      className={styles.removeButton} 
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      <FaTrashAlt />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <button 
          className={cartLength > 0 && allInputsFilled ? styles.proceedButton : styles.disabledButton} 
          disabled={cartLength === 0 || !allInputsFilled}
          onClick={handleProceed}
        >
          Get Items Delivered
        </button>
      </div>
    </div>
  );
};

export default Checkout;
