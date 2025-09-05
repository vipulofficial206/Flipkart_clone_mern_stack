import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col">
                <div className="h-48 flex justify-center items-center p-4">
                    <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain" loading="lazy"/>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-700 truncate">{product.name}</h3>
                    <div className="flex items-center mt-2">
                        <span className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-md">{product.rating} ★</span>
                        <span className="text-gray-500 text-xs ml-2">({product.reviews?.toLocaleString() || 0})</span>
                    </div>
                    <div className="mt-auto pt-3 flex items-center space-x-2">
                        <p className="text-lg font-bold">₹{product.price.toLocaleString()}</p>
                        {product.originalPrice && <p className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</p>}
                        {product.discount && <p className="text-sm font-bold text-green-600">{product.discount}</p>}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(ProductCard);