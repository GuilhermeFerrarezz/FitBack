import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { setNativeProps } from 'react-native-reanimated';
WebBrowser.maybeCompleteAuthSession();
const backendUrl = 'http://localhost:5000'
export default function Login() {
    const [userData, setUserData] = useState(null);
    const [req, res, promptAsync] = Google.useAuthRequest({
        webClientId: process.env.EXPO_PUBLIC_CLIENT_WEB_ID,
    });

    useEffect(() => {
        if (res?.type == 'success') {
            const tokenGoogle = res.authentication.accessToken
            console.log("Token do google: ", tokenGoogle)
            sendTokenToBackend(tokenGoogle)
        }
    }, [res])

    const sendTokenToBackend = async (tokenGoogle) => {
        try {
            const response= await fetch(`${backendUrl}/fitback/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: tokenGoogle }) 
            });
            const data = await response.json()
            if (response.ok) {
                console.log('Login succesfull')
                setUserData(data)
                console.log(data)
            } else {
                console.log('Login failed ', dados.error);
            }

        } catch (error) {
            console.log("Connection erro")
        }
    
    }



    return (
        <View>
            <Button
            disabled={!req}
            title="Login com Google"
            onPress={() => {
            promptAsync();
          }}
        />
    </View>
        







    )



















    



}

const styles = StyleSheet