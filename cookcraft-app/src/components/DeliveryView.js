import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FaArrowLeft } from 'react-icons/fa';
import styles from '../css/DeliveryViewCss/delivery-view.module.css';

Modal.setAppElement('#root');

const DeliveryView = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [ongoingOrder, setOngoingOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productOrders, setProductOrders] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const fetchProductOrdersByOrderId = useCallback(async (orderId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/productOrders/order/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const productOrdersData = await response.json();

        const productOrdersWithNames = await Promise.all(
          productOrdersData.map(async (productOrder) => {
            const productName = await fetchProductName(productOrder.productId);
            return {
              ...productOrder,
              name: productName,
            };
          })
        );

        setProductOrders(productOrdersWithNames);
      } else {
        alert('Failed to fetch product orders for the selected order.');
      }
    } catch (error) {
      console.error('Error fetching product orders:', error);
    }
  }, []);

  const fetchProductName = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const productData = await response.json();
        return productData.name;
      } else {
        return 'Unknown Product';
      }
    } catch (error) {
      console.error('Error fetching product name:', error);
      return 'Unknown Product';
    }
  };

  const fetchUserData = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json(); 
      } else {
        console.error('Failed to fetch user details.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };const fetchDeliveryData = useCallback(async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to be logged in to access this page.');
            navigate('/login');
            return;
        }

        const ongoingOrderData = await fetchOrderData('http://localhost:8080/api/deliveryperson/ongoing', token);
        if (ongoingOrderData) {
            const userData = await fetchUserData(ongoingOrderData.userId); 
            setOngoingOrder({ ...ongoingOrderData, user: userData }); 
            await fetchProductOrdersByOrderId(ongoingOrderData.id);
        } else {
            const activeOrdersData = await fetchOrderData('http://localhost:8080/api/orders/activeOrders', token);
            if (activeOrdersData) {
                setActiveOrders(activeOrdersData);
            }
        }

        const historyData = await fetchOrderData('http://localhost:8080/api/orders/history', token);
        if (historyData) {
            const historyWithDetails = await Promise.all(
                historyData.map(async (order) => {
                    const userData = await fetchUserData(order.userId);
                    const productOrders = await fetchProductOrdersByOrderId(order.id);
                    return { ...order, user: userData, productOrders };
                })
            );
            setOrderHistory(historyWithDetails);
        }
    } catch (err) {
        console.error('Error fetching delivery data:', err);
        setError('Failed to fetch delivery data.');
    } finally {
        setLoading(false);
    }
}, [navigate, fetchProductOrdersByOrderId]);
  
  useEffect(() => {
    fetchDeliveryData();
  }, [fetchProductOrdersByOrderId, fetchDeliveryData]);

  const fetchOrderData = async (url, token) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const text = await response.text();
      if (!text) {
        return null;
      }
      try {
        return JSON.parse(text);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
      }
    } else if (response.status === 204) {
      return null;
    } else {
      throw new Error('Failed to fetch data');
    }
  };
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
        const acceptedOrder = activeOrders.find(order => order.id === orderId);
        const userData = await fetchUserData(acceptedOrder.userId);
        setOngoingOrder({ ...acceptedOrder, user: userData });
  
        setActiveOrders(prevOrders =>
          prevOrders.map(order => (order.id === orderId ? { ...order, accepted: true } : order))
        );
        setSelectedOrder(acceptedOrder);
        await fetchProductOrdersByOrderId(orderId); 
      } else {
        alert('Order has already been accepted by another Delivery Person.');
      }
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };
  

  const finishOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/orders/finish/${ongoingOrder.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setOngoingOrder(null); 
        await fetchDeliveryData(); 
      } else {
        alert('Failed to mark the order as finished.');
      }
    } catch (error) {
      console.error('Error finishing the order:', error);
    }
  };

  const openOrderDetails = async (order) => {
    const userData = await fetchUserData(order.userId); 
    setSelectedOrder({ ...order, user: userData });
    await fetchProductOrdersByOrderId(order.id);
  };
  

  const splitAddress = (address) => {
    const [street = '', number = '', floor = ''] = address.split(';');
    return { street, number, floor };
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Delivery Dashboard</h1>
      <div className={styles.backArrow} onClick={handleBackClick}>
        <FaArrowLeft />
      </div>
      {ongoingOrder && (
  <section className={styles.section}>
    <h2>Ongoing Delivery</h2>
    <div className={styles.card}>
      <h3>Order #{ongoingOrder.id}</h3>
      <p><strong>Street:</strong> {splitAddress(ongoingOrder.address).street}</p>
      <p><strong>Number:</strong> {splitAddress(ongoingOrder.address).number}</p>
      <p><strong>Floor:</strong> {splitAddress(ongoingOrder.address).floor}</p>
      {ongoingOrder.user && (
        <>
          <p><strong>Phone Number:</strong> {ongoingOrder.user.phoneNumber}</p>
          <p><strong>Name:</strong> {ongoingOrder.user.userName} {ongoingOrder.user.userSurname}</p>
        </>
      )}
      <button className={styles.button} onClick={finishOrder}>
        Mark as Finished
      </button>
      <button className={styles.button} onClick={() => openOrderDetails(ongoingOrder)}>
        View Details
      </button>
    </div>
  </section>
)}
      {!ongoingOrder && (
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
                    <p><strong>Street: </strong>{street}</p>
                    <p><strong>Number: </strong>{number}</p>
                    <p><strong>Floor: </strong>{floor}</p>
                    {!order.accepted && (
                      <button className={styles.button} onClick={() => acceptOrder(order.id)}>
                        Accept Order
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}
      <section className={styles.section}>
        <h2>Order History</h2>
        <div className={styles.cardsContainer}>
          {orderHistory.length === 0 ? (
            <p>No order history available.</p>
          ) : (
            orderHistory.map(order => {
              const { street, number, floor } = splitAddress(order.address);
              const { user } = order;  
              return (
                <div key={order.id} className={styles.card}>
                  <h3>Order #{order.id}</h3>
                  <p><strong>Street:</strong> {street}</p>
                  <p><strong>Number:</strong> {number}</p>
                  <p><strong>Floor:</strong> {floor}</p>
                  {user && (
                    <>
                      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                      <p><strong>Name:</strong> {user.userName} {user.userSurname}</p>
                    </>
                  )}
                  <button className={styles.button} onClick={() => openOrderDetails(order)}>
                    View Details
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onRequestClose={closeModal}
          contentLabel="Order Details"
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <h2>Order Details - #{selectedOrder.id}</h2>
          
          {selectedOrder.address && (() => {
            const [street = '', number = '', floor = ''] = selectedOrder.address.split(';');
            return (
              <>
                <p><strong>Street:</strong> {street}</p>
                <p><strong>Number:</strong> {number}</p>
                <p><strong>Floor:</strong> {floor}</p>
              </>
            );
          })()}
          
          <p><strong>Products:</strong></p>
          <ul>
            {productOrders.length > 0 ? (
              productOrders.map(productOrder => (
                <li key={productOrder.id}>
                  {productOrder.name} - {productOrder.quantity} grams
                </li>
              ))
            ) : (
              <li>No products available.</li>
            )}
          </ul>
          <button className={styles.button} onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default DeliveryView;
