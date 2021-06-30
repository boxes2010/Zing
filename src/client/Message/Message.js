import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import firebase from 'firebase'
import DataManager from '../../server/DataManager';
import Modal from 'react-native-modal'
export default class Message extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            searchModalVisible: false,
            searchText:'',
            contactList: [],
            user:{},
            chatrooms:[],
        }
    }

    componentDidMount(){
        DataManager.getUserInfo().then(user =>{
            var data = user.data()
            this.setState({user: data })
            if(data.chatrooms != null){
                data.chatrooms.forEach(id =>{
                    DataManager.getChatRoom(id).then(result => {
                        var newChatrooms = this.state.chatrooms
                        var newChatroom = result.val()
                        newChatroom.chatroomID = result.key
                        newChatrooms.push(newChatroom)
                        this.setState({chatrooms: newChatrooms})
                    })
                })
            }

            data.contacts.forEach(id => {
                DataManager.getUserInfoWithID(id.contactID).then(user2 =>{
                    var contactData = user2.data()
                    contactData.uid = user2.id
                    var newContactList = this.state.contactList
                    newContactList.push(contactData)
                    this.setState({contactList: newContactList})
                })
            })
        })
    }

    createChatRoom = (otherUser) =>{
        this.setState({searchModalVisible: false})
        DataManager.createChatRoom([firebase.auth().currentUser.uid, otherUser]).then(res =>{
            this.props.navigation.push('Chatroom', {res})
        })
    }

    renderChatRoomItem = (item, index) =>{
        var users = item.userJSON
        var otherUser = ''
        for (var key in users) {
            if (users[key] != firebase.auth().currentUser.uid) {
                otherUser = key
            }
        }
        return(
            <TouchableOpacity style={styles.commentBox} onPress={()=>this.props.navigation.push('Chatroom', {item})}>
                <View style={{flexDirection: 'row', alignItems:'flex-start', width:'100%', backgroundColor:'white', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'blue'}}
                            size={40}
                        />
                        <View>
                            <Text style={{color:'black', fontWeight:'700', fontSize:14, marginLeft:10}}>{otherUser}</Text>
                            <Text style={{color:'#777', fontWeight:'600', fontSize:13, marginLeft:10, marginTop:3}}>{item.lastMessage}</Text>
                        </View>
                        
                    </View>
                    <Text style={{color:'#777', fontWeight:'600', fontSize:13, marginLeft:10, marginTop:3, alignSelf:"center"}}>9:48  PM</Text>
                    
                </View>
            </TouchableOpacity>
        )
    }

    renderContactItem = (data, index) =>{
        return(
            <TouchableOpacity style={styles.commentBox} onPress={()=>{this.createChatRoom(data.uid)}}>
                <View style={{flexDirection: 'row', alignItems:'flex-start', width:'100%', backgroundColor:'white', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'blue'}}
                            size={40}
                        />
                        <View>
                            <Text style={{color:'black', fontWeight:'700', fontSize:14, marginLeft:10}}>{data.user_name}</Text>
                            <Text style={{color:'#777', fontWeight:'600', fontSize:13, marginLeft:10, marginTop:3}}>Last Message</Text>
                        </View>
                        
                    </View>
                    <Icon
                        name='chevron-right'
                        type='font-awesome-5'
                        color='gray'
                        size={22}
                        style={{alignSelf:'center'}}
                    />
                    
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <SafeAreaView style={styles.safeArea}>
                <Modal isVisible={this.state.searchModalVisible} animationIn="slideInRight" animationOut="slideOutRight" hasBackdrop={false} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start'}}>
                    <SafeAreaView style={{width:'100%', backgroundColor:'white', flex:1}}>
                        <View style={{
                                backgroundColor:'white',
                                paddingVertical:'4%',
                                paddingHorizontal:'4%',
                                flexDirection:"row",
                                justifyContent:"flex-start ",
                                alignItems:'center'
                            }}>
                            <Icon
                                name='times'
                                type='font-awesome-5'
                                color='gray'
                                size={22}
                                onPress={()=>this.setState({searchModalVisible: false})}
                            />
                            <Text style={{color:'black', fontWeight:'800', fontSize:17, marginLeft:'5%'}}>New Chat</Text>

                        </View>
                        <TextInput
                            style={{width:'100%', paddingHorizontal:'5%', paddingVertical:'3%', backgroundColor:'#eee'}}
                            placeholder="Search contacts"
                            onChangeText={(text)=>this.setState({searchText:text})}

                        />
                        <FlatList
                            data={this.state.contactList}
                            renderItem={({item, index}) => this.renderContactItem(item, index)}
                        />

                    </SafeAreaView>
                </Modal>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'blue'}}
                            size={35}
                        />
                        <Text style={{color:'black', fontWeight:'800', fontSize:17}}>Chat</Text>

                        <Icon
                            name='torsos'
                            type='foundation'
                            color='gray'
                            size={22}
                            onPress={()=>this.setState({searchModalVisible: true})}
                        />
                    </View>
                    <FlatList
                        data={this.state.chatrooms}
                        renderItem={({item, index}) => this.renderChatRoomItem(item, index)}
                    />
                </View>
                
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
        paddingHorizontal:'4%',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
    },

    commentBox:{
        backgroundColor:'white',
        padding:'4%',
        borderBottomWidth:0.4,
        borderColor:'#eee',
        marginTop:'2%'
    }
  });