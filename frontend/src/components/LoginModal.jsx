import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const url = isLoginView 
            ? `${import.meta.env.VITE_API_URL}/api/auth/login` 
            : `${import.meta.env.VITE_API_URL}/api/auth/register`;
        const payload = isLoginView ? { email, password } : { name, email, password };

        try {
            const { data } = await axios.post(url, payload);
            await login(data.token);
            onClose();
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6">{isLoginView ? 'Login' : 'Create Account'}</h2>
                {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {!isLoginView && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                            <input className="w-full px-3 py-2 border rounded" type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border rounded" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input className="w-full px-3 py-2 border rounded" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button className="w-full bg-[#2874f0] text-white py-2 rounded hover:bg-blue-700 transition-colors" type="submit">
                        {isLoginView ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">
                    {isLoginView ? "Don't have an account?" : "Already have an account?"}
                    <button className="text-[#2874f0] font-bold ml-2 focus:outline-none" onClick={() => { setIsLoginView(!isLoginView); setError(''); }}>
                        {isLoginView ? 'Sign Up' : 'Login'}
                    </button>
                </p>
                <h1 onClick={onClose}>close</h1>
            </div>
        </div>
    );
};

export default LoginModal;