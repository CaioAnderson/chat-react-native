import React, {useState, useEffect, useLayoutEffect} from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { db } from '../config/firebase';
import { AntDesign } from '@expo/vector-icons';

export default function ListContatosScreen({ navigation }){
    const [chats, setChats] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Salas criadas',
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.replace('Home')}>
                    <AntDesign name='arrowleft' size={24} color='white' />
                </TouchableOpacity>
            ),
            
        })
    }, [navigation])

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


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark' />
            <ScrollView>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName}
                        enterChat={enterChat} viewMessage={false}/>
                ))}

            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})


