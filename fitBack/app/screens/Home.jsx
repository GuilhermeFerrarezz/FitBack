import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../contexts/AuthContext.jsx';
import api from '../../services/api.js'
export default function Home() {
    const { user, signOut } = useContext(AuthContext);
    const [fichas, setFichas ] = useState(null)
    
    const loadFichas = async () => {
        try {
            const response = await api.get('/fitback/fichas/')
            setFichas(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
        
    }



    useEffect(() => {
        loadFichas()
        

        

    }, [])




    return (
        <View style={styles.container}>
            <View style = {styles.ProfileContainer}>
                {user?.user?.avatar ?
                    (<Image source={user?.user?.avatar} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}></Image>) : (<></>)}
                  <Text style={styles.title}>Olá {user?.user?.name}</Text>
            </View>
            <Text style={{ fontSize: 20 }}>E-mail: {user?.user?.email}</Text>

            {!fichas || fichas.length === 0 ?
                (<Text>Você ainda não possui fichas</Text>) :


                (fichas.map((ficha, index) => (

                <Text key={index}>{ficha.name}</Text>)            
            
            ))
            
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
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
    ProfileContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'left',
        margin: 10
    }
});
