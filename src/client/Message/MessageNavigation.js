import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Message from './Message'
import Chatroom from './Chatroom'
const Stack = createStackNavigator();

export default class MessageStackNavigation extends React.Component{

    render(){
        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="Chatroom" component={Chatroom} />
            </Stack.Navigator>
            
        )
    }

}