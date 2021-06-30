import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile'
import Article from '../Feed/Article'
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
                <Stack.Screen name="Article" component={Article} />
            </Stack.Navigator>
            
        )
    }

}