import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as GoogleAuthSession from 'expo-auth-session/providers/google';
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { AuthContext } from '../contexts/AuthContext.jsx';
import LoginForm from '../../components/FormLogin.jsx';
import api from '../../services/api.js'
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const { signIn } = useContext(AuthContext);
    console.log("Contexto no Login:", signIn)
    const [error, setError] = useState()
    const [userData, setUserData] = useState();
    const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID
    const androidClientId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID
    const [req, res, promptAsync] = GoogleAuthSession.useAuthRequest({
        webClientId: webClientId,
        androidClientId: androidClientId

    });


    const configureGoogleSignin = () => {
        GoogleSignin.configure({
            webClientId: webClientId,
            offlineAccess: true,
            scopes: ['profile', 'email'],
        })
    };
    useEffect(() => {
        if (Platform.OS === 'android') {
            configureGoogleSignin()
                ;
        }
    }, []);

    useEffect(() => {
        if (res?.type === 'success') {
            const { authentication } = res;
            sendTokenToBackend(authentication.idToken || authentication.accessToken);
        }
    }, [res]);

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            GoogleSignin.signIn()
            const { accessToken, idToken } = await GoogleSignin.getTokens();
            const message = await sendTokenToBackend(accessToken);
            console.log('Mensagem de erro ', message)
            return message

        } catch (error) {
            setError(error)

        }
    }
    const handleEmailLogin = async (credentials) => {
        try {
            if (credentials) {
                const { email, password } = credentials
                const response = await api.post('/fitback/auth/login', {
                    email,
                    password
                });
                if (response.status === 200 || response.status === 201) {
                    console.log('Login successful')
                    console.log(response.data)
                    await signIn(response.data);
                }
            }

        } catch (error) {
            if (error.response) {
                const backendMessage = error.response.data.message
                if (error.response.status === 401) {
                    return backendMessage
                } else {
                    console.log('Erro do servidor:', error.response.status);
                }
            }
            console.log("Connection erro", error)

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
                setError('')
                await signIn(response.data);
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    setError('Email já cadastrado')
                    return 'Email já cadastrado'
                }

            }
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>FITBACK</Text>
            {Platform.OS === 'android' ? (
                <LoginForm
                    onGooglePress={handleGoogleLogin}
                    onSignInPress={(credentials) => handleEmailLogin(credentials)}
                />
            ) : (
                <LoginForm mes={error}

                    onGooglePress={() => promptAsync()}
                    onSignInPress={(credentials) => handleEmailLogin(credentials)}
                />
            )}
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