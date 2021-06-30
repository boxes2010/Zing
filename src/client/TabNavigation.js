import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedNavigation from './Feed/FeedStackNavigation'
import Profile from './Profile/ProfileNavigation'
import {Icon, Avatar, Badge} from 'react-native-elements'
import { Touchable } from 'react-native';
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-native';
import DataManager from '../server/DataManager'
import * as ImagePicker from 'expo-image-picker'
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import Drawer from 'react-native-drawer'
import firebase from 'firebase'
import Message from './Message/MessageNavigation'
const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation, showPostEditor}) {
    return (
      <View style={{ flexDirection: 'row',backgroundColor:"white",justifyContent:"center",alignItems:"center", paddingVertical:'4%', borderTopWidth: 0.3, borderColor: "#ccc", height: '8%' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          var iconName = "home";
          if(label === "Main"){
            iconName = "home"
          }else if(label ==="Profile"){
            iconName = "user"
          }else if(label ==="Article"){
            iconName = "user"
          }else if(label === "button"){
            return(
                <TouchableOpacity onPress={()=>showPostEditor()}>
                    <Avatar
                        rounded
                        icon={{name: 'plus', type: 'font-awesome'}}
                        containerStyle={{backgroundColor:'#2B57C6', shadowOpacity:0.4, shadowOffset:{width:0.5, height:0.5}}}
                    />
                </TouchableOpacity>
            )
          }
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems:"center" }}
            >
              <Icon
                name={iconName}
                type='font-awesome-5'
                color='gray'
                size={22}
              />
              
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

export default class TabNavigation extends React.Component{

    constructor(props){
        super(props)
        this.state={
            chooseTypeModalVisible: false,
            postModalVisible: false,
            imageLinkModalVisible: false,
            promotionModalVisible: false,
            requestModalVisible: false,
            imageLinkPromotionModalVisible: false,
            imageLinkRequestModalVisible: false,

            images:['picker'],
            linkText:'',
            links:[],
            titleText: '',
            descriptionText: '',
            userInfo: '',
            postType:'',
            role:'',
            selfDescription:'',

            requestRole:'',
            requestDescription: '',

        }
    }

    authSignOut = () => {
        firebase.auth().signOut().then(() => {
            console.log("Signed Out")
          }).catch((error) => {
            // An error happened.
          });
    }

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    createPost = () =>{
        var data = {
            owner: DataManager.getUserID(),
            timePosted: Date.now(),
            title: this.state.titleText,
            description: this.state.descriptionText,
            images: this.state.images,
            links: this.state.links,
            numLikes: 1,
            numActivites: 0,
            ownerName: firebase.auth().currentUser.displayName,
            postType:'idea'
        }
        DataManager.createPost(data)

        this.setState({
            chooseTypeModalVisible: false,
            postModalVisible: false,
            imageLinkModalVisible: false,
            promotionModalVisible: false,
            requestModalVisible: false,
            imageLinkPromotionModalVisible: false,
            imageLinkRequestModalVisible: false,

            images:['picker'],
            linkText:'',
            links:[],
            titleText: '',
            descriptionText: '',
            userInfo: '',
            postType:'',
            role:'',
            selfDescription:'',

            requestRole:'',
            requestDescription: '',
        })
    }

    createPromotion = () =>{
        var data = {
            owner: DataManager.getUserID(),
            timePosted: Date.now(),
            role: this.state.role,
            selfDescription: this.state.descriptionText,
            images: this.state.images,
            links: this.state.links,
            numActivites: 0,
            ownerName: firebase.auth().currentUser.displayName,
            postType:'promotion'
        }
        DataManager.createPost(data)

        this.setState({
            chooseTypeModalVisible: false,
            postModalVisible: false,
            imageLinkModalVisible: false,
            promotionModalVisible: false,
            requestModalVisible: false,
            imageLinkPromotionModalVisible: false,
            imageLinkRequestModalVisible: false,

            images:['picker'],
            linkText:'',
            links:[],
            titleText: '',
            descriptionText: '',
            userInfo: '',
            postType:'',
            role:'',
            selfDescription:'',

            requestRole:'',
            requestDescription: '',
        })
    }

    createRequest = () =>{
        var data = {
            owner: DataManager.getUserID(),
            timePosted: Date.now(),
            requestRole: this.state.requestRole,
            requestDescription: this.state.requestDescription,
            images: this.state.images,
            links: this.state.links,
            numActivites: 0,
            ownerName: firebase.auth().currentUser.displayName,
            postType:'request'
        }
        DataManager.createPost(data)

        this.setState({
            chooseTypeModalVisible: false,
            postModalVisible: false,
            imageLinkModalVisible: false,
            promotionModalVisible: false,
            requestModalVisible: false,
            imageLinkPromotionModalVisible: false,
            imageLinkRequestModalVisible: false,

            images:['picker'],
            linkText:'',
            links:[],
            titleText: '',
            descriptionText: '',
            userInfo: '',
            postType:'',
            role:'',
            selfDescription:'',

            requestRole:'',
            requestDescription: '',
        })
    }

    addLink = () =>{
        var newLinks = this.state.links
        newLinks.push(this.state.linkText)
        this.setState({links: newLinks})
    }

    removeLink = (index) =>{
        var newLinks = this.state.links
        newLinks.splice(index, 1)
        this.setState({links: newLinks})
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            var newImages = this.state.images
            newImages.push(result.uri)
            this.setState({images: newImages})
        }
    };

    removeImage = (index) =>{
        var newImages = this.state.images
        newImages.splice(index, 1)
        this.setState({images:newImages})
    }

    renderLinkItem = (data, index) =>{
        return(
            <View style={{flexDirection:'row', width:'100%'}}>
                <Icon
                    name='x'
                    type='foundation'
                    color='black'
                    size={18}
                    onPress={()=>this.removeLink(index)}
                />
                <LinkPreview 
                    text={data}
                    containerStyle={modal.linkStyle}
                />
            </View>

        )
    }

    renderImageItem = (data, index) =>{
        if(data === 'picker'){
            return(
                <View>
                    <Icon
                        name='x'
                        type='foundation'
                        color='white'
                        size={18}
                        onPress={()=>{}}
                    />
                    <TouchableOpacity style={styles.imageView} onPress={()=>this.pickImage()}>
                        <Image
                            style={{width:null, height: null,  resizeMode:'contain', flex:1, borderRadius:20}}
                            source={require('../../assets/icon.png')}
                        />
                    </TouchableOpacity>
                </View>
                
            )
        }else{
            return(
                <View>
                    <Icon
                        name='x'
                        type='foundation'
                        color='black'
                        size={18}
                        onPress={()=>this.removeImage(index)}
                    />
                    <View style={styles.imageView}>
                        <Image
                            style={{width:null, height: null,  resizeMode:'cover', flex:1, borderRadius:20}}
                            source={{uri: data}}
                        />
                    </View>
                </View>
                
            )
        }
    }

    renderImageLinkModal = () =>{
        return(
            <SafeAreaView style={modal.container}>
                <View style={modal.header}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Icon
                            name="arrow-left"
                            type='font-awesome-5'
                            color='gray'
                            size={20}
                            onPress={()=>this.setState({imageLinkModalVisible: false})}
                        />
                        <TouchableOpacity style={modal.postButton} onPress={()=>this.createPost()}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:15}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:'3%'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'purple'}}
                        />
                        <Text style={{color:'#333', fontWeight:'700', fontSize:15, marginLeft:'2%'}}>{firebase.auth().currentUser.displayName}</Text>
                    </View>
                    <View style={{ justifyContent:'space-between', marginTop:'5%', backgroundColor:"#F1F2F4", padding:'4%', borderRadius:8}}>
                        
                        <Text style={{color:'black', fontWeight:'600', fontSize:15}}>{this.state.titleText}</Text>
                        <Text style={{color:'#444', fontWeight:'400', fontSize:12, marginTop: '1%'}}>{this.state.descriptionText}</Text>
                    </View>
                    
                </View>

                <View style={modal.body}>
                    <Text style={{color:'#555', fontWeight:'700', fontSize:12, marginBottom:'2%'}}>ADD IMAGES (OPTIONAL)</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={this.state.images}
                            renderItem={({item, index}) => this.renderImageItem(item, index)}
                            style={{marginBottom:'4%', paddingVertical:'1%'}}
                        />
                    <Text style={{color:'#555', fontWeight:'700', fontSize:12, marginBottom:'2%'}}>ADD LINKS (OPTIONAL)</Text>
                        <TextInput
                            style={modal.textInput}
                            placeholder="https://www.google.com/"
                            onChangeText={(text)=>this.setState({linkText:text})}
                            onSubmitEditing={()=>this.addLink()}
                        />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.links}
                            renderItem={({item, index}) => this.renderLinkItem(item, index)}
                            style={{marginBottom:'4%', paddingVertical:'1%'}}
                        />
                </View>
            </SafeAreaView>
        )
    }

    renderImageLinkModalPromotion = () =>{
        return(
            <SafeAreaView style={modal.container}>
                <View style={modal.header}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Icon
                            name="arrow-left"
                            type='font-awesome-5'
                            color='gray'
                            size={20}
                            onPress={()=>this.setState({imageLinkPromotionModalVisible: false})}
                        />
                        <TouchableOpacity style={modal.postButton} onPress={()=>this.createPromotion()}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:15}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:'3%'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'purple'}}
                        />
                        <Text style={{color:'#333', fontWeight:'700', fontSize:15, marginLeft:'2%'}}>{firebase.auth().currentUser.displayName}</Text>
                    </View>
                    <View style={{ justifyContent:'space-between', marginTop:'5%', backgroundColor:"#F1F2F4", padding:'4%', borderRadius:8}}>
                        
                        <Text style={{color:'black', fontWeight:'600', fontSize:15}}>{this.state.role}</Text>
                        <Text style={{color:'#444', fontWeight:'400', fontSize:12, marginTop: '1%'}}>{this.state.selfDescription}</Text>
                    </View>
                    
                </View>

                <View style={modal.body}>
                    <Text style={{color:'#555', fontWeight:'700', fontSize:12, marginBottom:'2%'}}>ADD IMAGES (OPTIONAL)</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={this.state.images}
                            renderItem={({item, index}) => this.renderImageItem(item, index)}
                            style={{marginBottom:'4%', paddingVertical:'1%'}}
                        />
                    <Text style={{color:'#555', fontWeight:'700', fontSize:12, marginBottom:'2%'}}>ADD LINKS (OPTIONAL)</Text>
                        <TextInput
                            style={modal.textInput}
                            placeholder="https://www.google.com/"
                            onChangeText={(text)=>this.setState({linkText:text})}
                            onSubmitEditing={()=>this.addLink()}
                        />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.links}
                            renderItem={({item, index}) => this.renderLinkItem(item, index)}
                            style={{marginBottom:'4%', paddingVertical:'1%'}}
                        />
                </View>
            </SafeAreaView>
        )
    }

    renderImageLinkModalRequest = () =>{
        return(
            <SafeAreaView style={modal.container}>
                <View style={modal.header}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Icon
                            name="arrow-left"
                            type='font-awesome-5'
                            color='gray'
                            size={20}
                            onPress={()=>this.setState({imageLinkRequestModalVisible: false})}
                        />
                        <TouchableOpacity style={modal.postButton} onPress={()=>this.createRequest()}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:15}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:'3%'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'purple'}}
                        />
                        <Text style={{color:'#333', fontWeight:'700', fontSize:15, marginLeft:'2%'}}>{firebase.auth().currentUser.displayName}</Text>
                    </View>
                    <View style={{ justifyContent:'space-between', marginTop:'5%', backgroundColor:"#F1F2F4", padding:'4%', borderRadius:8}}>
                        
                        <Text style={{color:'black', fontWeight:'600', fontSize:15}}>{this.state.requestRole}</Text>
                        <Text style={{color:'#444', fontWeight:'400', fontSize:12, marginTop: '1%'}}>{this.state.requestDescription}</Text>
                    </View>
                    
                </View>

                <View style={modal.body}>
                    <Text style={{color:'#555', fontWeight:'700', fontSize:12, marginBottom:'2%'}}>ADD IMAGES (OPTIONAL)</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={this.state.images}
                            renderItem={({item, index}) => this.renderImageItem(item, index)}
                            style={{marginBottom:'4%', paddingVertical:'1%'}}
                        />
                    <Text style={{color:'#555', fontWeight:'700', fontSize:12, marginBottom:'2%'}}>ADD LINKS (OPTIONAL)</Text>
                        <TextInput
                            style={modal.textInput}
                            placeholder="https://www.google.com/"
                            onChangeText={(text)=>this.setState({linkText:text})}
                            onSubmitEditing={()=>this.addLink()}
                        />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.links}
                            renderItem={({item, index}) => this.renderLinkItem(item, index)}
                            style={{marginBottom:'4%', paddingVertical:'1%'}}
                        />
                </View>
            </SafeAreaView>
        )
    }

    renderChooseTypeModal = () =>{
        return(
            <SafeAreaView style={{flex:1, width:'100%', alignItems:'center'}}>
                <Modal isVisible={this.state.postModalVisible} animationIn="slideInRight" animationOut="slideOutRight" hasBackdrop={false} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start'}}>
                    {this.renderCreatePostModal()}
                </Modal>
                <Modal isVisible={this.state.promotionModalVisible} animationIn="slideInRight" animationOut="slideOutRight" hasBackdrop={false} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start'}}>
                    {this.renderCreatePromotionModal()}
                </Modal>
                <Modal isVisible={this.state.requestModalVisible} animationIn="slideInRight" animationOut="slideOutRight" hasBackdrop={false} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start'}}>
                    {this.renderCreateRequestModal()}
                </Modal>

                <Icon
                    name='lightbulb'
                    type='font-awesome-5'
                    color='#CCCC00'
                    size={55}
                    style={{marginTop:'13%'}}
                />

                <TouchableOpacity style={{ justifyContent:'space-between', marginTop:'5%', backgroundColor:"#FCEDD2", padding:'4%', borderRadius:8, marginHorizontal:'5%'}} onPress={()=>this.setState({postModalVisible:true})}>
                    <Text style={{color:'#333', fontWeight:'700', fontSize:16, marginBottom:'1%'}}>NEW PROJECT IDEA</Text>
                    <Text style={{color:'#333', fontWeight:'500', fontSize:13}}>Share a project idea and get feedback, validation, and teammates</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ justifyContent:'space-between', marginTop:'5%', backgroundColor:"#D1FAEB", padding:'4%', borderRadius:8, marginHorizontal:'5%'}} onPress={()=>this.setState({promotionModalVisible:true})}>
                    <Text style={{color:'#333', fontWeight:'700', fontSize:16, marginBottom:'1%'}}>NEW PROJECT REQUEST</Text>
                    <Text style={{color:'#333', fontWeight:'500', fontSize:13}}>Let others know you are ready take on a project and promote your skills</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ justifyContent:'space-between', marginTop:'5%', backgroundColor:"#E1D4FD", padding:'4%', borderRadius:8, marginHorizontal:'5%'}} onPress={()=>this.setState({requestModalVisible:true})}>
                    <Text style={{color:'#333', fontWeight:'700', fontSize:16, marginBottom:'1%'}}>NEW HELP REQUEST</Text>
                    <Text style={{color:'#333', fontWeight:'500', fontSize:13}}>Ask in the commmunity for new people to join your project</Text>
                </TouchableOpacity>

                <Avatar
                    rounded
                    icon={{name: 'x', type: 'foundation', alignSelf:'center'}}
                    containerStyle={{backgroundColor:'purple', position:'absolute', bottom: '4%'}}
                    onPress={()=>this.setState({chooseTypeModalVisible: false})}
                    size = {40}
                />

            </SafeAreaView>
        )
        
    }

    renderCreatePostModal = () =>{
        return(
            <SafeAreaView style={modal.container}>
                <Modal isVisible={this.state.imageLinkModalVisible} animationIn="slideInRight" animationOut="slideOutRight" hasBackdrop={false} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start'}}>
                    {this.renderImageLinkModal()}
                </Modal>
                <View style={modal.header}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Icon
                            name="arrow-left"
                            type='font-awesome-5'
                            color='gray'
                            size={20}
                            onPress={()=>this.setState({postModalVisible: false})}
                        />
                        <TouchableOpacity style={modal.postButton} onPress={()=>this.setState({imageLinkModalVisible:true})}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:15}}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:'3%'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'purple'}}
                        />
                        <Text style={{color:'#333', fontWeight:'700', fontSize:15, marginLeft:'2%'}}>{firebase.auth().currentUser.displayName}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:'3%'}}>
                        <TouchableOpacity>
                            <Text style={{color:'gray', fontWeight:'700', fontSize:18}}>Rules</Text>
                        </TouchableOpacity>
                        <Text style={{color:'black', fontWeight:'700', fontSize:15}}>Project Idea</Text>
                    </View>
                    
                </View>

                <View style={modal.body}>
                    <TextInput
                        placeholder="What's your idea?"
                        style={{paddingHorizontal:'2.5%', paddingVertical:'5%', color:'#333', fontSize:25, fontWeight:'700'}}
                        multiline
                        onChangeText={(text)=>this.setState({titleText:text})}
                    />
                    <TextInput
                        placeholder="Describe your idea"
                        style={{paddingHorizontal:'2.5%', paddingVertical:'5%', color:'#999', fontSize:20, fontWeight:'500'}}
                        multiline
                        onChangeText={(text)=>this.setState({descriptionText:text})}
                    />
                </View>
            </SafeAreaView>
        )
    }

    renderCreatePromotionModal = () =>{
        return(
            <SafeAreaView style={modal.container}>
                <Modal isVisible={this.state.imageLinkPromotionModalVisible} animationIn="slideInRight" animationOut="slideOutRight" hasBackdrop={false} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start'}}>
                    {this.renderImageLinkModalPromotion()}
                </Modal>
                <View style={modal.header}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Icon
                            name="arrow-left"
                            type='font-awesome-5'
                            color='gray'
                            size={20}
                            onPress={()=>this.setState({promotionModalVisible: false})}
                        />
                        <TouchableOpacity style={modal.postButton} onPress={()=>this.setState({imageLinkPromotionModalVisible:true})}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:15}}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:'3%'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'purple'}}
                        />
                        <Text style={{color:'#333', fontWeight:'700', fontSize:15, marginLeft:'2%'}}>{firebase.auth().currentUser.displayName}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:'3%'}}>
                        <TouchableOpacity>
                            <Text style={{color:'gray', fontWeight:'700', fontSize:18}}>Rules</Text>
                        </TouchableOpacity>
                        <Text style={{color:'black', fontWeight:'700', fontSize:15}}>Looking For Project</Text>
                    </View>
                    
                </View>

                <View style={modal.body}>
                    <TextInput
                        placeholder="What is your desired role, available skills, etc?"
                        style={{paddingHorizontal:'2.5%', paddingVertical:'5%', color:'#333', fontSize:25, fontWeight:'700'}}
                        multiline
                        onChangeText={(text)=>this.setState({role:text})}
                    />
                    <TextInput
                        placeholder="Describe yourself"
                        style={{paddingHorizontal:'2.5%', paddingVertical:'5%', color:'#999', fontSize:20, fontWeight:'500'}}
                        multiline
                        onChangeText={(text)=>this.setState({selfDescription:text})}
                    />
                </View>
            </SafeAreaView>
        )
    }

    renderCreateRequestModal = () =>{
        return(
            <SafeAreaView style={modal.container}>
                <Modal isVisible={this.state.imageLinkRequestModalVisible} animationIn="slideInRight" animationOut="slideOutRight" hasBackdrop={false} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start'}}>
                    {this.renderImageLinkModalRequest()}
                </Modal>
                <View style={modal.header}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Icon
                            name="arrow-left"
                            type='font-awesome-5'
                            color='gray'
                            size={20}
                            onPress={()=>this.setState({requestModalVisible: false})}
                        />
                        <TouchableOpacity style={modal.postButton} onPress={()=>this.setState({imageLinkRequestModalVisible:true})}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:15}}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:'3%'}}>
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            containerStyle={{backgroundColor:'purple'}}
                        />
                        <Text style={{color:'#333', fontWeight:'700', fontSize:15, marginLeft:'2%'}}>{firebase.auth().currentUser.displayName}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:'3%'}}>
                        <TouchableOpacity>
                            <Text style={{color:'gray', fontWeight:'700', fontSize:18}}>Rules</Text>
                        </TouchableOpacity>
                        <Text style={{color:'black', fontWeight:'700', fontSize:15}}>Looking For Help</Text>
                    </View>
                    
                </View>

                <View style={modal.body}>
                    <TextInput
                        placeholder="What skills are you looking for?"
                        style={{paddingHorizontal:'2.5%', paddingVertical:'5%', color:'#333', fontSize:25, fontWeight:'700'}}
                        multiline
                        onChangeText={(text)=>this.setState({requestRole:text})}
                    />
                    <TextInput
                        placeholder="Describe their role in your project"
                        style={{paddingHorizontal:'2.5%', paddingVertical:'5%', color:'#999', fontSize:20, fontWeight:'500'}}
                        multiline
                        onChangeText={(text)=>this.setState({requestDescription:text})}
                    />
                </View>
            </SafeAreaView>
        )
    }

    renderDrawer = () =>{
        return(
            <SafeAreaView style={drawer.container}>
                <Icon
                    name='x'
                    type='foundation'
                    color='gray'
                    size={25}
                    style={{marginLeft:'5%', marginTop:'7%'}}
                />
                <View style={drawer.name}>
                    <Avatar
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        containerStyle={{backgroundColor:'blue'}}
                        size={40}
                    />
                    <Text style={{color:'black', fontWeight:'700', fontSize:30}}>{firebase.auth().currentUser.displayName}</Text>
                </View>

                <View style={drawer.pages}>
                    
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginLeft:'5%', marginBottom:'5%'}}>
                        <Icon
                            name='bookmark'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                            style={{marginLeft:'5%', marginTop:'7%', marginRight:'7%'}}
                        />
                        <Text style={{color:'black', fontWeight:'600', fontSize:18}}>Saved Posts</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginLeft:'5%', marginBottom:'5%'}}>
                        <Icon
                            name='chart-bar'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                            style={{marginLeft:'5%', marginTop:'7%', marginRight:'7%'}}
                        />
                        <Text style={{color:'black', fontWeight:'600', fontSize:18}}>Stats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginLeft:'5%', marginBottom:'5%'}}>
                        <Icon
                            name='cog'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                            style={{marginLeft:'5%', marginTop:'7%', marginRight:'7%'}}
                        />
                        <Text style={{color:'black', fontWeight:'600', fontSize:18}}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', marginLeft:'5%', marginBottom:'5%'}} onPress={()=> this.authSignOut()}>
                        <Icon
                            name='sign-out-alt'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                            style={{marginLeft:'5%', marginTop:'7%', marginRight:'7%'}}
                        />
                        <Text style={{color:'black', fontWeight:'600', fontSize:18}}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
        
    }

    render(){
        return(
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="displace"
                content={this.renderDrawer()}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
            >
                <NavigationContainer>
                    <Modal isVisible={this.state.chooseTypeModalVisible} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start'}}>
                        {this.renderChooseTypeModal()}
                    </Modal>
                    <Tab.Navigator tabBar={props => <CustomTabBar {...props} showPostEditor={()=>this.setState({chooseTypeModalVisible:true})} />}>
                        <Tab.Screen name="Feed" component={FeedNavigation} initialParams={{openControlPanel: this.openControlPanel, closeControlPanel: this.closeControlPanel}}/>
                        <Tab.Screen name="button" component={FeedNavigation} />
                        <Tab.Screen name="Profile" component={Profile} initialParams={{openControlPanel: this.openControlPanel, closeControlPanel: this.closeControlPanel}}/>
                        <Tab.Screen name="Message" component={Message}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </Drawer>
            
        )
    }

}

