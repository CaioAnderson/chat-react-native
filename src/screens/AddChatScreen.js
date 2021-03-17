import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { db } from '../config/firebase';

export default function AddChatScreen({ navigation }) {

    const [input, setInput] = useState('');

    async function createChat(){
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            setInput('')
            navigation.navigate('ListContatos');
        }).catch((error) => alert(error.message));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Conversar com alguém',
            headerBackTitle: 'Chats',

        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <TextInput placeholder='Nome do chat' style={styles.input}
                value={input} onChangeText={setInput} />

            <TouchableOpacity style={styles.button} onPress={createChat}>
                <Text style={styles.textButton}>Criar chat</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        marginHorizontal: 50,
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