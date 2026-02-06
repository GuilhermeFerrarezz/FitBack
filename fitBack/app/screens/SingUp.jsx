import React, { useEffect, useState, useContext } from 'react';
import { View, Button, Text, StyleSheet, Platform } from 'react-native';
import SignUpForm from '../../components/FormSignUp.jsx';
import api from '../../services/api.js'
import { router } from 'expo-router'
export default function SignUp() {

    useEffect(() => {
        
    }, []);


    
    const handleEmailSignUp = async (credentials) => {
        console.log('Login Email')
        console.log(credentials) 
        try {
            if (credentials) {
                const { email, password, nome } = credentials
                const response = await api.post('/fitback/auth/register', {
                    name: nome,
                    email,
                    password
                });
                if (response.status === 200 || response.status === 201) {
                    console.log('Sign in successful')
                    console.log(response.data)
                    router.navigate({ pathname: '../screens/Login' })
                }
        }

        } catch (error) {
            if (error.response) {
                const backendMessage = error.response.data.message
                if (error.response.status === 400) {
                console.log('Credenciais incorretas (Erro 400)');
                return backendMessage
            } else {
                console.log('Erro do servidor:', error.response.status);
            }
            }
            console.log("Connection erro", error)
            return 'Erro ao conectar com banco de dados. Tente novamente'
            
        
    }
        

        
    } 

     const sendTokenToBackend = async (tokenGoogle) => {
        try {
            console.log('enviou')
            const response = await api.post('/fitback/auth/google', { 
            token: tokenGoogle 
        });
            if (response.status === 200 || response.status === 201) {
            console.log('Login successful');
            console.log(response.data); 
            await signIn(response.data);
        }

        } catch (error) {
            console.log("Connection erro", error)
        }
    
    }



    return (
        <View style={styles.container}>
            <SignUpForm onSignUpPress={(credentials) => handleEmailSignUp(credentials)} ></SignUpForm>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1

    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'Arial',
        marginTop: 30,
        marginBottom: 30
    }
});