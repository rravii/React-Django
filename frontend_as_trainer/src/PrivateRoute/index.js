import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ( {children} ) => { // children are the props that are passed in 

    return localStorage.getItem('token') ? children : <Navigate to="/login"/>; // checking if in localstorage token is present then pass children else navigate to login page
};

export default PrivateRoute
