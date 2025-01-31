import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import centralStore from './context/Store';

const PublicRoute = ({ element, isPublic }) => {
    const { userState } = useContext(centralStore);

    if(isPublic)
    {
        return userState ? <Navigate to='/' /> : element
    }
    else
    {
        return userState ? element : <Navigate to='/login' />
    }
};

export default PublicRoute;
