import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { router } from 'expo-router'
export default function Menu() {
    const { user, signOut } = useContext(AuthContext);
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Menu</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    signOut()
                    router.navigate({ pathname: '../' })
                    
                  }}>
                <Text style={styles.buttonText}>Sair da Conta</Text>
            </TouchableOpacity>
            </View>
        );
}
    
const styles = StyleSheet.create({
    
    button: {
        marginTop: 30,
        padding: 15,
        backgroundColor: '#ff4444',
        borderRadius: 8
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
});
