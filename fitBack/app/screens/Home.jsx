import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Home(){
    const { user, signOut } = useContext(AuthContext);
  return (
      <View style={styles.container}>
    
      <Text style={styles.title}>{user?.user?.name}</Text>
      <Text>E-mail: {user?.user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  button: { marginTop: 30, padding: 15, backgroundColor: '#ff4444', borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
