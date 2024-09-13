import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/DeliveryViewCss/delivery-view.module.css';

const DeliveryView = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to be logged in to access this page.');
          navigate('/login');
          return;
        }

        const activeOrdersResponse = await fetch('http://localhost:8080/api/orders/activeOrders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (activeOrdersResponse.ok) {
          const activeOrdersData = await activeOrdersResponse.json();
          setActiveOrders(activeOrdersData);
        } else {
          alert('Failed to fetch active orders');
        }

        const historyResponse = await fetch('http://localhost:8080/api/orders/history', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setOrderHistory(historyData);
        } else {
          alert('Failed to fetch order history');
        }
      } catch (error) {
        console.error('Error fetching delivery data:', error);
        alert('An error occurred while fetching delivery data.');
      }
    };

    fetchDeliveryData();
  }, [navigate]);

  const acceptOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/orders/accept/${orderId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Order accepted!');
        setActiveOrders((prevOrders) =>
          prevOrders.map((order) => (order.id === orderId ? { ...order, accepted: true } : order))
        );
      } else {
        alert('Failed to accept the order.');
      }
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const splitAddress = (address) => {
    const [street = '', number = '', floor = ''] = address.split(';');
    return { street, number, floor };
  };

  return (
    <div className={styles.container}>
      <h1>Delivery Dashboard</h1>

      <section className={styles.section}>
        <h2>Active Orders</h2>
        <div className={styles.cardsContainer}>
          {activeOrders.length === 0 ? (
            <p>No active orders at the moment.</p>
          ) : (
            activeOrders.map(order => {
              const { street, number, floor } = splitAddress(order.address);
              return (
                <div key={order.id} className={styles.card}>
                  <h3>Order #{order.id}</h3>
                  <p>Street: {street}</p>
                  <p>Number: {number}</p>
                  <p>Floor: {floor}</p>
                  <p>Products:</p>
                  <ul>
                    {order.products && order.products.length > 0 ? (
                      order.products.map(product => (
                        <li key={product.id}>
                          {product.name} - {product.quantity} grams
                        </li>
                      ))
                    ) : (
                      <p>No products available.</p>
                    )}
                  </ul>
                  <button className={styles.button} onClick={() => acceptOrder(order.id)}>
                    Accept Order
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Order History</h2>
        <div className={styles.cardsContainer}>
          {orderHistory.length === 0 ? (
            <p>No order history available.</p>
          ) : (
            orderHistory.map(order => {
              const { street, number, floor } = splitAddress(order.address);
              return (
                <div key={order.id} className={styles.card}>
                  <h3>Order #{order.id}</h3>
                  <p>Street: {street}</p>
                  <p>Number: {number}</p>
                  <p>Floor: {floor}</p>
                  <p>Products:</p>
                  <ul>
                    {order.products && order.products.length > 0 ? (
                      order.products.map(product => (
                        <li key={product.id}>
                          {product.name} - {product.quantity} grams
                        </li>
                      ))
                    ) : (
                      <p>No products available.</p>
                    )}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default DeliveryView;
