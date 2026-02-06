import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Home() {
    const { user, signOut } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style = {styles.ProfileContainer}>
                {user?.user?.avatar ?
                    (<Image source={user?.user?.avatar} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}></Image>) : (<></>)}
                  <Text style={styles.title}>{user?.user?.name}</Text>

            </View>
            <Text>E-mail: {user?.user?.email}</Text>
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
