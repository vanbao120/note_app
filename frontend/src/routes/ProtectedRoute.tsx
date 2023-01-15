import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
    console.log({ accessToken: localStorage.getItem('accessToken') });
    if (!localStorage.getItem('accessToken')) {
        <Navigate to='/login' />

    }

    return <Outlet />;
}