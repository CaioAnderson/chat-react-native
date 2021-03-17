import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();
import { globalScreenOptions } from './global/header';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={globalScreenOptions}>
                <Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
                <Screen name='Register' component={RegisterScreen} />
                <Screen name='Home' component={HomeScreen}/>
                <Screen name='AddChat' component={AddChatScreen}/>
                <Screen name='Chat' component={ChatScreen}/>
            </Navigator>
        </NavigationContainer>

    )
}


