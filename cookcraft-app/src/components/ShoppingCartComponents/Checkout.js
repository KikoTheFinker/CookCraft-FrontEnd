import React, { useContext, useState } from 'react';
import { FaTrashAlt, FaUtensils, FaArrowLeft } from "react-icons/fa";
import { CartContext } from './CartContext'; 
import { OrderContext } from './OrderContext'; 
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ShoppingCartCss/checkout-style.module.css';

const Checkout = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const { isOrderInProgress } = useContext(OrderContext); 
  const [quantities, setQuantities] = useState(cart.map(item => ({ id: item.id, grams: "" }))); 
  const cartLength = cart?.length || 0;
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); 
  };

  const roundToNearest50 = (value) => {
    let rounded = Math.round(value / 50) * 50;
    return Math.max(50, Math.min(rounded, 2000));
  };

  const handleQuantityChange = (id, newGrams) => {
    setQuantities(prevQuantities =>
      prevQuantities.map(q => q.id === id ? { ...q, grams: newGrams } : q)
    );
  };

  const handleQuantityBlur = (id, newGrams) => {
    const roundedGrams = roundToNearest50(newGrams);
    setQuantities(prevQuantities =>
      prevQuantities.map(q => q.id === id ? { ...q, grams: roundedGrams } : q)
    );
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    setQuantities(prevQuantities => prevQuantities.filter(q => q.id !== item.id));
  };

  const allInputsFilled = quantities.every(q => q.grams >= 50 && q.grams <= 2000);

  const handleProceed = () => {
    if (!isOrderInProgress) { 
      const itemsWithQuantities = cart.map((item) => ({
        id: item.id,
        name: item.name,
        measurement: item.measurement,
        grams: quantities.find(q => q.id === item.id)?.grams || 0
      }));
      navigate('/delivery-details', { state: { itemsWithQuantities } });
    }
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
                      min="50"
                      max="2000"
                      step="50"
                      value={currentQuantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      onBlur={(e) => handleQuantityBlur(item.id, e.target.value)}
                      className={styles.quantityInput}
                      placeholder="Enter grams"
                      disabled={isOrderInProgress} 
                    />
                    <p className={styles.gramsInfo}>50g - 2000g</p>
                    <button 
                      className={styles.removeButton} 
                      onClick={() => handleRemoveFromCart(item)}
                      disabled={isOrderInProgress} 
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
          disabled={cartLength === 0 || !allInputsFilled || isOrderInProgress} 
          onClick={handleProceed}
        >
          Get Items Delivered
        </button>
      </div>
    </div>
  );
};

export default Checkout;
