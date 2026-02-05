import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Router from './routes/Router.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx'

export default function Index() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}