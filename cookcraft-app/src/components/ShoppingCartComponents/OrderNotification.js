import React, { useContext } from 'react';
import { OrderContext } from './OrderContext';
import { useNavigate } from 'react-router-dom';
import '../../css/ShoppingCartCss/order-notification.module.css';

const OrderNotification = () => {
  const { isOrderInProgress } = useContext(OrderContext);
  const navigate = useNavigate();

  if (!isOrderInProgress) return null;

  return (
    <div className="order-notification">
      <p>An order is in progress!</p>
      <button onClick={() => navigate(`/delivery-details`, { state: { itemsWithQuantities } } )}>
        View Order
      </button>
    </div>
  );
};

export default OrderNotification;
