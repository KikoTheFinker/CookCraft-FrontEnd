import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon
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

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to be logged in to access this page.');
          navigate('/login');
          return;
        }

        // First check if there's an ongoing order
        const ongoingOrderData = await fetchOrderData('http://localhost:8080/api/deliveryperson/ongoing', token);
        if (ongoingOrderData) {
          setOngoingOrder(ongoingOrderData);
          await fetchProductOrdersByOrderId(ongoingOrderData.id);
        }

        // If no ongoing order, fetch active orders
        if (!ongoingOrderData) {
          const activeOrdersData = await fetchOrderData('http://localhost:8080/api/orders/activeOrders', token);
          if (activeOrdersData) {
            setActiveOrders(activeOrdersData);
          }
        }

        // Fetch order history regardless of ongoing order
        const historyData = await fetchOrderData('http://localhost:8080/api/orders/history', token);
        if (historyData) {
          setOrderHistory(historyData);
        }
      } catch (err) {
        console.error('Error fetching delivery data:', err);
        setError('Failed to fetch delivery data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryData();
  }, [navigate, fetchProductOrdersByOrderId]);

  const fetchOrderData = async (url, token) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return await response.json();
    } else if (response.status === 204) { // No ongoing order
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
        alert('Order accepted!');
        const acceptedOrder = activeOrders.find(order => order.id === orderId);
        setOngoingOrder(acceptedOrder);
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

  const finishOrder = () => {
    setOngoingOrder(null);
    alert('Order has been marked as finished.');
  };

  const openOrderDetails = () => {
    setSelectedOrder(ongoingOrder); // Reopen modal for ongoing order details
  };

  const splitAddress = (address) => {
    const [street = '', number = '', floor = ''] = address.split(';');
    return { street, number, floor };
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setProductOrders([]);
  };

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
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

      {/* Back Button */}
      <div className={styles.backArrow} onClick={handleBackClick}>
        <FaArrowLeft />
      </div>

      {/* Ongoing Order Section */}
      {ongoingOrder && (
        <section className={styles.section}>
          <h2>Ongoing Delivery</h2>
          <div className={styles.card}>
            <h3>Order #{ongoingOrder.id}</h3>
            <p>Street: {splitAddress(ongoingOrder.address).street}</p>
            <p>Number: {splitAddress(ongoingOrder.address).number}</p>
            <p>Floor: {splitAddress(ongoingOrder.address).floor}</p>
            <button className={styles.button} onClick={finishOrder}>
              Mark as Finished
            </button>
            {/* Button to open order details modal again */}
            <button className={styles.button} onClick={openOrderDetails}>
              View Details
            </button>
          </div>
        </section>
      )}

      {/* Active Orders Section */}
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
                    <p>Street: {street}</p>
                    <p>Number: {number}</p>
                    <p>Floor: {floor}</p>
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

      {/* Order History Section */}
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
                    {order.productOrders && order.productOrders.length > 0 ? (
                      order.productOrders.map(productOrder => (
                        <li key={productOrder.id}>
                          {productOrder.name} - {productOrder.quantity} grams
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onRequestClose={closeModal}
          contentLabel="Order Details"
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <h2>Order Details - #{selectedOrder.id}</h2>
          <p><strong>Street:</strong> {selectedOrder.address}</p>
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
