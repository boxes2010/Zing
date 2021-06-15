import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Image, Keyboard, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import DataManager from '../../server/DataManager';
import firebase from 'firebase'
import { TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal'


export default class Article extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            images: [],
            commentText: '',
            connectModalVisible: false,
            connectMessageText:'',
        }
    }

    data = this.props.route.params.data

    componentDidMount(){
        //console.log(this.data)
        numImages = this.data.images.length
        for(var i = 0; i < numImages; i++){
            DataManager.getDownloadLink(this.data.postID, i, this.data.owner).then(result =>{
                var newImages = this.state.images
                newImages.push(result)
                this.setState({images: newImages})
            })
        }
    }


    renderImageItem = (item) =>{
        return(
            <TouchableOpacity style={styles.imageView}>
                <Image
                    style={{width:null, height: null,  resizeMode:'contain', flex:1, borderRadius:20}}
                    source={{
                        uri: item,
                      }}
                />
            </TouchableOpacity>
        )
    }

    renderLinkItem = () =>{
        return(
            <TouchableOpacity style={styles.linkStyle}>
                <Text>https://www.npmjs.com/package/@flyerhq/react-native-link-preview</Text>
            </TouchableOpacity>
        )
    }

    renderCommentItem = () =>{
        return(
            <TouchableOpacity style={styles.commentBox}>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Avatar
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        containerStyle={{backgroundColor:'blue'}}
                    />
                    <View>
                        <Text style={{color:'black', fontWeight:'600', fontSize:12, marginLeft:'5%'}}>PandaRussia</Text>
                        <Text style={{color:'#333', fontWeight:'500', fontSize:14, marginLeft:'5%'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum odio non interdum fermentum. Sed mattis sapien in quam venenatis, at pulvinar lorem posuere. </Text>
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
                            <Text style={{color:'#666', fontWeight:'600', fontSize:12}}>{this.data.ownerName}</Text>
                            <Text style={{color:'gray', fontWeight:'400', fontSize:10}}>Posted 24 hours ago</Text>
                        </View>
                    </View>
                    <View style={{paddingVertical:'2%',paddingHorizontal:'5%', backgroundColor:'#0279D2',borderRadius:20}}>
                        <Text style={{color:'white', fontWeight:'700', fontSize:12}}>PROJECT IDEA</Text>
                    </View>
                    
                </View>

                <View style={feed.body}>
                    <Text style={{color:'black', fontWeight:'600', fontSize:18, marginTop:'2%'}}>
                        {this.data.title}
                    </Text>
                    <Text style={{color:'#555', fontWeight:'500', fontSize:13, marginTop:'2%'}}>
                        {this.data.description}
                    </Text>

                    <Text style={{color:'#555', fontWeight:'700', fontSize:12, marginTop:'4%'}}>IMAGES:</Text>
                    <FlatList
                        horizontal={true}
                        data={this.state.images}
                        renderItem={({item}) => this.renderImageItem(item)}
                    />
                    <TouchableOpacity style={styles.linkStyle} onPress={()=>this.props.navigation.push('Link', {data: this.data})}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Icon
                                name='link'
                                type='font-awesome-5'
                                color='gray'
                                size={15}
                                style={{marginRight:'5%'}}
                            />
                            <Text style={{color:'#555', fontWeight:'700', fontSize:15}}>LINKS</Text>
                        </View>
                
                        <Icon
                            name='chevron-right'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', backgroundColor:'#E1D4FD', padding:'4%', marginTop:'3%', borderRadius: 5}} onPress={()=>this.setState({connectModalVisible:true})}>
                        <Icon
                            name='link'
                            type='font-awesome-5'
                            color='black'
                            size={15}
                            style={{marginRight:'5%'}}
                        />
                        <Text style={{color:'#555', fontWeight:'700', fontSize:15, color:'black'}}>Connect With {this.data.ownerName}</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style={feed.footer}>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={()=>DataManager.likePost(this.data.postID)}>
                        <Icon
                            name='lightbulb'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                        />
                        <Text style={{color:'#555', fontWeight:'700', fontSize:13, marginLeft:'13%'}}>{this.data.numLikes}</Text>
                    </TouchableOpacity>
                    
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
            
                <SafeAreaView style={{backgroundColor:'white'}}>
                    <Modal isVisible={this.state.connectModalVisible} animationIn='fadeIn' animationOut="fadeOut" hasBackdrop={false} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start'}}>
                        <SafeAreaView style={{backgroundColor:'#E1D4FD', flex:1, width: '100%', padding:'5%'}}>
                            <View style={styles.headerModal}>
                                <Icon
                                    name='times'
                                    type='font-awesome-5'
                                    color='gray'
                                    size={18}
                                    onPress={()=> this.setState({connectModalVisible:false})}
                                />
                                <TouchableOpacity style={{paddingVertical:'2%',paddingHorizontal:'5%', backgroundColor:'#0279D2',borderRadius:5}} onPress={()=> DataManager.connect(this.data.postID, this.state.connectMessageText, this.data.owner, this.data.ownerName).then(res => this.setState({connectModalVisible: false}))}>
                                    <Text style={{color:'white', fontWeight:'700', fontSize:12}}>SEND</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#E1D4FD', padding:'4%', marginTop:'3%', borderRadius: 5}}>
                                <Icon
                                    name='link'
                                    type='font-awesome-5'
                                    color='black'
                                    size={15}
                                    style={{marginRight:'5%'}}
                                />
                                <Text style={{color:'#555', fontWeight:'700', fontSize:15, color:'black'}}>Connect With {this.data.ownerName}</Text>
                            </View>
                            <TextInput 
                                style={{color:'#444', fontWeight:'600', fontSize:17, backgroundColor:"white", marginHorizontal:"5%", borderRadius:5, padding:'5%', alignItems:'center', justifyContent:'center', paddingTop:'5%'}}
                                placeholder="Write a message..."
                                onChangeText={(text)=>this.setState({connectMessageText:text})}
                                multiline
                                
                            />
                        </SafeAreaView>
                    </Modal>

                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

                    <View style={styles.header}>
                        <Icon
                            name='arrow-left'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                            onPress={()=>this.props.navigation.pop()}
                        />
                        <TouchableOpacity style={styles.notification}>
                            <Icon
                                name='bookmark'
                                type='font-awesome'
                                color='#F7CF3A'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{backgroundColor:'#F1F2F4'}}>
                        {this.feedItemV1()}
                        <View style={styles.commentSection} onPress={()=>{}}>
                            <Text style={{color:'#555', fontWeight:'600', fontSize:13, marginVertical:'3%', marginLeft:'5%'}}>Activity (32)</Text>
                            <View style={styles.commentBox}>
                                <View style={{flexDirection: 'row', alignItems:'flex-start', width:'100%', padding:'5%', backgroundColor:'white'}}>
                                    <Avatar
                                        rounded
                                        icon={{name: 'user', type: 'font-awesome'}}
                                        containerStyle={{backgroundColor:'blue'}}
                                    />
                                    <View>
                                        <Text style={{color:'black', fontWeight:'600', fontSize:12, marginLeft:15}}>{firebase.auth().currentUser.displayName}</Text>
                                        <TextInput 
                                            style={{color:'#777', fontWeight:'500', fontSize:14, marginLeft:15, marginTop:5}}
                                            placeholder="Add a comment..."
                                            onChangeText={(text)=>this.setState({commentText:text})}
                                            multiline
                                            returnKeyType='done'
                                            onSubmitEditing={()=>DataManager.comment(this.data.postID, this.state.commentText)}
                                        />
                                    </View>
                                </View>
                                
                            </View>
                            {this.renderCommentItem()}
                            {this.renderCommentItem()}
                        </View>
                    </ScrollView>

                    </KeyboardAvoidingView>
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
        paddingHorizontal:'3.5%',
        paddingVertical:'2.5%',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
    },

    headerModal:{
        paddingHorizontal:'3.5%',
        paddingTop:'2.5%',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
    },

    notification:{
        justifyContent:'center',
        alignItems:'center'
    },

    imageScrollView:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:'red'
    },

    imageView:{
        width:100,
        height:100,
        paddingRight:'10%',
        borderRadius:50
    },

    linkStyle:{
        width:'100%',
        borderRadius:5,
        paddingHorizontal:'8%',
        backgroundColor:'#F1F2F4',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:'5%',
        marginTop:'5%',
        flexDirection:'row'
    },

    commentSection:{
        
    },

    commentBox:{
        backgroundColor:'white',
        padding:'4%',
        borderBottomWidth:0.4,
        borderColor:'#eee'
    }
  });

const feed = StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingHorizontal:'4%',
        paddingVertical:'3%'
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