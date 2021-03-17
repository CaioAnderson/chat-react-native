import { StatusBar } from 'expo-status-bar';
import { auth } from '../config/firebase';
import React, { useLayoutEffect, useState } from 'react';
import {
    View, Text, StyleSheet, KeyboardAvoidingView,
    TextInput, TouchableOpacity
} from 'react-native';


export default function RegisterScreen({ navigation }) {
    console.log(navigation)

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Crie sua conta",
            
        });
    }, [navigation]);

    async function registrar() {
       await auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: nome,
                    photoURL: imageURL ||
                        "https://ibac.com.br/wp-content/uploads/2020/04/perfil-anonimo.jpg",

                })

            navigation.replace('Login')

            }).catch(error => alert(error.message));
    }


    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='dark' />
            {/* <Text>This is the Register screen </Text> */}

            <View style={styles.inputContainer}>
                <TextInput placeholder='Nome' style={styles.input}
                    value={nome} onChangeText={setNome} />

                <TextInput placeholder='Email' style={styles.input}
                    value={email} onChangeText={setEmail} />


                <TextInput placeholder='Senha' style={styles.input} secureTextEntry
                    value={password} onChangeText={setPassword} />

                <TextInput placeholder='Coloque a url de sua imagem (opcional)'
                    style={styles.input} value={imageURL}
                    onChangeText={setImageURL} onSubmitEditing={registrar} />

            </View>

            <TouchableOpacity style={styles.button} onPress={registrar}>
                <Text style={styles.textButton}>Criar conta</Text>
            </TouchableOpacity>


        </KeyboardAvoidingView>
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