const styles = StyleSheet.create({
    imageView:{
        width:100,
        height:100,
        paddingRight:'10%',
        borderRadius:50,
        shadowOpacity:0.4,
        shadowColor:'grey',
        shadowOffset:{
            width:0,
            height:0.5
        },
    },
})

const modal = StyleSheet.create({
    container:{
        flex:1,
        width:'100%'
    },

    header:{
        borderBottomWidth: 0.4,
        borderBottomColor: '#eee',
        width:'100%',
        paddingVertical:'5%',
        paddingHorizontal:'5%',
    },

    postButton:{
        paddingVertical:'2%',
        paddingHorizontal:'4%',
        backgroundColor:'#0279D2',
        borderRadius:20
    },

    body:{
        paddingHorizontal:'5%',
        paddingVertical:'5%'
    },

    textInput:{
        backgroundColor:'white',
        borderRadius:5,
        fontSize:16,
        borderColor:'gray',
        borderWidth:0.5,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:'8%',
        paddingVertical:'7%',
        alignSelf:'center',
        marginTop:'5%'
    },

    linkStyle:{
        backgroundColor:"#F1F2F4",
        marginTop:10,
        borderRadius:20,
    }

});

const drawer = StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingHorizontal:'3%',
        flex:1,
        alignItems:"flex-start",
        shadowOpacity:0.4,

        width:'99%'
    },

    name:{
        backgroundColor:'#F1F2F4', alignSelf:'center', width:'90%', marginTop:'5%', borderRadius:15, padding:'5%'
    },

    pages:{
        marginTop:'5%',
        paddingTop:'5%',
        borderTopWidth:0.5,
        borderColor:'#eee',
        width:"100%"
    }



});