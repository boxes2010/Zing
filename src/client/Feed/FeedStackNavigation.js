import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './Feed'
import Article from './Article'
import Link from './Link'
import ArticlePromotion from './ArticlePromotion'
import Notification from '../Notification.js/Notification';

const Stack = createStackNavigator();

export default class FeedStackNavigation extends React.Component{

    render(){
        console.log(this.props)
        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                    
                }}
            >
                <Stack.Screen name="Feed" component={Feed} initialParams={{openControlPanel: this.props.route.params.openControlPanel, closeControlPanel: this.props.route.params.closeControlPanel}}/>
                <Stack.Screen name="Article" component={Article}/>
                <Stack.Screen name="Article Promotion" component={ArticlePromotion}/>
                <Stack.Screen name="Link" component={Link}/>
                <Stack.Screen name="Notification" component={Notification}/>
            </Stack.Navigator>
            
        )
    }

}