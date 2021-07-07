import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Image, Keyboard, TextInput, KeyboardAvoidingView, Platform, InputAccessoryView, Dimensions } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import DataManager from '../../server/DataManager';
import firebase from 'firebase'
import { TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal'
import Carousel, { Pagination }  from 'react-native-snap-carousel';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Article extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            images: [],
            commentText: '',
            connectModalVisible: false,
            connectMessageText:'',
            activeSlide: 0,
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

    renderCommentItem = (data, index) =>{
        return(
            <TouchableOpacity style={styles.commentBox}>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Avatar
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        containerStyle={{backgroundColor:'blue'}}
                    />
                    <View>
                        <Text style={{color:'black', fontWeight:'500', fontSize:12, marginLeft:'15%'}}>{data.ownerName}</Text>
                        <Text style={{color:'#555', fontWeight:'500', fontSize:12, marginLeft:'15%'}}>{data.content}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:'3%'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='lightbulb'
                            type='font-awesome-5'
                            color='gray'
                            size={15}
                        />
                        <Text style={{color:'#555', fontWeight:'400', fontSize:13, marginLeft:'12%'}}>1.0k</Text>
                    </View>
                    <Text style={{color:'gray', fontWeight:'400', fontSize:12}}>Posted 10 hours ago</Text>
                </View>
            </TouchableOpacity>
        )
    }

    feedItemV1 = () =>{
        return(
            <View style={feed.container}>

                <View style={feed.body}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={this.state.images}
                            renderItem={({item}) => this.renderImageItem(item)}
                            sliderWidth = {width}
                            itemWidth = {width}
                            layout = {'default'}
                            layoutCardOffset = {0}
                            loop={false}
                            style={{alignSelf:'center', alignItems:'center'}}
                            contentContainerCustomStyle={{alignSelf:'center', alignItems:'center'}}
                            containerStyle={{alignSelf:"center", alignItems:"center"}}
                            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                        />

                        <Pagination
                            dotsLength={this.state.images.length}
                            activeDotIndex={this.state.activeSlide}
                            containerStyle={{ paddingTop: "3%", paddingBottom:"5%" }}
                            dotStyle={{
                                width: 7,
                                height: 7,
                                borderRadius: 5,
                                marginHorizontal: 8,
                                backgroundColor: 'black'
                            }}
                            inactiveDotStyle={{
                                // Define styles for inactive dots here
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </View>

                    <Text style={{color:'black', fontWeight:'500', fontSize:23, marginHorizontal:'7%', marginBottom:"5%"}}>
                        {this.data.title}
                    </Text>

                    <Text style={{color:'#444', fontWeight:'400', fontSize:16, marginHorizontal:'7%'}}>
                        {this.data.description}
                    </Text>

                    <TouchableOpacity style={styles.linkStyle} onPress={()=>this.props.navigation.push('Link', {data: this.data})}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Icon
                                name='link'
                                type='font-awesome-5'
                                color='gray'
                                size={13}
                                style={{marginRight:'20%'}}
                            />
                            <Text style={{color:'black', fontWeight:'400', fontSize:15}}>LINKS</Text>
                        </View>
                
                        <Icon
                            name='chevron-right'
                            type='font-awesome-5'
                            color='gray'
                            size={13}
                        />
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
                        <Text style={{color:'#555', fontWeight:'500', fontSize:13, marginLeft:'13%'}}>{this.data.numLikes}</Text>
                    </TouchableOpacity>
                    
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='comments'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                        />
                        <Text style={{color:'#555', fontWeight:'500', fontSize:13, marginLeft:'8%'}}>{this.data.numActivities}</Text>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='share'
                            type='foundation'
                            color='gray'
                            size={18}
                        />
                        <Text style={{color:'#555', fontWeight:'500', fontSize:13, marginLeft:'8%'}}>Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name='bookmark'
                            type='foundation'
                            color='gray'
                            size={18}
                        />
                        <Text style={{color:'#555', fontWeight:'500', fontSize:13, marginLeft:'8%'}}>Bookmark</Text>
                    </TouchableOpacity>
                    
                </View>

            </View>
        )
    }

    renderFloater = () =>{
        return(
            <View style={feed.header}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Avatar
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        containerStyle={{backgroundColor:'purple', marginRight:'7%'}}
                    />
                    <View>
                        <Text style={{color:'black', fontWeight:'400', fontSize:15}}>{this.data.ownerName}</Text>
                        <Text style={{color:'gray', fontWeight:'400', fontSize:9}}>Posted 24 hours ago</Text>
                    </View>
                </View>
                <TouchableOpacity style={{paddingVertical:'3%',paddingHorizontal:'7%', backgroundColor:'#0279D2',borderRadius:20}} onPress={()=>this.setState({connectModalVisible:true})}>
                    <Text style={{color:'white', fontWeight:'600', fontSize:14}}>Connect</Text>
                </TouchableOpacity>
                
            </View>
        )
    }

    render(){
        return(
            <SafeAreaView style={{backgroundColor:'#FAFAFA'}}>
                <InputAccessoryView nativeID="Next">
                    <View style={styles.accessory}>
                        <TouchableOpacity style={{paddingVertical:'2%',paddingHorizontal:'5%', backgroundColor:'#0279D2',borderRadius:20}} onPress={()=>{DataManager.comment(this.data.postID, this.state.commentText); Keyboard.dismiss()}}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:12}}>COMMENT</Text>
                        </TouchableOpacity>
                    </View >
                </InputAccessoryView>
                
                <Modal isVisible={this.state.connectModalVisible} animationIn='fadeIn' animationOut="fadeOut" hasBackdrop={true} backdropOpacity={0.7} backgroundColor='black' style={{marginHorizontal:'5%', alignItems:'flex-start',  justifyContent:'flex-start', marginVertical:'35%', paddingVertical:"0%", borderRadius:20}}>
                    <SafeAreaView style={{backgroundColor:'white', flex:1, width: '100%', padding:'5%', borderRadius:20, justifyContent:'space-between'}}>
                        <InputAccessoryView nativeID="Done">
                            <View style={styles.accessory}>
                                <TouchableOpacity style={{paddingVertical:'2%',paddingHorizontal:'5%', backgroundColor:'#0279D2',borderRadius:20}} onPress={()=>{DataManager.connect(this.data.postID, this.state.connectMessageText, this.data.owner, this.data.ownerName); Keyboard.dismiss(); this.setState({connectMessageText: '', connectModalVisible:false})}}>
                                    <Text style={{color:'white', fontWeight:'700', fontSize:12}}>CONNECT</Text>
                                </TouchableOpacity>
                            </View >
                        </InputAccessoryView>
                        
                        <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'white', padding:'4%', borderRadius: 5, borderRadius: 20}}>
                            <Icon
                                name='link'
                                type='font-awesome-5'
                                color='black'
                                size={15}
                                style={{marginRight:'5%'}}
                            />
                            <Text style={{color:'#555', fontWeight:'500', fontSize:15, color:'black'}}>Connect With {this.data.ownerName}</Text>
                        </View>

                        <TextInput 
                            style={{color:'#444', fontWeight:'400', fontSize:17, backgroundColor:"white", marginHorizontal:"5%", borderRadius:5, padding:'5%', alignItems:'center', justifyContent:'center', paddingTop:'5%'}}
                            placeholder="Write a message..."
                            onChangeText={(text)=>this.setState({connectMessageText:text})}
                            multiline
                            inputAccessoryViewID="Done"
                            autoCorrect={false}
                            maxLength={200}
                        />

                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity style={{backgroundColor:"#0279D2", paddingVertical:"4%", paddingHorizontal:'30%', justifyContent:'center', borderRadius:50, marginTop:'10%', marginHorizontal:'10%', width: '90%'}} onPress={()=> DataManager.connect(this.data.postID, this.state.connectMessageText, this.data.owner, this.data.ownerName).then(res => this.setState({connectModalVisible: false}))}>
                                <Text style={{color:'white', fontWeight:'400', fontSize:15, alignSelf:'center'}}>Send Request</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:"white", paddingVertical:"4%", paddingHorizontal:'30%', justifyContent:'center', borderRadius:50, marginVertical:'5%', marginHorizontal:'10%', width: '90%', borderWidth: 0.5, borderColor:'#ccc'}} onPress={()=>this.setState({connectModalVisible: false})}>
                                <Text style={{color:'gray', fontWeight:'400', fontSize:15, alignSelf:'center'}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        
                    </SafeAreaView>
                </Modal>

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <View style={styles.header}>
                    <View style={{flexDirection:'row', alignItems:"center"}}>
                        <Icon
                            name='chevron-left'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                            onPress={()=>this.props.navigation.pop()}
                        />
                        <Text style={{color:'black', fontWeight:'400', marginLeft:'15%', fontSize:15}}>Project Idea</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.notification}>
                        <Icon
                            name='bookmark'
                            type='font-awesome'
                            color='#F7CF3A'
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{backgroundColor:'#FAFAFA', height: '93%'}}>
                    {this.feedItemV1()}
                    <View style={styles.commentSection} onPress={()=>{}}>
                        <Text style={{color:'#555', fontWeight:'600', fontSize:13, marginVertical:'3%', marginLeft:'5%'}}>Activity ({this.data.numActivities})</Text>
                        <View style={styles.commentBox}>
                            <View style={{flexDirection: 'row', alignItems:'flex-start', width:'100%', backgroundColor:'white'}}>
                                <Avatar
                                    rounded
                                    icon={{name: 'user', type: 'font-awesome'}}
                                    containerStyle={{backgroundColor:'blue'}}
                                />
                                <View>
                                    <Text style={{color:'black', fontWeight:'500', fontSize:12, marginLeft:15}}>{firebase.auth().currentUser.displayName}</Text>
                                    <TextInput 
                                        style={{color:'#777', fontWeight:'500', fontSize:14, marginLeft:15, marginTop:2.5}}
                                        placeholder="Add a comment..."
                                        onChangeText={(text)=>this.setState({commentText:text})}
                                        multiline
                                        inputAccessoryViewID="Next"
                                        autoCorrect={false}
                                    />
                                    
                                </View>
                            </View>
                            
                        </View>
                        <FlatList
                            data={this.data.activities}
                            renderItem={({item, index}) => this.renderCommentItem(item, index)}
                        />
                    </View>

                    <View style={{height: 100}}/>
                    
                </ScrollView>
                {this.renderFloater()}
            

                </KeyboardAvoidingView>
            </SafeAreaView>
            
            
        )
    }

}

const styles = StyleSheet.create({
    accessory: {
        width: Dimensions.get('window').width,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 8
    },

    safeArea: {
      flex: 1,
      backgroundColor: '#FAFAFA',
    },

    container:{
        flex:1,
        backgroundColor:'#FAFAFA',
    },

    header:{
        backgroundColor:'#FAFAFA',
        paddingHorizontal:'6%',
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
        width:width ,
        height:height* 0.3,
        borderRadius:50,
    },

    linkStyle:{
        marginHorizontal:'7%',
        marginBottom:'5%',
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
        backgroundColor:'#FAFAFA',
        paddingHorizontal:'0%',
        paddingVertical:'3%'
    },

    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        position:'absolute',
        bottom:15,
        backgroundColor:'white',
        width:'100%',
        marginHorizontal:"10%",
        alignSelf:'center',
        paddingHorizontal:'4%',
        paddingVertical:'4%',
        borderRadius:8,
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height: 30.0
        }
    },

    footer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center'
    }
  });