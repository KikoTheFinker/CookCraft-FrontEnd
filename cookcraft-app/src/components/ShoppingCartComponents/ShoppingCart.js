import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/ShoppingCartCss/shopping-cart-style.module.css';
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from './CartContext';
import ErrorModal from './ErrorModal';

const ShoppingCart = ({ ingredients, hideIngredients }) => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext); 
    const [showCart, setShowCart] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const toggleCart = () => {
        setShowCart(!showCart);
        if (!hideIngredients) {
            setShowIngredients(true);
        }
    };

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients);
    };

    const handleCheckboxChange = (ingredient) => {
        const isInCart = cart.some(item => item.id === ingredient.id);
        if (isInCart) {
            removeFromCart(ingredient);
        } else {
            addToCart(ingredient);
        }
    };

    const handleProceedToCheckout = () => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            setShowModal(true);  
        } else {
            navigate("/checkout");
        }
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const isIngredientInCart = (ingredient) => {
        return cart.some(item => item.id === ingredient.id);
    };

    return (
        <div className={styles.shoppingCart}>
            <div className={styles.cartIcon} onClick={toggleCart}>
                <FaShoppingCart />
                {cart.length > 0 && <span className={styles.cartCount}>{cart.length}</span>}
            </div>

            {showCart && (
                <div className={styles.cartPopup}>
                    <h4>Shopping Cart</h4>
                    {cart.length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        <div className={styles.cartItems}>
                            {cart.map((item, index) => (
                                <div className={styles.cartItemCard} key={index}>
                                    <p>{item.name}</p>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() => removeFromCart(item)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <button 
                        className={styles.checkoutButton} 
                        onClick={handleProceedToCheckout}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}

            {!hideIngredients && ( 
                <div>
                    <h3 className={styles.toggleTitle} onClick={toggleIngredients}>
                        {showIngredients ? 'Get Them Delivered' : 'Missing Ingredients?'}
                    </h3>

                    <div className={`${styles.ingredientList} ${showIngredients ? styles.show : styles.hide}`}>
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={isIngredientInCart(ingredient)}
                                            onChange={() => handleCheckboxChange(ingredient)}
                                        />
                                        {ingredient.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {showModal && (
                <ErrorModal 
                    message="You must log in to proceed to checkout." 
                    onClose={closeModal} 
                    onLogin={handleLoginRedirect} 
                />
            )}
        </div>
    );
};

export default ShoppingCart;
