import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        discount: '',
        category: '',
        imageUrl: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');
        try {
            await axios.post('http://localhost:5001/api/admin/products', formData);
            setMessage('Product added successfully!');
            e.target.reset(); // Clear form
        } catch (error) {
            setMessage(error.response?.data?.msg || 'Failed to add product.');
            console.error(error);
        }
    };

    if (user?.role !== 'shopkeeper') {
        return <div className="container mx-auto py-8 text-center"><p className="text-red-500">Access Denied.</p></div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Shopkeeper Admin Panel</h1>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Add a New Product</h2>
                {message && <p className={`p-2 rounded mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Product Name" onChange={handleChange} className="w-full p-2 border rounded" required />
                    <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
                    <input type="number" name="price" placeholder="Selling Price" onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="number" name="originalPrice" placeholder="Original Price (MRP)" onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" name="discount" placeholder="Discount (e.g., 20% off)" onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full bg-flipkart-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;