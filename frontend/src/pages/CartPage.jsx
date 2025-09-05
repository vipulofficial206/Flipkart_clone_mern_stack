import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        if (user) {
            navigate('/checkout');
        } else {
            alert('Please log in to place an order.');
            // Here you could also trigger the login modal
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center bg-white p-10 rounded shadow-md">
                    <p className="text-xl">Your cart is empty.</p>
                    <Link to="/" className="mt-4 inline-block bg-[#2874f0] text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex items-center bg-white p-4 rounded shadow-md">
                                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-contain mr-4" />
                                <div className="flex-grow">
                                    <h2 className="font-bold text-lg">{item.name}</h2>
                                    <p className="text-lg font-semibold mt-1">₹{item.price.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={() => removeFromCart(item._id)} className="h-8 w-8 bg-gray-200 text-gray-700 rounded-full font-bold">-</button>
                                    <span className="px-4 font-semibold">{item.quantity}</span>
                                    <button onClick={() => addToCart(item)} className="h-8 w-8 bg-gray-200 text-gray-700 rounded-full font-bold">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1 bg-white p-6 rounded shadow-md h-fit">
                        <h2 className="text-xl font-bold border-b pb-4">Price Details</h2>
                        <div className="flex justify-between mt-4">
                            <span>Price ({cartItems.length} items)</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Delivery Charges</span>
                            <span className="text-green-600">FREE</span>
                        </div>
                        <div className="font-bold text-lg border-t mt-4 pt-4 flex justify-between">
                            <span>Total Amount</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <button onClick={handlePlaceOrder} className="w-full bg-orange-500 text-white font-bold py-3 mt-6 rounded shadow-md hover:bg-orange-600">
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;