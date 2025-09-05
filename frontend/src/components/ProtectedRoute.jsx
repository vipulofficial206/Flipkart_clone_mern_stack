import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-center py-20">Authenticating...</div>;
    }

    if (!user) {
        // User not logged in, redirect to home
        return <Navigate to="/" />;
    }

    if (adminOnly && user.role !== 'shopkeeper') {
        // User is not an admin, redirect to home
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;