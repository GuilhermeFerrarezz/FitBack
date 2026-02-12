import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Modal, TextInput, Alert, ScrollView } from 'react-native';
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
    const [isEdit, setIsEdit] = useState(false)
    const [idFichaEdit, setIdFichaEdit] = useState(null)
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
        if (newFichaName.trim() === '') {
            Alert.alert("Erro", "Por favor, digite um nome para a ficha.");
            return;
        }
        try {
            const response = await api.post('/fitback/ficha/', {
                name: newFichaName
            })
            console.log(response)
            if (response.status == 201) {
                setModalVisible(false)
                loadFichas()
            }

        } catch (error) {
            Alert.alert("Erro ao conectar com servidor. Logue novamente");

        }
        console.log('Criou')
    }
    const editFicha = async () => {
        const id = idFichaEdit
        if (newFichaName.trim() === '') {
            Alert.alert("Erro", "Por favor, digite um nome para a ficha.");
            return;
        }
        try {
            const response = await api.put(`/fitback/ficha/${id}`, {
                name: newFichaName
            })
            console.log(response)
            if (response.status == 200) {
                setModalVisible(false)
                loadFichas()
            }

        } catch (error) {
            Alert.alert("Erro ao conectar com servidor. Logue novamente");
        }

    }
    const onPressEdit = async (id) => {
        const response = await api.get(`/fitback/ficha/${id}`)
        const nameOld = response.data.name
        setNewFichaName(nameOld)
        setIdFichaEdit(id)
        setIsEdit(true)
        setModalVisible(true)
    }
    useEffect(() => {
        loadFichas()
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
                        {!isEdit ? (<Text style={styles.modalTitle}>Nova Ficha</Text>) : (<Text style={styles.modalTitle}>Editar Ficha</Text>)}


                        <TextInput
                            style={styles.input}
                            placeholder="Nome do treino"
                            value={newFichaName}
                            onChangeText={setNewFichaName}
                            autoFocus={true}
                        />

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.buttonModal, styles.buttonCancel]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                            {!isEdit ? (<Pressable style={[styles.buttonModal, styles.buttonSave]} onPress={createFicha}><Text style={styles.textStyle}>Salvar</Text></Pressable>) :
                                (<Pressable style={[styles.buttonModal, styles.buttonSave]} onPress={editFicha}><Text style={styles.textStyle}>Editar</Text></Pressable>)}

                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.cabecalhoContainer}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', paddingRight: 10 }}>
                    <View style={styles.ProfileContainer}>

                        {!user?.user?.avatar ?
                            (<FontAwesome5 style={styles.profile} name="user" size={24} color="black" />) :
                            (<Image source={{ uri: user?.user?.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }}></Image>)}
                    </View>
                    <Text style={styles.title}>{user?.user?.name}</Text>
                </View>

            </View>
            <Text style={styles.email}>{user?.user?.email}</Text>

            <View style={{ flexDirection: 'row', marginTop: 100, marginLeft: 20 }}>
                <Text style={{ fontSize: 25, fontFamily: 'Arial', marginRight: 10 }}>Treinos</Text>
                <Pressable onPress={() => {
                    setModalVisible(true)
                    setIsEdit(false)
                }}><Entypo name="plus" size={30} color="black" /></Pressable>
            </View>

            <ScrollView>
                {!fichas || fichas.length === 0 ?
                    (<Text>Você ainda não possui fichas</Text>) :


                    (fichas.map((ficha) => (
                        <Ficha key={ficha.id} name={ficha.name} id={ficha.id} onDeletePress={loadFichas} onEditPress={(id) => onPressEdit(id)}></Ficha>
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
        flex: 1,
        flexWrap: 'wrap',
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
        backgroundColor: 'rgba(0,0,0,0.5)' 
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
