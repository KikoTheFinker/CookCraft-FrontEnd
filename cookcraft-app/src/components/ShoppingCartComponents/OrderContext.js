import React, { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [isOrderInProgress, setIsOrderInProgress] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const savedOrderId = localStorage.getItem('orderId');
    if (savedOrderId) {
      setOrderId(savedOrderId);
      setIsOrderInProgress(true);
    }
  }, []);

  const startOrder = (id) => {
    setOrderId(id);
    setIsOrderInProgress(true);
    localStorage.setItem('orderId', id);
  };

  const finishOrder = () => {
    setOrderId(null);
    setIsOrderInProgress(false);
    localStorage.removeItem('orderId');
  };

  return (
    <OrderContext.Provider value={{ isOrderInProgress, orderId, startOrder, finishOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
