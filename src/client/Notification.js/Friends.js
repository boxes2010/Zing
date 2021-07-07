import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import firebase from 'firebase'
import DataManager from '../../server/DataManager';

export default class Friends extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user:{}
        }
    }

    componentDidMount(){
        DataManager.getUserInfo().then(user =>{
            this.setState({user: user.data()})
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

    renderProfileNotification = (data, index) =>{
        var indicatorIcon = ""
        if(data.type === "liked your post"){
            indicatorIcon = "heart"
        }else if(data.type === "made a comment"){
            indicatorIcon = "comment"
        }else{
            indicatorIcon = "comment"
        }

        return(
            <TouchableOpacity style={styles.postNotificationHeader}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Avatar
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        containerStyle={{backgroundColor:'purple', marginRight:'5%'}}
                        size={40}
                    />
                    <View>
                        <Text style={{color:'#666', fontWeight:'600', fontSize:13}}><Text style={{color:'black', fontWeight:'600', fontSize:13}}>{data.name}</Text> {data.type}</Text>
                        <Text style={{color:'gray', fontWeight:'400', fontSize:12}}>24 hours ago</Text>
                    </View>
                </View>
                
                <View style={styles.indicator}>
                    <Icon
                        name={indicatorIcon}
                        type='font-awesome-5'
                        color='white'
                        size={18}
                        style={{marginLeft:'10%'}}
                    />
                </View>
                
            </TouchableOpacity>
        )
    }

    renderConnectionRequest = (data, index) =>{
        return(
            <TouchableOpacity style={styles.connectRequests}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Avatar
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        containerStyle={{backgroundColor:'purple', marginRight:'10%'}}
                        size={40}
                    />
                    <View>
                        <Text style={{color:'#black', fontWeight:'600', fontSize:14}}>{data.senderName}</Text>
                        <Text style={{color:'gray', fontWeight:'400', fontSize:10}}>24 hours ago</Text>
                    </View>
                </View>
                
            </TouchableOpacity>
        )
    }

    
    render(){
        return(
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={{flexDirection:'row'}}>
                        <Icon
                            name='chevron-left'
                            type='font-awesome-5'
                            color='#ccc'
                            size={19}
                            onPress={()=>{this.props.navigation.pop()}}
                        />

                        <Text style={{color:'black', fontWeight:'500', marginLeft:'20%', fontSize:15}}>Activity</Text>
                    </View>
                    

                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='redo'
                            type='font-awesome-5'
                            color='#ccc'
                            size={15}
                            onPress={()=>{DataManager.getUserInfo().then(user =>{
                                            this.setState({user: user.data()})
                                        })}}
                        />
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.postNotification}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:'7%', marginBottom:'6%'}}>
                            <Text style={{color:'black', fontWeight:'500', fontSize:15}}>Post Notifications</Text>
                            <Text style={{color:'#bbb', fontWeight:'500', fontSize:10}}>View All</Text>
                        </View>

                        {this.state.user.profileActivities == null ? 
                            <View style={{alignItems:'center'}}>
                                <Icon
                                    name='heart'
                                    type='font-awesome-5'
                                    color='#5733FA'
                                    size={50}
                                    style={{marginVertical:"5%"}}
                                    onPress={()=>{}}
                                />
                                <Text style={{color:'black', fontWeight:'300', fontSize:20}}>You currently have</Text> 
                                <Text style={{color:'black', fontWeight:'300', fontSize:20}}>no profile activities</Text> 
                            </View>
                            
                        : null}

                        <FlatList
                            data={this.state.user.profileActivities}
                            renderItem={({item, index}) => this.renderProfileNotification(item, index)}
                            style={{}}
                        />

                    </View>

                    <View style={styles.postNotification}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:'7%', marginBottom:'6%'}}>
                            <Text style={{color:'black', fontWeight:'500', fontSize:15}}>Connection Requests</Text>
                            <Text style={{color:'#bbb', fontWeight:'500', fontSize:10}}>View All</Text>
                        </View>
                        {this.state.user.connectRequests == null ? 
                            <View style={{alignItems:'center'}}>
                                <Icon
                                    name='user-friends'
                                    type='font-awesome-5'
                                    color='#5733FA'
                                    size={50}
                                    style={{marginVertical:"5%"}}
                                    onPress={()=>{}}
                                />
                                <Text style={{color:'black', fontWeight:'300', fontSize:20}}>You currently have</Text> 
                                <Text style={{color:'black', fontWeight:'300', fontSize:20}}>no connection requests</Text> 
                            </View>
                            
                        : null}
                        <FlatList
                            data={this.state.user.connectRequests}
                            renderItem={({item, index}) => this.renderConnectionRequest(item, index)}
                            style={{}}
                        />
                    </View>
                </ScrollView>
                
                
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },

    header:{
        backgroundColor:'#FAFAFA',
        paddingVertical:'7%',
        paddingHorizontal:'7%',
        alignItems:'center',
        marginBottom:'5%',
        flexDirection:'row',
        justifyContent:'space-between'
    },

    friend:{
        borderBottomWidth:1,
        paddingVertical :'6%',
        borderColor: '#ccc'
    },

    postNotification:{
        marginBottom:'3%',
    },

    indicator:{
        height:'130%',
        backgroundColor:'#5733FA',
        position:'absolute',
        right:'0%',
        justifyContent:'center',
        width:'20%',
        borderTopLeftRadius:50,
        borderBottomLeftRadius:50,
        alignItems:'center'
    },

    postNotificationHeader:{
        backgroundColor:'#FAFAFA',
        paddingVertical:'2.5%',
        paddingHorizontal:'7%',
        alignItems:'center',
        marginBottom:'5%',
        flexDirection:'row',
        justifyContent:'space-between'
    },

    connectRequests:{
        paddingVertical:'5%',
        paddingHorizontal:'5%',
        marginHorizontal:'4%',
        alignItems:'center',
        marginBottom:'5%',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        shadowOpacity:0.06,
        shadowOffset:{
            width:0,
            height: 10,
        },
        borderRadius:7,
        borderWidth:0.3,
        borderColor:'#eee'
    }
  });