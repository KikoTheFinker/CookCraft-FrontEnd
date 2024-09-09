import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryView = () => {
  const [message, setMessage] = useState('');
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

        const response = await fetch('http://localhost:8080/api/deliver', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 403) {
          navigate("/");
        } else if (response.status === 401) {
          alert("Your session has expired. Please log in again.");
          navigate('/login');
        } else if (response.ok) {
          const data = await response.text();
          setMessage(data); 
        } else {
          alert('Failed to fetch delivery data');
        }
      } catch (error) {
        console.error('Error fetching delivery data:', error);
        alert('An error occurred while fetching delivery data.');
      }
    };

    fetchDeliveryData();
  }, [navigate]);

  return (
    <div>
      <h1>Delivery Dashboard</h1>
      <p>{message}</p>  
    </div>
  );
};

export default DeliveryView;
