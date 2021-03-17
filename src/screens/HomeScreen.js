import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity
} from 'react-native';
import { Avatar } from 'react-native-elements';

import { auth, db } from '../config/firebase';

import CustomListItem from '../components/CustomListItem';
import { AntDesign, Ionicons, } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {

    const [chats, setChats] = useState([]);

    function signOut() {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    function enterChat(id, chatName) {
        navigation.navigate('Chat', {
            id, chatName
        })
    }

    useEffect(() => {
        const accounts = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return accounts;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Hermes',
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>

                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    width: 80, marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
                        <Ionicons name='add' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark' />
            <ScrollView>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName}
                        enterChat={enterChat} />
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})