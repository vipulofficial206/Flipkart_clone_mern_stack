import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <>
            <header className="bg-[#2874f0] text-white shadow-md sticky top-0 z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <Link to="/" className="text-2xl font-extrabold italic">Flipkart</Link>
                            <div className="relative hidden sm:block">
                                <input
                                    type="text"
                                    placeholder="Search for products, brands and more"
                                    className="bg-white text-black rounded-sm px-4 py-2 w-96 focus:outline-none"
                                />
                                <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[bg-#2874f0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center space-x-8">
                            {user ? (
                                <div className="group relative">
                                    <Link to="/profile" className="font-semibold">{user.name}</Link>
                                    <div className="absolute hidden group-hover:block bg-white text-black mt-2 py-2 w-48 rounded shadow-lg right-0">
                                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                                        {user.role === 'shopkeeper' && <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">Admin Panel</Link>}
                                        <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={() => setIsModalOpen(true)} className="bg-white text-[#2874f0] font-semibold px-8 py-2 rounded-sm hover:bg-gray-100 transition-colors">
                                    Login
                                </button>
                            )}

                            <Link to="/cart" className="relative flex items-center space-x-2 cursor-pointer">
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#ffc200] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />
                                </svg>
                                <span>Cart</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Navbar;