import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaUtensils } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../css/ShoppingCartCss/delivery-details-style.module.css';

const DeliveryDetails = () => {
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressFloor, setAddressFloor] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [orderId, setOrderId] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [hasActiveOrder, setHasActiveOrder] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const { itemsWithQuantities } = location.state || { itemsWithQuantities: [] };

  useEffect(() => {
    const savedOrderId = localStorage.getItem('orderId');
    if (savedOrderId) {
      setOrderId(savedOrderId); 
      setInputsDisabled(true); 
      checkDeliveryPersonAssigned(savedOrderId); 
    }

    checkActiveOrder();

    const storedAddress = localStorage.getItem('address');
    if (storedAddress) {
      const [addr, number, floor] = storedAddress.split(';');
      setAddress(addr.trim());
      setAddressNumber(number.trim());
      setAddressFloor(floor.trim());
    }

    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber.trim());
    }
  }, []);

  const checkActiveOrder = () => {
    fetch("http://localhost:8080/api/orders/active", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(hasOrder => {
      if (hasOrder) {
        setHasActiveOrder(true); 
        setInputsDisabled(true);
      }
    })
    .catch(error => {
      console.error("Error checking active order:", error);
    });
  };

  const handleSubmit = () => {
    if (orderId || hasActiveOrder) {
      return;
    }
    if (address && addressNumber && phoneNumber) {
      setIsLoading(true);
      setShowModal(true);
      const fullAddress = `${address}; ${addressNumber}; ${addressFloor}`;
      localStorage.setItem('address', fullAddress);
      localStorage.setItem('phoneNumber', phoneNumber);

      const order = {
        address: fullAddress,
        isFinished: false
      };

      saveOrderAndProducts(order, itemsWithQuantities);
      setInputsDisabled(true);
    }
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
        setOrderId(savedOrder.id);
        if (!savedOrder || !savedOrder.id) {
          throw new Error("Order was not saved correctly.");
        }
        localStorage.setItem('orderId', savedOrder.id); 
        const productOrders = items.map(item => ({
          orderId: savedOrder.id,
          productId: item.id,
          quantity: item.grams,
          deliveryPersonId: null
        }));

        return fetch("http://localhost:8080/api/productOrders", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(productOrders)
        });
      })
      .then(() => {
        console.log(orderId)
        checkDeliveryPersonAssigned(orderId); 
      })
      .catch(error => {
        console.error("Error saving order or product orders:", error);
      });
  };

  const checkDeliveryPersonAssigned = (orderId) => {
    const intervalId = setInterval(() => {
      fetch(`http://localhost:8080/api/orders/status/${localStorage.getItem('orderId')}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.text()) 
        .then(message => {
          if (message.includes("The delivery person")) {
            setOrderStatus(message);
            setShowModal(false); 
            clearInterval(intervalId);
          } else {
            setOrderStatus(message); 
          }
        })
        .catch(error => {
          console.error("Error checking delivery person status:", error);
        });
    }, 3000);
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutCard}>
        <h2>Delivery Details</h2>
        <div className={styles.backArrow} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </div>

        {hasActiveOrder && (
          <div className={styles.notification}>
            <p>An order is in progress.</p>
            <button onClick={() => navigate(`/delivery-details`, { state: { itemsWithQuantities } })}>
              Go to Order
            </button>
          </div>
        )}

        <div className={styles.inputField}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            disabled={inputsDisabled}
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
          disabled={isLoading || !!orderId}
        >
          {isLoading ? "Processing..." : "Confirm Delivery"}
        </button>

        {orderStatus && <p>{orderStatus}</p>}

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
