import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import firebase from 'firebase'
import DataManager from '../../server/DataManager';

export default class Profile extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            tabViewIndex: 1,
            routes: [{ key: 'posts', title: 'post' },{ key: 'activities', title: 'activities' },{ key: 'contacts', title: 'contacts' }],
            user:{
                posts: []
            }
        }
    }

    componentDidMount(){
        DataManager.getUserInfo().then(user =>{
            this.setState({user: user.data()})
        })
        
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

    renderFriend = (data, index) =>{
        return(
            <TouchableOpacity style={styles.friend}>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Avatar
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        containerStyle={{backgroundColor:'blue'}}
                    />
                    <View>
                        <Text style={{color:'black', fontWeight:'600', fontSize:12, marginLeft:'5%'}}>{data.ownerName}</Text>
                        <Text style={{color:'#333', fontWeight:'500', fontSize:14, marginLeft:'5%'}}>{data.content}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:'3%'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='lightbulb'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                        />
                        <Text style={{color:'#555', fontWeight:'700', fontSize:13, marginLeft:'8%'}}>1.0k</Text>
                    </View>
                    <Text style={{color:'gray', fontWeight:'500', fontSize:12}}>Posted 10 hours ago</Text>

                </View>
            </TouchableOpacity>
        )
    }

    postsRoute = () => (
        <FlatList
            data={this.state.user.posts}
            renderItem={({item, index}) => this.feedItemV1(item, index)}
        />
    );
      
    activitiesRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }} />
    );

    contactsRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }} />
    );
    
    renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'blue', color:'black' }}
          style={{ backgroundColor: 'white', color:'black', borderTopWidth:0.4, borderColor:'#ddd' }}
          labelStyle={{fontSize:13, fontWeight:'600'}}
          tabStyle={{color:'black'}}
          contentContainerStyle={{color:'black'}}
          activeColor='black'
          inactiveColor='black'
        />
    );

    renderScene = SceneMap({
        posts: this.postsRoute,
        activities: this.activitiesRoute,
        contacts: this.contactsRoute
    });

    render(){
        return(
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    
                    <View style={styles.header}>
                        <Icon
                            name='ellipsis-h'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                            containerStyle={{alignSelf:'flex-end'}}
                        />
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            
                            containerStyle={{backgroundColor:'gray', borderWidth:5, padding:'2%', borderColor:'white', shadowOpacity:0.5, shadowOffset:{width:1, height:1}}}
                            size={120}
                        />
                        <Text style={{color:'black', fontWeight:'600', fontSize:27, marginTop:'5%'}}>Jason Zhao</Text>
                        
                        
                        <Text style={{color:'#666', fontWeight:'500', fontSize:12}}>204 points / 1 year / 10 projects</Text>
                        <View style={styles.jobIconView}>
                            <TouchableOpacity style={styles.jobIcon}>
                                <Icon
                                    name='code'
                                    type='font-awesome-5'
                                    color='white'
                                    size={20}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.jobIcon}>
                                <Icon
                                    name='palette'
                                    type='font-awesome-5'
                                    color='white'
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>

                        
                    </View>

                    <TabView
                        navigationState={{ 
                            index: this.state.tabViewIndex,
                            routes: this.state.routes
                            }}
                        renderScene={this.renderScene}
                        onIndexChange = {(i)=>this.setState({tabViewIndex: i})}
                        renderTabBar={this.renderTabBar}
                        
                        style={{backgroundColor:'white'}}
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
        alignItems:'center'
    },

    editButton:{
        backgroundColor:"#9400D3",
        width:'90%',
        padding:'1.5%',
        borderRadius:30,
        alignItems:'center',
        marginTop:'5%'
    },

    jobIconView:{
        paddingTop:'5%',
        paddingHorizontal:'3%',
        flexDirection:'row',
        alignItems:'flex-start',
        width:'100%'
    },

    jobIcon:{
        paddingVertical:"3.5%",
        paddingHorizontal:'3%',
        backgroundColor:'red',
        borderRadius:10,
        marginRight:"3.5%"
    },

    friend:{
        backgroundColor:'white',
        padding:'4%',
        borderBottomWidth:0.4,
        borderColor:'#eee'
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