import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import firebase from 'firebase'
import DataManager from '../../server/DataManager';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

export default class Chatroom extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            messages:[]
        }
    }

    data = this.props.route.params.item

    componentDidMount(){
        firebase.database().ref("/chatrooms/" + this.data.chatroomID + "/messages").on('value', snapshot =>{
            var data = snapshot.val()
            this.setState({messages: data})
        })
    }

    sendMessage = (messages) =>{
        var newMessages = messages.concat(this.state.messages)
        DataManager.sendMessage(this.data.chatroomID, newMessages) 
        
        
    }

    renderSystemMessage = () =>{
        return(
            <View style={{alignSelf:'center', alignItems:'center'}}>
                <Avatar
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    containerStyle={{backgroundColor:'blue'}}
                    size={70}
                />
                <Text style={{color:'black', fontWeight:'600', marginTop:'3%', fontSize:20}}>PandaRussia</Text>
                <Text style={{color:'gray', fontWeight:'500', marginTop:'1.5%', marginBottom: '3%', fontSize:15}}>This is a new message. Speak to your new contactasdsdsddsdsdsd</Text>
            </View>
        )
    }

    renderBubble = (props) =>{
        return(
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'purple',
                        borderRadius: 30,
                        borderBottomRightRadius: 30,
                        marginBottom: 10,
                        padding: 5,
                        right: 15,
                        justifyContent: "flex-end",
                        alignSelf: 'stretch',
                        marginLeft: 0,
                        alignSelf: "flex-end"
                    },
                    left: {
                        backgroundColor: 'cyan',
                        borderRadius: 30,
                        marginBottom: 20,
                        padding: 5,
                        left: -30
                    }
                }}/>
        )
    }

    render(){
        var users = this.data.userJSON
        var otherUser = ''
        for (var key in users) {
            if (users[key] != firebase.auth().currentUser.uid) {
                otherUser = key
            }
        }
        return(
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Icon
                        name='arrow-left'
                        type='font-awesome-5'
                        color='gray'
                        size={18}
                        onPress={()=>this.props.navigation.pop()}
                    />
                    <Text style={{color:'black', fontWeight:'800'}}>{otherUser}</Text>
                    <Icon
                        name='cog'
                        type='font-awesome-5'
                        color='gray'
                        size={18}
                    />
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.sendMessage(messages)}
                    user={{
                        _id: firebase.auth().currentUser.uid,
                        name: firebase.auth().currentUser.displayName
                    }}
                    renderSystemMessage={()=>this.renderSystemMessage()}
                    renderBubble = {props => this.renderBubble(props)}
                />
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        
      },
  
    container:{
        flex:1,
        backgroundColor:'#F1F2F4',
    },

    header:{
        backgroundColor:'white',
        paddingVertical:'4%',
        paddingHorizontal:'7.5%',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
    },
  });