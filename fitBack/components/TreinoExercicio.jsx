import { Image, Pressable } from 'react-native';
import api from '../services/api.js'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'
export default function Exercicio({onDeletePress, data, onEditPress }) {

    const editTreino = () => {
        console.log('Edit')
        onEditPress(data.id)  
        
    }
    const removeTreino = async () => {
        try {
            console.log('ID DA FICGHa ', data.FichaId)
            if (data.id) {
                console.log(data.fichaId)
                const response = await api.delete(`/fitback/exercicio/${data.id}/${data.FichaId}`)
                console.log(response)
                if (response.status == 204) {
                    onDeletePress()
                } else {
                     Alert.alert("Erro ao conectar com servidor. Logue novamente");
                }

            }
        } catch (error) {
            console.log('Erro ao deletar ', error)
            Alert.alert("Erro ao conectar com servidor. Logue novamente");
            
        }
        
    }

    return (
        <View style={styles.card}>
    
            <View style={styles.header}>
                <Text style={styles.title}>{data.name}</Text>
                <View style={styles.icons}>
                    <Pressable onPress={editTreino} style={styles.iconButton}>
                        <AntDesign name="edit" size={22} color="#4A4A4A" />
                    </Pressable>
                    <Pressable onPress={removeTreino} style={styles.iconButton}>
                        <AntDesign name="delete" size={22} color="#FF4444" />
                    </Pressable>
                </View>
            </View>

           
            <View style={styles.gridContainer}>
                <View style={styles.gridItem}>
                    <Text style={styles.label}>SÉRIES</Text>
                    <Text style={styles.value}>{data.series}</Text>
                </View>
                
                <View style={styles.separator} />

                <View style={styles.gridItem}>
                    <Text style={styles.label}>REPS</Text>
                    <Text style={styles.value}>{data.repeticoes}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.gridItem}>
                    <Text style={styles.label}>{data.pesoType}</Text>
                    <Text style={styles.value}>{data.peso}</Text>
                </View>
            </View>

            {data.observacoes ? (
                
                <View style={styles.footer}>
                    <MaterialCommunityIcons
                        name="notebook-outline"
                        size={16}
                        color="#666"
                        style={{ marginRight: 8 }}
                    />
    
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={{ paddingRight: 20 }}
                    >
                        <Text style={styles.obsText}>
                            {data.observacoes}
                        </Text>
                    </ScrollView>
                </View>) : null}
        </View>


    )



}

const styles = {

    fichasPerfil: {
        marginLeft: 20,
        marginTop: 10,
        backgroundColor: '#f7f3f3ff',
        borderRadius: 20,
        width: '85%',
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 1,
        marginHorizontal: 16, 
        padding: 4,
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 5,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
    },
    icons: {
        flexDirection: 'row',
        gap: 15,
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gridItem: {
        alignItems: 'center',
        flex: 1,
    },
    separator: {
        width: 1,
        height: 30,
        backgroundColor: '#e0e0e0',
    },
    label: {
        fontSize: 10,
        color: '#888',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2196F3', 
    },
    footer: {
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    obsText: {
        marginLeft: 8,
        color: '#555',
        fontSize: 13,
        fontStyle: 'italic',
    }






}