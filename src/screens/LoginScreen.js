import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TextInput,
    TouchableOpacity, KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native-elements';

import logo from '../assets/logo.png';
import { auth } from '../config/firebase';



export default function LoginScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    function login() {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))
    }

    useEffect(() => {
        const account = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setLoading(true);
                navigation.replace('Home');
            }

        })

        return account;
    })


    return (
        // <>
            // {!loading ? (
                <KeyboardAvoidingView style={styles.container}>
                    <StatusBar style='dark' />
                    <Image source={logo} style={{ width: 190, height: 190 }} />

                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Email' style={styles.input}
                            value={email} onChangeText={setEmail} />
                        <TextInput placeholder='Senha' style={styles.input} secureTextEntry
                            value={password} onChangeText={setPassword} />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={login}>
                        <Text style={styles.textButton}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}
                        style={[styles.button, { backgroundColor: '#fff', elevation: 0 }]}>
                        <Text style={[styles.textButton, { color: '#F2CB05' }]}>
                            Registrar
                    </Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            // ) : (
            //     <View style={styles.container}>
            //         <Image source={logo} style={{ width: 190, height: 190, marginBottom: 100 }} />
            //         <ActivityIndicator size='large' color='#F2CB05' />
            //     </View>
            // )}

        // </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50,
    },
    inputContainer: {
        width: '100%'
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        padding: 10,
        borderBottomWidth: 0.5,
        borderRadius: 10,
        borderColor: '#000',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#F2CB05',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 2,
        marginBottom: 20
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    }
})