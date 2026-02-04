import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as GoogleAuthSession from 'expo-auth-session/providers/google';
import {GoogleSignin, GoogleSigninButton, statusCodes} from "@react-native-google-signin/google-signin"
WebBrowser.maybeCompleteAuthSession();
const backendUrl = 'http://10.0.2.2:5000'
export default function Login() {
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
            webClientId: webClientId ,
            offlineAccess: true,
            androidClientId: androidClientId,
            scopes: ['profile', 'email'],
        })
    };
    console.log('Web: ', webClientId)

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
    
    const signIn = async () => {
        console.log('Pressionou Login')
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn()
            const { accessToken, idToken } = await GoogleSignin.getTokens();
            console.log("Access Token:", accessToken);
            //console.log("ID Token:", idToken);
            await sendTokenToBackend(accessToken);

            
        } catch (e) {
            setError(e)
            
        }
    }



    const sendTokenToBackend = async (tokenGoogle) => {
        try {
            console.log('enviou')
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
            <Text>Fazer login com google</Text>

            {Platform.OS === 'android' ? (
                <GoogleSigninButton size={GoogleSigninButton.Size.Standart} color={GoogleSigninButton.Color.Dark} onPress={signIn}> </GoogleSigninButton>
            ) : (
                <Button
                    disabled={!req}
                    title="Login com Google"
                    onPress={() => {
                        promptAsync();
                    }}
                />)}
            </View>


        )

}

const styles = StyleSheet