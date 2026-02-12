import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({});
import {GoogleSignin} from "@react-native-google-signin/google-signin"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('user')
            if (storageUser) {
                setUser(JSON.parse(storageUser))
            }
            setLoading(false)
        }
        loadStorageData()



    }, [])

    const signIn = async (userData) => {
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData))
    }
    const signOut = async () => {

        try {
            GoogleSignin.revokeAccess();
            await GoogleSignin.signOut()
        } catch (error) {
            
        } finally {
            await AsyncStorage.removeItem('user')
            await AsyncStorage.removeItem('idFicha')
            setUser(null);
        }
            
        
    }
    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>


    )


}
