import { Image, Pressable } from 'react-native';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Ficha({ id, name }) {

    const loadTreino = () => {
        console.log('Pressionou')
    }
    const editTreino = () => {
        console.log('Edit')
        
    }
    const removeTreino = () => {
        console.log('Remove')
        
    }

    return (
        <Pressable onPress={loadTreino}>
            <View style={styles.fichasPerfil}>
            <View style={{flexDirection:'row'}}>
            <View style={styles.iconeContainer}>
                <MaterialCommunityIcons name="weight-lifter" size={24} color="black" />
            </View>  
                    <Text style={{ marginTop: 5, marginLeft: 10, marginBotton: 0, fontSize: 20, textAlign: 'left' }}>{name}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Pressable onPress={editTreino} style={{marginTop: 5, marginRight: 15, }}><AntDesign name="edit" size={20} color="black" /></Pressable>
                <Pressable onPress={removeTreino} style={{ marginTop: 9, marginRight: 10, }} ><AntDesign name="delete" size={15} color="red" /></Pressable>
                </View>
            </View>
            </Pressable>


    )



}

const styles = {
    iconeContainer: {
        marginTop: 9,
        marginLeft: 10,

    },

    fichasPerfil: {
        marginLeft: 20,
        marginTop: 10,
        backgroundColor: '#f7f3f3ff',
        borderRadius: 20,
        width: 350,
        height: 40,
        justifyContent: 'space-between',
        flexDirection: 'row'
    }






}