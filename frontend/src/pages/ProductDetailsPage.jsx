import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:5001/api/products/${productId}`);
                setProduct(data);
            } catch (err) {
                console.error('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) return <div className="text-center py-20">Loading product details...</div>;
    if (!product) return <div className="text-center py-20">Product not found.</div>;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex justify-center items-center p-4 border rounded">
                        <img src={product.imageUrl} alt={product.name} className="max-h-96 object-contain" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                        <div className="flex items-center mt-2">
                            <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-md">{product.rating} ★</span>
                            <span className="text-gray-600 text-sm ml-3">{product.reviews?.toLocaleString()} Ratings</span>
                        </div>
                        <div className="mt-4 flex items-center space-x-3">
                            <p className="text-3xl font-extrabold">₹{product.price.toLocaleString()}</p>
                            <p className="text-lg text-gray-500 line-through">₹{product.originalPrice?.toLocaleString()}</p>
                            <p className="text-lg font-bold text-green-600">{product.discount}</p>
                        </div>
                        <p className="mt-4 text-gray-700">{product.description}</p>
                        <div className="mt-8 flex space-x-4">
                            <button onClick={() => addToCart(product)} className="flex-1 bg-flipkart-yellow text-white font-bold py-3 px-6 rounded-sm shadow-md hover:bg-yellow-500 transition-colors">
                                ADD TO CART
                            </button>
                            <button className="flex-1 bg-orange-500 text-white font-bold py-3 px-6 rounded-sm shadow-md hover:bg-orange-600 transition-colors">
                                BUY NOW
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;