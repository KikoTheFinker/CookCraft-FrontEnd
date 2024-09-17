import React, { createContext, useState, useEffect, useContext, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import styles from '../..//css/ShoppingCartCss/delivery-details-style.module.css';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [isOrderInProgress, setIsOrderInProgress] = useState(JSON.parse(localStorage.getItem('isOrderInProgress')) || false); 
  const [orderId, setOrderId] = useState(localStorage.getItem('orderId'));
  const [isOrderFinished, setIsOrderFinished] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false); 
  const [disableNewOrder, setDisableNewOrder] = useState(false); 
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const finishOrder = useCallback(() => {
    setOrderId(null);
    setIsOrderInProgress(false);
    setIsOrderFinished(true);
    setCart([]);
    setOrderStatus('Order delivered!');
    localStorage.removeItem('isOrderInProgress');
    setShowRatingModal(true);
    setDisableNewOrder(true);
  }, [setCart]);

  const checkOrderStatus = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/status/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const orderStatusMessage = await response.text();
      setOrderStatus(orderStatusMessage);
      if (orderStatusMessage.toLowerCase().includes('review')) {
        finishOrder(); 
      }
    } catch (error) {
      console.error('Error checking order status:', error);
      setOrderStatus('Error checking order status.');
    }
  }, [finishOrder]);

  useEffect(() => {
    const fetchActiveOrder = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/orders/active', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const order = await response.json();
        if (order && !order.isFinished) {
          setOrderId(order.id);
          localStorage.setItem('orderId', order.id);
          setIsOrderInProgress(true);
          localStorage.setItem('isOrderInProgress', true);
          setIsOrderFinished(false);
        } else if (order && order.isFinished) {
          setOrderId(order.id);
          setIsOrderInProgress(false);
          setIsOrderFinished(true);
        }
      } catch (error) {
        console.error('Error fetching active order:', error);
      }
    };

    if (orderId) {
      checkOrderStatus(orderId);
    } else {
      fetchActiveOrder();
    }
  }, [orderId, checkOrderStatus]);

  const startOrder = async (id, items) => {
    if (!disableNewOrder) { 
      setOrderId(id);
      localStorage.setItem('orderId', id);
      setIsOrderInProgress(true);
      localStorage.setItem('isOrderInProgress', true);
      setIsOrderFinished(false);
    }
  };

  const handleRateNow = () => {
    setShowRatingModal(false);
    navigate("/delivery-review")
  };

  const handleMaybeLater = () => {
    setShowRatingModal(false); 
    navigate("/")
    localStorage.removeItem('orderId'); 
    window.location.reload();
  };

  return (
    <OrderContext.Provider value={{ 
      isOrderInProgress, 
      isOrderFinished, 
      orderId, 
      orderStatus,  
      startOrder, 
      finishOrder, 
      checkOrderStatus,
    }}>
      {children}
      {showRatingModal && (
  <div className={styles.ratingModal}>
    <div className={styles.ratingModalContent}>
      <button onClick={handleMaybeLater} className={styles.closeRatingModal}>&times;</button>
      <h3>Do you want to rate the delivery person?</h3>
      <div className={styles.ratingButtonGroup}>
        <button onClick={handleRateNow} className={styles.ratingProceedButton}>Yes</button>
        <button onClick={handleMaybeLater} className={styles.ratingCloseButton}>Maybe Next Time</button>
      </div>
    </div>
  </div>
)}

    </OrderContext.Provider>
  );
};