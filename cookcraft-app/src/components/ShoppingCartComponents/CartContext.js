import React, { createContext, useState } from 'react';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);


    const addToCart = (ingredient) => {
        setCart(prevCart => [...prevCart, ingredient]);
    };

    const removeFromCart = (ingredient) => {
        setCart(prevCart => prevCart.filter(item => item !== ingredient));
    };

    const value = {
        cart,
        addToCart,
        removeFromCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
