import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Login from '../screens/Login.jsx';
import Home from '../screens/Home.jsx';  
export default function Router() {
    const { signed, loading } = useContext(AuthContext);
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Carregando</Text>
            </View>
        );
    }
    return signed ? <Home /> : <Login />;
}