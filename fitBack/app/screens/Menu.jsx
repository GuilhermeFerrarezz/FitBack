import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { router } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default function Menu() {
    const { user, signOut } = useContext(AuthContext);
        return (
            <View style={{ flex: 1}}>
                <View style={styles.cabecalhoContainer}>
                <View style={{flexDirection:'row', flex: 1, alignItems: 'center', paddingRight: 10}}>
                <View style={styles.ProfileContainer}>
                    
                    {!user?.user?.avatar ?
                        (<FontAwesome5 style={styles.profile} name="user" size={24} color="black" />) :
                        (<Image source={{uri: user?.user?.avatar}} style={{ width: 40, height: 40, borderRadius: 20}}></Image>)}
                </View>
                    <Text style={styles.title}>{user?.user?.name}</Text>
                    </View>    
            
            </View>
            <Text style={styles.email }>{user?.user?.email}</Text>
                <Text style = {styles.title}>Menu</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                    signOut()
                    router.navigate({ pathname: '../' })
                    
                  }}>
                <Text style={styles.buttonText}>Sair da Conta</Text>
            </TouchableOpacity>
            </View>
        );
}
    
const styles = StyleSheet.create({
    
    button: {
        marginTop: 30,
        padding: 15,
        backgroundColor: '#ff4444',
        borderRadius: 8,
        width: '40%',
        height: '7%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems:'center'
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 10,
    },
});
