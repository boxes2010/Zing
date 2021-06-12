import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile'

const Stack = createStackNavigator();

export default class ProfileStackNavigation extends React.Component{

    render(){
        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
            
        )
    }

}