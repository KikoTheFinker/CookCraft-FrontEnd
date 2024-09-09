import React, { useState, useContext } from 'react';
import styles from '../../css/ShoppingCartCss/shopping-cart-style.module.css';
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from './CartContext';

const ShoppingCart = ({ ingredients, hideIngredients }) => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext); 
    const [showCart, setShowCart] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const handleCheckboxChange = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
            removeFromCart(ingredient);
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
            addToCart(ingredient);
        }
    };

    const toggleCart = () => {
        setShowCart(!showCart);
        if (!hideIngredients) {
            setShowIngredients(true);
        }
    };

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients);
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
                                    <span>{item.measurement}</span>
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
                    <button className={styles.checkoutButton}>Proceed to Checkout</button>
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
                                            checked={selectedIngredients.includes(ingredient)}
                                            onChange={() => handleCheckboxChange(ingredient)}
                                        />
                                        {ingredient.name} - {ingredient.measurement}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
