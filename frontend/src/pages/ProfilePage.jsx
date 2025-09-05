import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('http://localhost:5001/api/orders/myorders');
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 bg-white p-6 rounded shadow-md h-fit">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Account Details</h2>
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Role:</strong> {user?.role}</p>
                </div>
                <div className="md:col-span-2 bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">My Orders</h3>
                    {loading ? <p>Loading orders...</p> : (
                        orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order._id} className="border p-4 rounded-md">
                                        <p><strong>Order ID:</strong> {order._id}</p>
                                        <p><strong>Total:</strong> ₹{order.totalAmount.toLocaleString()}</p>
                                        <p><strong>Status:</strong> {order.orderStatus}</p>
                                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p><strong>Address:</strong> {order.shippingAddress}</p>
                                    </div>
                                ))}
                            </div>
                        ) : <p>You have no orders yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;