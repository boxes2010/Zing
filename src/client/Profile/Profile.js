import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';

export default class Profile extends React.Component{

    feedItemV1 = () =>{
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
                            <Text style={{color:'#666', fontWeight:'600', fontSize:12}}>PandaRussia</Text>
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

                <View style={feed.body}>
                    <Text style={{color:'black', fontWeight:'600', fontSize:18, marginTop:'2%'}}>
                        What is the best thing you came across on the internet today
                    </Text>
                    <Text style={{color:'#555', fontWeight:'500', fontSize:13, marginTop:'2%'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute.
                    </Text>
                </View>

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

                    {this.feedItemV1()}

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