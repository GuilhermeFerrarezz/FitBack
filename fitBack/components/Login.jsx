import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [req, res, promptAsync] = Google.useAuthRequest({
        webClientId: process.env.EXPO_PUBLIC_CLIENT_WEB_ID,
    });

    useEffect(() => {
        if (res?.type == 'success') {
            const tokenGoogle = res.authentication.accessToken
            console.log("Token do google: ", tokenGoogle)
        }
    }, [res])

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