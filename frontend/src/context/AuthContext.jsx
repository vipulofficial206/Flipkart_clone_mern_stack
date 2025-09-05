import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            try {
                const res = await axios.get('http://localhost:5001/api/users/me');
                setUser(res.data);
            } catch (error) {
                console.error("Could not load user", error);
                localStorage.removeItem('token');
                setAuthToken(null);
            }
        }
        setLoading(false);
    };
    
    useEffect(() => {
        loadUser();
    }, []);

    const login = async (token) => {
        localStorage.setItem('token', token);
        setAuthToken(token);
        await loadUser();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, loadUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);