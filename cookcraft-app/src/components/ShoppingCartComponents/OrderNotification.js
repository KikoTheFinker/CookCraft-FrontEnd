import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from './OrderContext';
import { FaBiking } from 'react-icons/fa'; 
import styles from '../../css/ShoppingCartCss/order-notification.module.css'; 

const OrderNotification = () => {
  const { isOrderInProgress, itemsWithQuantities } = useContext(OrderContext); 
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null); 

  const handleNotificationClick = () => {
    setShowPopup(!showPopup); 
  };

  const handleGoToOrder = () => {
    navigate('/delivery-details', { state: { itemsWithQuantities } });
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  return (
    <>
      {isOrderInProgress && (
        <div className={styles.notificationCircle} onClick={handleNotificationClick}>
          <FaBiking className={styles.notificationIcon} />
          <span className={styles.exclamationMark}>!</span>
        </div>
      )}

      {showPopup && (
        <div ref={popupRef} className={styles.notificationPopup}>
          <p>Active Order</p>
          <button onClick={handleGoToOrder}>Go to Order</button>
        </div>
      )}
    </>
  );
};

export default OrderNotification;
