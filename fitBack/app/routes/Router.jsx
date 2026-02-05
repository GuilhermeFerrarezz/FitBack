import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Login from '../screens/Login.jsx';
import Home from '../screens/Home.jsx';  
export default function Router() {
    const { signed, loading } = useContext(AuthContext);
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return signed ? <Home /> : <Login />;
}