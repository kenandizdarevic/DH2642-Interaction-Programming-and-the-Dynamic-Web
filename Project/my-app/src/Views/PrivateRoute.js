import React from 'react';
import {useSelector} from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Views/authenticationView';

export default function PrivateRoute ({children}){
    // const { user } = useAuth()
    // const userP = useSelector((state) => state.user);
    let location = useLocation();
    if(!true){
        return <Navigate to="/" state={{from:location}} replace />
    }
return children
}