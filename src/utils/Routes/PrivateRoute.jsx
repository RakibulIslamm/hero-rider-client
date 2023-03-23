import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return (
        !user.email ? <Navigate to={'/login'} /> : children
    );
};

export default PrivateRoute;