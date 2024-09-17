import React, { useState, useEffect } from 'react';
import styles from '../../css/ProfileCss/orderHistory.module.css';

const OrderCard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    fetch('http://localhost:8080/api/orders/finished', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setOrders(data);
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
  }, []);

  return (
    <div>
      {orders.map(order => {
        const addressParts = order.address.split(';');
        const address = addressParts[0] || "Unknown address";
        const number = addressParts[1] || "Unknown number";
        const floor = addressParts[2] || "Unknown floor";

        return (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderDescription}>
              <p>
                <strong>Order id:</strong> {order.id} <br />
                <strong>Address:</strong> {address} <br />
                <strong>Number:</strong> {number} <br />
                <strong>Floor:</strong> {floor} <br />
                <strong>Delivery Person:</strong> {order.deliveryPersonName} {order.deliveryPersonSurname} <br />
                <strong>Rating:</strong> {order.rating || "No rating"} <br />
                <strong>Review:</strong> {order.review || "No review"} <br />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
