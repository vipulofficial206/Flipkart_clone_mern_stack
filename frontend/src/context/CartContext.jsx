import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item._id === product._id);
            if (exist) {
                return prevItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item._id === productId);
            if (exist.quantity === 1) {
                return prevItems.filter(item => item._id !== productId);
            }
            return prevItems.map(item =>
                item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };
    
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    const value = { cartItems, addToCart, removeFromCart, clearCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};