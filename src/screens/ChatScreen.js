import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
    KeyboardAvoidingView, ScrollView, TextInput, TouchableWithoutFeedback,
    Keyboard, Platform
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { auth, db } from '../config/firebase';
import * as firebase from 'firebase';

export default function ChatScreen({ navigation, route }) {

    const { chatName, id } = route.params;

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    function sendMessage() {
        if (input === '') {
            Keyboard.dismiss();
        } else {
            Keyboard.dismiss();
            db.collection('chats').doc(id).collection('messages')
                .add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    message: input,
                    displayName: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL
                })

            setInput('');
        }


    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: chatName,
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Avatar
                    rounded
                    source={{ uri: messages[0]?.data.photoURL || "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" }} />
                    <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 16 }}>{chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' size={24} color='white' />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', width: 80, justifyContent: 'space-between', marginRight: 20 }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='camera' size={24} color='#fff' />
                    </TouchableOpacity>

                </View>
            )
        })
    },[navigation, messages])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages')
            .orderBy('timestamp', 'desc').onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))

        return unsubscribe;

    }, [route])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark' />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}
                style={styles.areaKeyboard} keyboardVerticalOffset={90}>

                <>
                    <ScrollView contentContainerStyle={{ padding: 15 }}>
                        {messages.map(({ id, data }) =>
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.recebido}>
                                    <Avatar position='absolute' bottom={-5} right={-5}
                                        rounded size={15} source={{ uri: data.photoURL }} />
                                    <Text style={styles.messageTextRecebido}>{data.message}</Text>
                                </View>
                            ) : (
                                <View style={styles.enviado}>
                                    <Avatar position='absolute' bottom={-5} left={-5}
                                        rounded size={20} source={{ uri: data.photoURL }} />
                                    <Text style={styles.messageTextEnviado}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        )}

                    </ScrollView>

                    <View style={styles.footer}>
                        <TextInput placeholder='Digite aqui pro Hermes enviar'
                            style={styles.input} onSubmitEditing={sendMessage}
                            value={input} onChangeText={setInput} />

                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name='send' size={30} color='#F2CB05' />
                        </TouchableOpacity>

                    </View>
                </>



            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    areaKeyboard: {
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    input: {
        bottom: 0,
        height: 50,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ececec',
        padding: 10,
        color: 'grey',
        borderRadius: 30
    },
    recebido: {
        padding: 15,
        backgroundColor: '#ececec',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 20,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    messageTextRecebido: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10
    },
    enviado: {
        padding: 15,
        backgroundColor: '#F2CB05',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginRight: 20,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
        marginTop: 10
    },
    messageTextEnviado: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10
    },
    senderName:{
        left: 10,
        paddingRight: 15,
        fontSize: 10,
        color: 'black'
    }
})