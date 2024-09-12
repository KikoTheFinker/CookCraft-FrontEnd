import React, { useState, useEffect, useContext } from 'react';
import { FaArrowLeft, FaUtensils } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { OrderContext } from '../ShoppingCartComponents/OrderContext'; 
import styles from '../../css/ShoppingCartCss/delivery-details-style.module.css';

const DeliveryDetails = () => {
  const { isOrderInProgress, orderStatus, orderId, startOrder, checkOrderStatus } = useContext(OrderContext); 
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressFloor, setAddressFloor] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { itemsWithQuantities } = location.state || { itemsWithQuantities: [] };

  useEffect(() => {
    const storedFullAddress = localStorage.getItem('address'); 
    const storedPhoneNumber = localStorage.getItem('phoneNumber');

    if (storedFullAddress) {
      const [addr, number, floor] = storedFullAddress.split(';');
      setAddress(addr.trim());
      setAddressNumber(number.trim());
      setAddressFloor(floor.trim());
    }
    
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber.trim());
    }
  }, []);

  useEffect(() => {
    if (isOrderInProgress && orderId) {
      setInputsDisabled(true);
    }
  }, [isOrderInProgress, orderId]);

  useEffect(() => {
    if (orderId) {
      const intervalId = setInterval(() => {
        checkOrderStatus(orderId); 
      }, 5000); 

      return () => clearInterval(intervalId);
    }
  }, [orderId, checkOrderStatus]);

  const handleSubmit = () => {
    if (orderId || isOrderInProgress) {
      return;
    }

    setIsLoading(true);
    setShowModal(true);

    const fullAddress = `${address}; ${addressNumber}; ${addressFloor}`;
    const order = {
      address: fullAddress,
      isFinished: false,
    };

    localStorage.setItem('address', fullAddress);
    localStorage.setItem('phoneNumber', phoneNumber);

    saveOrderAndProducts(order, itemsWithQuantities);
  };

  const saveOrderAndProducts = (order, items) => {
    fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(order)
    })
      .then(response => response.json())
      .then(savedOrder => {
        if (!savedOrder || !savedOrder.id) {
          throw new Error("Order was not saved correctly.");
        }
  
        startOrder(savedOrder.id); 
  
        const productOrders = items.map(item => ({
          orderId: savedOrder.id,
          productId: item.id,
          quantity: item.grams,
          deliveryPersonId: null,
        }));
  
        return fetch("http://localhost:8080/api/productOrders", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(productOrders)
        }).then(() => savedOrder.id); 
      })
      .then(orderId => {
        setIsLoading(false); 
        checkOrderStatus(orderId); 
      })
      .catch(error => {
        console.error("Error saving order or product orders:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutCard}>
        <h2>Delivery Details</h2>
        <div className={styles.backArrow} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </div>

        <div className={styles.inputField}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            disabled={inputsDisabled}
            required
          />
        </div>

        <div className={styles.inputField}>
          <label htmlFor="addressNumber">Address Number:</label>
          <input
            type="text"
            id="addressNumber"
            value={addressNumber}
            onChange={(e) => setAddressNumber(e.target.value)}
            placeholder="Enter address number"
            disabled={inputsDisabled}
            required
          />
        </div>

        <div className={styles.inputField}>
          <label htmlFor="addressFloor">Address Floor:</label>
          <input
            type="text"
            id="addressFloor"
            value={addressFloor}
            onChange={(e) => setAddressFloor(e.target.value)}
            placeholder="Enter floor (optional)"
            disabled={inputsDisabled}
          />
        </div>

        <div className={styles.inputField}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            disabled={inputsDisabled}
            required
          />
        </div>

        <h3>Ingredients and Quantities</h3>
        <ul className={styles.ingredientsList}>
          {itemsWithQuantities.map((item, index) => (
            <li key={index} className={styles.ingredientItem}>
              <FaUtensils className={styles.cartItemIcon} />
              <div className={styles.itemDetails}>
                <p className={styles.ingredientItemTitle}>{item.name}</p>
                <p>{item.grams} grams (In Recipe: {item.measurement})</p>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubmit}
          className={styles.proceedButton}
          disabled={isLoading || isOrderInProgress}
        >
          {isLoading ? "Processing..." : "Confirm Delivery"}
        </button>

        {orderStatus && (
          <p className={styles.orderStatusMessage}>
            {orderStatus}
          </p>
        )}

        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <button 
                className={styles.closeButton} 
                onClick={() => setShowModal(false)} 
              >
                &times;
              </button>
              <h3>Waiting for Delivery</h3>
              <p>Your order is being processed. Please wait for a delivery person to accept the order.</p>
              <div className={styles.spinner}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDetails;
