import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../config/firebase';

const { Content, Title, Subtitle } = ListItem;

export default function CustomListItem({ id, chatName, enterChat, viewMessage }) {

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages')
            .orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setChatMessages(snapshot.docs.map(doc => doc.data()))
            ))
        return unsubscribe;
    }, [])

    if(viewMessage){
        return(
            <>
            {Boolean(chatMessages[0]) && (
                <ListItem key={id} onPress={() => enterChat(id, chatName)}
                    style={styles.container} key={id} bottomDivider>
                    <Avatar rounded
                        source={{ uri: "https://ibac.com.br/wp-content/uploads/2020/04/perfil-anonimo.jpg" }} />

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
    }else{
        return(
            <ListItem key={id} onPress={() => enterChat(id, chatName)}
                    style={styles.container} key={id} bottomDivider>
                    <Avatar rounded
                        source={{ uri: "https://ibac.com.br/wp-content/uploads/2020/04/perfil-anonimo.jpg" }} />

                    <Content>
                        <Title style={{ fontWeight: 'bold' }}>
                            {chatName}
                        </Title>
                        {/* <Subtitle numberOfLines={1} ellipsizeMode='tail' >
                            {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
                        </Subtitle> */}
                    </Content>

                </ListItem>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})