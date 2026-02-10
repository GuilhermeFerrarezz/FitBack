import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Modal, TextInput, Alert, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AuthContext } from '../contexts/AuthContext.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api.js'
import Ficha from '../../components/TreinoFicha.jsx'
import { useFocusEffect } from 'expo-router';
export default function Treino() {
    const { user, signOut } = useContext(AuthContext);
    const [treinos, setTreinos] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [newTreinoName, setNewTreinoName] = useState('');
    const loadTreinos = async () => {
        try {
            const idFichaJson = await AsyncStorage.getItem('idFicha')
            const idFicha = JSON.parse(idFichaJson);
            console.log('ID ',idFicha)
            const response = await api.get(`/fitback/ficha/${idFicha}`)
            setTreinos(response.data.Exercicios)
            console.log(response)
            return response


        }  catch (error) {
            console.log(error)
        }

    }
    const createTreino = async () => {
        if (newTreinoName.trim() === '') {
            Alert.alert("Erro", "Por favor, digite um nome para a ficha.");
            return;
        }
        try {
            const response = await api.post('/fitback/ficha/', {
                name: newTreinoName
            })
            console.log(response)
            if (response.status == 201) {
                setModalVisible(false)
                loadTreinos()
            }

        } catch (error) {
            Alert.alert("Erro ao conectar com servidor");
            
        }
        console.log('Criou')
    }

    

    useFocusEffect(() => {
        loadTreinos()




    }, [])

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalCenteredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Nova Treino</Text>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do treino"
                            value={newTreinoName}
                            onChangeText={setNewTreinoName}
                            autoFocus={true} 
                        />

                        <View style={styles.modalButtons}>
                            <Pressable 
                                style={[styles.buttonModal, styles.buttonCancel]} 
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>

                            <Pressable 
                                style={[styles.buttonModal, styles.buttonSave]} 
                                onPress={createTreino}
                            >
                                <Text style={styles.textStyle}>Salvar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.cabecalhoContainer}>
                <View style={{flexDirection:'row'}}>
                <View style={styles.ProfileContainer}>
                    
                    {!user?.user?.avatar ?
                        (<FontAwesome5 style={styles.profile} name="user" size={24} color="black" />) :
                        (<Image source={user?.user?.avatar} style={{ width: 40, height: 40, borderRadius: 20}}></Image>)}
                </View>
                    <Text style={styles.title}>{user?.user?.name}</Text>
                    </View>    
            
            </View>
            <Text style={styles.email }>{user?.user?.email}</Text>

            <View style={{flexDirection:'row', marginTop: 100, marginLeft: 20}}>
            <Text style={{ fontSize: 25, fontFamily: 'Arial', marginRight: 10 }}>Treinos</Text>
            <Pressable onPress={() => setModalVisible(true)}><Entypo name="plus" size={30} color="black" /></Pressable>
            </View>

             <ScrollView>       
            {!treinos || treinos.length === 0 ?
                (<Text>Você ainda não possui treinos</Text>) :


                (treinos.map((treino) => (
                    <Ficha name={treino.name} id={treino.id} onDeletePress={loadTreinos}></Ficha>
                )
                ))

                }
             </ScrollView>    


            



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
        marginLeft: 20,
        color: '#888888'
        
    },
    modalCenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)' // Fundo escuro transparente
    },
    modalView: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        width: '100%',
        margin: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10
    },
    buttonModal: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%',
        alignItems: 'center'
    },
    buttonSave: {
        backgroundColor: "#2196F3",
    },
    buttonCancel: {
        backgroundColor: "#ff4444",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }

});
