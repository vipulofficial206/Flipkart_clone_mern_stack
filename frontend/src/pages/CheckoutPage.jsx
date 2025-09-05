import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { user } = useAuth();
    const { cartItems, clearCart } = useCart();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Pre-select the first address by default if it exists
        if (user?.addresses && user.addresses.length > 0) {
            setSelectedAddress(user.addresses[0]);
        }
    }, [user]);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            setError("Please select a shipping address.");
            return;
        }
        
        const orderData = {
            products: cartItems.map(item => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            shippingAddress: `${selectedAddress.fullName}, ${selectedAddress.streetAddress}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`,
            totalAmount: total,
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, orderData);
            alert('Order placed successfully!');
            clearCart();
            navigate('/profile');
        } catch (err) {
            console.error('Failed to place order:', err);
            setError('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4">Select Shipping Address</h2>
                    {user?.addresses && user.addresses.length > 0 ? (
                        <div className="space-y-4">
                            {user.addresses.map((addr, index) => (
                                <div 
                                    key={index} 
                                    className={`border p-4 rounded-md cursor-pointer transition-all ${selectedAddress === addr ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-300'}`} 
                                    onClick={() => setSelectedAddress(addr)}
                                >
                                    <p className="font-bold">{addr.fullName}</p>
                                    <p>{addr.streetAddress}, {addr.city}</p>
                                    <p>{addr.state} - {addr.pincode}</p>
                                    <p className="font-semibold">Mobile: {addr.mobileNumber}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No addresses found. Please add an address to your profile.</p>
                    )}
                    {/* A form to add a new address could be included here for better UX */}
                </div>
                <div className="lg:col-span-1 bg-white p-6 rounded shadow-md h-fit">
                    <h2 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex justify-between text-sm">
                                <span className="truncate w-4/6">{item.name} (x{item.quantity})</span>
                                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className="font-bold text-lg border-t mt-4 pt-4 flex justify-between">
                        <span>Total Amount</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    <button 
                        onClick={handlePlaceOrder}
                        disabled={cartItems.length === 0 || !selectedAddress}
                        className="w-full bg-orange-500 text-white font-bold py-3 mt-6 rounded shadow-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;