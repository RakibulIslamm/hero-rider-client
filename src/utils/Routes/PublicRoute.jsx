import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    return (
        user?.email ? <Navigate to={'/profile'} /> : children
    );
};

export default PublicRoute;