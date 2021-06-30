import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Touchable } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import DataManager from '../../server/DataManager'
import firebase from 'firebase'
import Modal from 'react-native-modal'
import Notification from '../Notification.js/Notification'

export default class Feed extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            feed: [],
            notificationModalVisible:false
        }
    }
    componentDidUpdate(){
        
        DataManager.registerUser()
    }
    componentDidMount(){
        DataManager.retrievePosts().then(result => {
            const data = result.docs.map(doc => doc.data())
            this.setState({feed: data})
        })
    }

    chooseFeedItem = (item, index) =>{
        if(item.postType === 'idea'){
            return this.feedItemV1(item, index)
        }else if(item.postType === 'promotion'){
            return this.feedItemV2(item, index)
        }else if (item.postType === 'request'){
            return this.feedItemV3(item, index)
        }
    }

    setNotificationVisible = (isVisible) =>{
        this.setState({notificationModalVisible: isVisible})
    }

    feedItemV1 = (data, index) =>{
        return(
            <View style={feed.container}>
                <View style={feed.header}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'purple', marginRight:'3%'}}
                        />
                        <View>
                            <Text style={{color:'#666', fontWeight:'600', fontSize:12}}>{data.ownerName}</Text>
                            <Text style={{color:'gray', fontWeight:'400', fontSize:10}}>Posted 24 hours ago</Text>
                        </View>
                    </View>
                    
                    <Icon
                        name='ellipsis-h'
                        type='font-awesome-5'
                        color='gray'
                        size={18}
                    />
                </View>

                <TouchableWithoutFeedback style={feed.body} onPress={()=>{this.props.navigation.push('Article',{data})}}>
                    <View>
                        <Text style={{color:'black', fontWeight:'600', fontSize:18, marginTop:'2%'}}>
                            {data.title}
                        </Text>
                        <Text style={{color:'#555', fontWeight:'500', fontSize:13, marginTop:'2%'}}>
                            {data.description}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <View style={feed.footer}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='lightbulb'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                        />
                        <Text style={{color:'#555', fontWeight:'700', fontSize:13, marginLeft:'8%'}}>1.0k</Text>
                    </View>
                    
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='comments'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                        />
                        <Text style={{color:'#555', fontWeight:'700', fontSize:13, marginLeft:'8%'}}>1.0k</Text>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='share'
                            type='foundation'
                            color='gray'
                            size={18}
                        />
                        <Text style={{color:'#555', fontWeight:'600', fontSize:13, marginLeft:'8%'}}>Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='bookmark'
                            type='foundation'
                            color='gray'
                            size={18}
                        />
                        <Text style={{color:'#555', fontWeight:'600', fontSize:13, marginLeft:'8%'}}>Bookmark</Text>
                    </TouchableOpacity>
                    
                </View>

            </View>
        )
    }

    feedItemV2 = (data, index) =>{
        return(
            <TouchableWithoutFeedback onPress={()=>this.props.navigation.push('Article Promotion',{data})}>
                <View style={feed2.container}>
                    <View style={feed2.header}>
                        <View style={{flexDirection:'row'}}>
                            <View>
                                <Text style={{color:'#444', fontWeight:'600', fontSize:15}}>{data.ownerName}</Text>
                                <Text style={{color:'gray', fontWeight:'400', fontSize:13}}>Posted 24 hours ago</Text>
                            </View>
                        </View>
                        
                        <View style={{paddingVertical:'2%',paddingHorizontal:'5%', backgroundColor:'#0279D2',borderRadius:20}}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:12}}>LOOKING FOR PROJECT</Text>
                        </View>
                    </View>

                    <View style={feed2.body}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'purple', marginRight:'3%'}}
                            size={60}
                        />
                        <View>
                            <Text style={{color:'#555', fontWeight:'700', fontSize:14}}>Role: {data.role}</Text>
                            <Text style={{color:'#555', fontWeight:'700', fontSize:14}}>Description: {data.description}</Text>
                        </View>

                    </View>

                    <View style={feed2.footer}>
                        <TouchableOpacity style={{paddingVertical:'5%',paddingHorizontal:'5%', width:'50%', alignItems:'center', borderRightWidth:0.5, borderColor:"#ddd"}}>
                            <Text style={{color:'#333', fontWeight:'700', fontSize:14}}>I HAVE A PROJECT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingVertical:'5%',paddingHorizontal:'5%', width:'50%', alignItems:'center'}}>
                            <Text style={{color:'#333', fontWeight:'700', fontSize:14}}>SEND A MESSAGE</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </TouchableWithoutFeedback>
        )
        
    }

    feedItemV3 = (data, index) =>{
        return(
            <TouchableWithoutFeedback onPress={()=>this.props.navigation.push('Article Promotion',{data})}>
                <View style={feed2.container}>
                    <View style={feed2.header}>
                        <View style={{flexDirection:'row'}}>
                            <View>
                                <Text style={{color:'#444', fontWeight:'600', fontSize:15}}>{data.ownerName}</Text>
                                <Text style={{color:'gray', fontWeight:'400', fontSize:13}}>Posted 24 hours ago</Text>
                            </View>
                        </View>
                        
                        <View style={{paddingVertical:'2%',paddingHorizontal:'5%', backgroundColor:'#0279D2',borderRadius:20}}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:12}}>LOOKING FOR TEAMMATE</Text>
                        </View>
                    </View>

                    <View style={feed2.body}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'purple', marginRight:'3%'}}
                            size={60}
                        />
                        <View>
                            <Text style={{color:'#555', fontWeight:'700', fontSize:14}}>Role: {data.requestRole}</Text>
                            <Text style={{color:'#555', fontWeight:'700', fontSize:14}}>Description: {data.requestDescription}</Text>
                        </View>

                    </View>

                    <View style={feed2.footer}>
                        <TouchableOpacity style={{paddingVertical:'5%',paddingHorizontal:'5%', width:'50%', alignItems:'center', borderRightWidth:0.5, borderColor:"#ddd"}}>
                            <Text style={{color:'#333', fontWeight:'700', fontSize:14}}>I CAN HELP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingVertical:'5%',paddingHorizontal:'5%', width:'50%', alignItems:'center'}}>
                            <Text style={{color:'#333', fontWeight:'700', fontSize:14}}>SEND A MESSAGE</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </TouchableWithoutFeedback>
        )
        
    }

    render(){
        return(
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'blue'}}
                            onPress={()=>this.props.route.params.openControlPanel()}
                        />
                        <TouchableOpacity style={styles.searchBar}>
                            <Icon
                                name='magnifying-glass'
                                type='foundation'
                                color='gray'
                                size={18}
                            />
                            <Text style={{color:'gray', fontWeight:'500', marginLeft:'4%'}}>Search</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.notification} onPress={()=>this.props.navigation.push('Notification', {})}>
                            <Icon
                                name='bell'
                                type='font-awesome'
                                color='#F7CF3A'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.feed}
                        renderItem={({item, index}) => this.chooseFeedItem(item, index)}
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
        padding:'2.5%',
        flexDirection:"row",
        justifyContent:"space-between",
    },

    searchBar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#F1F2F4',
        paddingHorizontal:'3.5%',
        paddingVertical:'2%',
        width:'78%',
        borderRadius:5
    },

    notification:{
        justifyContent:'center',
        alignItems:'center'
    }
  });

  const feed = StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingVertical:'2%',
        paddingHorizontal:'4%',
        marginTop:'2%'
    },

    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },

    footer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:"3%"
    }
  });

  const feed2 = StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingTop:'2%',
        marginTop:'2%'
    },

    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:'4%',
    },

    footer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:"3%",
        borderTopWidth:0.5,
        borderColor:'#ddd',

    },

    body:{
        flexDirection:'row',
        marginVertical:'5%',
        paddingHorizontal:'4%',
        
    }
  });