import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Modal, TextInput, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AuthContext } from '../contexts/AuthContext.jsx';
import api from '../../services/api.js'
import Ficha from '../../components/TreinoFicha.jsx'
export default function Home() {
    const { user, signOut } = useContext(AuthContext);
    const [fichas, setFichas] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [newFichaName, setNewFichaName] = useState('');
    const loadFichas = async () => {
        try {
            const response = await api.get('/fitback/fichas/')
            const dadosOrdenados = response.data.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
            setFichas(dadosOrdenados)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }

    }
    const createFicha = async () => {
        



    }



    useEffect(() => {
        loadFichas()




    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.cabecalhoContainer}>
                <View style={{flexDirection:'row'}}>
                <View style={styles.ProfileContainer}>
                    
                    {!user?.user?.avatar ?
                        (<FontAwesome5 style={styles.profile} name="user" size={24} color="black" />) :
                        (<Image source={user?.user?.avatar} style={{ width: 40, height: 40, borderRadius: 20}}></Image>)}
                </View>
                    <Text style={styles.title}>{user?.user?.name}</Text>
                    </View>
                    <Text style={styles.email }>{user?.user?.email}</Text>

                
            </View>

            <View style={{flexDirection:'row', marginTop: 100, marginLeft: 20}}>
            <Text style={{ fontSize: 25, fontFamily: 'Arial', marginRight: 10 }}>Treinos</Text>
            <Pressable onPress={createFicha}><Entypo name="plus" size={30} color="black" /></Pressable>
            </View>


            {!fichas || fichas.length === 0 ?
                (<Text>Você ainda não possui fichas</Text>) :


                (fichas.map((ficha) => (
                    <Ficha name={ficha.name} id= {ficha.id}></Ficha>
                )
                ))

            }


            



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 10,
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
        marginLeft: 20,
        marginTop: 10,
        width: 45,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f1f1ff",
        borderRadius: 50,
    },
    cabecalhoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    email: {
        fontSize: 15,
        marginTop: 20,
        marginRight: 10,
        color: '#888888'
        
    }

});
