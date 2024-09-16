import React, { createContext, useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [isOrderInProgress, setIsOrderInProgress] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isOrderFinished, setIsOrderFinished] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const { setCart } = useContext(CartContext); 

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
          setIsOrderInProgress(true);
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

    fetchActiveOrder();
  }, []);

  const startOrder = async (id) => {
    setOrderId(id);
    setIsOrderInProgress(true);
    setIsOrderFinished(false); 
  };

  const checkOrderStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/status/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      const orderStatusMessage = await response.text();
  
      if (orderStatusMessage.toLowerCase().includes('review')) {
        finishOrder(); 
      }
  
      setOrderStatus(orderStatusMessage); 
  
    } catch (error) {
      console.error('Error checking order status:', error);
      setOrderStatus('Error checking order status.');
    }
  };
  
  const finishOrder = () => {
    setOrderId(null);
    setIsOrderInProgress(false);
    setIsOrderFinished(true);
    setCart([]); 
    setOrderStatus('Order completed!'); 
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
    </OrderContext.Provider>
  );
};
