import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import firebase from 'firebase'
import DataManager from '../../server/DataManager';

export default class Notification extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user:{}
        }
    }

    componentDidMount(){
        DataManager.getUserInfo().then(user =>{
            this.setState({user: user.data()})
            console.log(user.data())
        })
    }

    handleContactRequest = (action, sender, content, index) =>{
        DataManager.handleContactRequest(action, sender, content).then(res =>{
            var newContactRequests = this.state.user.connectRequests
            newContactRequests.splice(index, 1)
            var newUser = this.state.user
            newUser.connectRequests = newContactRequests
            this.setState({user: newUser})
        })
    }

    renderFriend = (data, index) =>{
        return(
            <TouchableOpacity style={styles.friend}>
                <View style={{flexDirection: 'row', alignItems:'center', width:'100%'}}>
                    <View style={{flexDirection: 'row', alignItems:'flex-start', justifyContent:'space-between'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'blue'}}
                            size={50}
                        />
                        <View>
                            <Text style={{color:'black', fontWeight:'600', fontSize:18, marginLeft:'7%'}}>{data.senderName}</Text>
                            <Text style={{color:'#666', fontWeight:'500', fontSize:16, marginLeft:'7%'}}>{data.message}</Text>
                        </View>
                        
                    </View>
                </View>

                <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:'4%', alignItems:'center', marginRight:'20%'}}>
                    <TouchableOpacity style={{paddingVertical:'4%',paddingHorizontal:'7%', backgroundColor:'#0279D2',borderRadius:20, justifyContent:'center', marginRight:'10%'}} onPress={()=>this.handleContactRequest('accept', data.sender, data)}>
                        <Text style={{color:'white', fontWeight:'700', fontSize:12}}>ACCEPT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical:'4%',paddingHorizontal:'7%', backgroundColor:'#0279D2',borderRadius:20, justifyContent:'center'}} onPress={()=>this.handleContactRequest('reject', data.sender, data)}>
                        <Text style={{color:'white', fontWeight:'700', fontSize:12}}>DECLINE</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginTop:'3%'}}>
                    
                    <Text style={{color:'gray', fontWeight:'500', fontSize:12, alignSelf:'flex-end'}}>Posted 10 hours ago</Text>

                </View>
            </TouchableOpacity>
        )
    }

    
    render(){
        return(
            <View style={styles.safeArea}>
                <View style={styles.header}>
                    <Icon
                        name='envelope-open'
                        type='font-awesome-5'
                        color='white'
                        size={30}
                        style={{marginTop:'3%'}}
                    />
                    <Text style={{color:'white', fontWeight:'500', fontSize:24, marginTop:'8%'}}>Notifications</Text>
                    
                </View>
                
                <FlatList
                    data={this.state.user.connectRequests}
                    renderItem={({item, index}) => this.renderFriend(item, index)}
                    style={{paddingHorizontal:'5%'}}
                />
                
                
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },

    header:{
        backgroundColor:'#4855D7',
        paddingVertical:'10%',
        paddingHorizontal:'10%',
        alignItems:'center',
        marginBottom:'5%'
    },

    friend:{
        borderBottomWidth:1,
        paddingVertical :'6%',
        borderColor: '#ccc'
    }
  });