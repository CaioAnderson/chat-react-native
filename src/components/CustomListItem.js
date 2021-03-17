import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../config/firebase';

const { Content, Title, Subtitle } = ListItem;

export default function CustomListItem({ id, chatName, enterChat }) {

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages')
            .orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setChatMessages(snapshot.docs.map(doc => doc.data()))
            ))
        return unsubscribe;
    }, [])

    return (
        <>
            {Boolean(chatMessages[0]) && (
                <ListItem key={id} onPress={() => enterChat(id, chatName)}
                    style={styles.container} key={id} bottomDivider>
                    <Avatar rounded
                        source={{ uri: chatMessages?.[0]?.photoURL || "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" }} />

                    <Content>
                        <Title style={{ fontWeight: 'bold' }}>
                            {chatName}
                        </Title>
                        <Subtitle numberOfLines={1} ellipsizeMode='tail' >
                            {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
                        </Subtitle>
                    </Content>

                </ListItem>
            )}

        </>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})