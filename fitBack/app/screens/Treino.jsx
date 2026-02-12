import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Modal, TextInput, Alert, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AuthContext } from '../contexts/AuthContext.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api.js'
import Exercicio from '../../components/TreinoExercicio.jsx'
import { useFocusEffect } from 'expo-router';
export default function Treino() {
    const { user, signOut } = useContext(AuthContext);
    const [exercicios, setExercicio] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [newExercicioName, setNewExercicioName] = useState('');
    const [newSerieName, setNewSerieName] = useState('');
    const [newRepeticaoName, setNewRepeticaoName] = useState('');
    const [newPesoName, setNewPesoName] = useState('');
    const [newObservacaoName, setNewObservacaoName] = useState('');
    const [newPesoType, setNewPesoType] = useState('Kg')
    const [isEdit, setIsEdit] = useState(false)
    const [idTreinoEdit, setIdTreinoEdit] = useState(null)
    const [IdFicha, setIdFicha] = useState(null)
    const loadExercicio = async () => {
        try {
            const idFichaJson = await AsyncStorage.getItem('idFicha')
            const idFicha = JSON.parse(idFichaJson);
            setIdFicha(idFicha)

            console.log('ID ', idFicha)
            const response = await api.get(`/fitback/ficha/${idFicha}`)
            setExercicio(response.data.Exercicios)
            console.log(response)
            return response


        } catch (error) {
            console.log(error)
        }

    }
    const createTreino = async () => {
        if (newExercicioName.trim() === '') {
            Alert.alert("Erro", "Por favor, digite um nome para a ficha.");
            return;
        }
        try {
            const response = await api.post(`/fitback/exercicio/${IdFicha}`, {
                name: newExercicioName,
                peso: newPesoName,
                pesoType: newPesoType,
                series: newSerieName,
                repeticoes: newRepeticaoName,
                observacoes: newObservacaoName
            })


            console.log(response)
            if (response.status == 201) {
                setModalVisible(false)
                loadExercicio()
            }

        } catch (error) {
            Alert.alert("Erro ao conectar com servidor. Logue novamente");

        }
        console.log('Criou')
    }
    const editTreino = async () => {

        if (newExercicioName.trim() === '') {
            Alert.alert("Erro", "Por favor, digite um nome para a ficha.");
            return;
        }
        try {
            const response = await api.put(`/fitback/exercicio/${idTreinoEdit}/${IdFicha}`, {
                name: newExercicioName,
                peso: parseFloat(newPesoName),
                pesoType: newPesoType,
                series: parseFloat(newSerieName),
                repeticoes: parseFloat(newRepeticaoName),
                observacoes: newObservacaoName
            })


            console.log(response)
            if (response.status == 200) {
                setModalVisible(false)
                loadExercicio()
            } else {
                Alert.alert("Erro ao conectar com servidor. Logue novamente");
            }

        } catch (error) {
            Alert.alert("Erro ao conectar com servidor. Logue novamente");

        }
        console.log('Criou')
    }
    const onPressEdit = async (id) => {
        const FichaId = IdFicha
        const response = await api.get(`/fitback/exercicio/${id}/${FichaId}`)
        const exercicio = response.data
        setNewExercicioName(exercicio.name)
        setNewSerieName(exercicio.series)
        setNewPesoName(exercicio.peso)
        setNewObservacaoName(exercicio.observacoes)
        setNewPesoType(exercicio.pesoType)
        setNewRepeticaoName(exercicio.repeticoes)


        console.log(exercicio)

        console.log(id)
        setIdTreinoEdit(id)
        setIsEdit(true)
        setModalVisible(true)
    }


























    const controlPesoType = () => {

        if (newPesoType == 'Kg') {
            setNewPesoType('Placas')
        } else if (newPesoType == 'Placas') {
            setNewPesoType('Libras')
        } else if (newPesoType == 'Libras') {
            setNewPesoType('Kg')
        } else {
            setNewPesoType('Kg')
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            loadExercicio()
        }, [])
    );



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
                        {!isEdit ? (<Text style={styles.modalTitle}>Novo Exercício</Text>) : (<Text style={styles.modalTitle}>Editar Exercício</Text>)}

                        <TextInput
                            style={styles.input}
                            placeholder="Nome do exercicio"
                            value={newExercicioName}
                            onChangeText={setNewExercicioName}
                            autoFocus={true}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Séries"
                            value={newSerieName}
                            onChangeText={setNewSerieName}
                            autoFocus={true}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Repetições"
                            value={newRepeticaoName}
                            onChangeText={setNewRepeticaoName}
                            autoFocus={true}
                        />
                        <Pressable style={{ padding: 3, alignSelf: 'flex-start', marginLeft: 12, borderRadius: 10, marginLeft: 0, backgroundColor: '#dadada', width: "15%", alignItems: 'center' }} onPress={controlPesoType}><Text>{newPesoType}</Text></Pressable>

                        <TextInput
                            style={styles.input}
                            placeholder="Peso"
                            value={newPesoName}
                            onChangeText={setNewPesoName}
                            autoFocus={true}
                        />


                        <TextInput
                            style={styles.input}
                            placeholder="Observacões"
                            value={newObservacaoName}
                            onChangeText={setNewObservacaoName}
                            autoFocus={true}
                        />



                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.buttonModal, styles.buttonCancel]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>

                            {!isEdit ? (<Pressable style={[styles.buttonModal, styles.buttonSave]} onPress={createTreino}><Text style={styles.textStyle}>Salvar</Text></Pressable>) :

                                (<Pressable style={[styles.buttonModal, styles.buttonSave]} onPress={editTreino}><Text style={styles.textStyle}>Editar</Text></Pressable>)}
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

            <View style={{ flexDirection: 'row', marginTop: 20, marginBotton: 10, marginLeft: 20 }}>
                <Text style={{ fontSize: 25, fontFamily: 'Arial', marginRight: 10 }}>Exercícios</Text>
                <Pressable onPress={() => {
                    setModalVisible(true)
                    setIsEdit(false)
                    setNewExercicioName('')
                    setNewSerieName('')
                    setNewPesoName('')
                    setNewObservacaoName('')
                    setNewRepeticaoName('')
                }}><Entypo name="plus" size={30} color="black" /></Pressable>
            </View>

            <ScrollView>
                {!exercicios || exercicios.length === 0 ?
                    (<Text>Você ainda não possui exercicios</Text>) :


                    (exercicios.map((exercicio) => (
                        <Exercicio key={exercicio.id} data={exercicio} onDeletePress={loadExercicio} onEditPress={(id) => onPressEdit(id)}></Exercicio>
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
