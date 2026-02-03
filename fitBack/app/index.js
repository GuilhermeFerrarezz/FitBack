import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Login from '../components/Login.jsx'

import { Link } from 'expo-router';

export default function FitBack() {
    return (
      <View style={styles.Container}>
            <Text>LOGIN GOOGLE</Text>
            <Login></Login>
        </View>
  );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
