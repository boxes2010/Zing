import React from 'react';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {StatusBar} from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableWithoutFeedback , Keyboard } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import "firebase/firestore";
import firebase from "firebase";
import DataManager from '../../server/DataManager'

export default class Landing extends React.Component{

    constructor(props){
        super(props)
        this.state={
            loginModalVisible: false,
            signupModalVisible: false,
            email: '',
            password : '',
            username: '',
        }
    }

    async signUpWithEmail() {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((userCredential) => {
              firebase.auth().currentUser.updateProfile({
                  displayName: this.state.username
              })
            //console.log(firebase.auth().currentUser)
          })
          .catch(error => {
              let errorCode = error.code;
              let errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
                  console.log("Weak Password")
              } else {
                  console.log(errorMessage)
              }
          });
    }

    async signInWithEmail() {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log("Signed In")
            })
            .catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    console.log("Weak Password")
                } else {
                    console.log(errorMessage)
                }
            });
        })
        
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <StatusBar/>
                <Modal isVisible={this.state.loginModalVisible} animationIn="slideInRight" animationOut="slideOutRight" backdropOpacity={0.0} backgroundColor='white' style={{margin:'0%'}}>
                    <SafeAreaView></SafeAreaView>
                    <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{Keyboard.dismiss()}}><View style={{alignItems:'flex-start',  justifyContent:'flex-start', paddingHorizontal:'7%', flex:1}}>     
                        <Icon
                            name='chevron-left'
                            type='font-awesome-5'
                            color='#bbb'
                            size={19}
                            style={{marginTop: '6%'}}
                            onPress={()=>this.setState({loginModalVisible: false})}
                        />
                        
                        <Text style={{color:'black', fontWeight:'400', fontSize:33, marginTop:'8%'}}>Login to</Text>
                        <Text style={{color:'black', fontWeight:'400', fontSize:33, marginTop:'0.5%'}}>Zing Account</Text>
                        <TextInput
                            style={loginStyles.textInput}
                            placeholder="Username/Email"
                            onChangeText={(text)=>this.setState({email:text})}
                            autoCorrect={false}
                            autoCapitalize={false}
                        />
                        <TextInput
                            style={loginStyles.textInput}
                            placeholder="Password"
                            onChangeText={(text)=>this.setState({password:text})}
                            autoCorrect={false}
                            autoCapitalize={false}
                            secureTextEntry={true}
                        />
                    
                        <TouchableOpacity style={{backgroundColor:"#0279D2", paddingVertical:"5%", paddingHorizontal:'16%', justifyContent:'center', borderRadius:50, marginTop:'10%', width: '100%'}} onPress={()=>this.signInWithEmail()}>
                            <Text style={{color:'white', fontWeight:'400', fontSize:15, alignSelf:'center'}}>Login Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>console.log(firebase.auth().currentUser.uid)} style={{alignSelf:'center'}}>
                            <Text style={{color:'#aaa', fontWeight:'400', fontSize:15, marginTop:'5%'}}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View></TouchableWithoutFeedback>
                </Modal>
                <Modal isVisible={this.state.signupModalVisible} animationIn="slideInRight" animationOut="slideOutRight" backdropOpacity={0.0} backgroundColor='white' style={{margin:'0%'}}>
                    <SafeAreaView></SafeAreaView>
                    <TouchableWithoutFeedback style={{flex:1}} onPress={()=>{Keyboard.dismiss()}}><View style={{alignItems:'flex-start',  justifyContent:'flex-start', paddingHorizontal:'7%', flex:1}}>
                        <Icon
                            name='chevron-left'
                            type='font-awesome-5'
                            color='#bbb'
                            size={19}
                            style={{marginTop: '6%'}}
                            onPress={()=>this.setState({signupModalVisible: false})}
                        />
                        
                        <Text style={{color:'black', fontWeight:'400', fontSize:33, marginTop:'8%'}}>Create new</Text>
                        <Text style={{color:'black', fontWeight:'400', fontSize:33, marginTop:'0.5%'}}>Zing Account</Text>
                        <TextInput
                            style={loginStyles.textInput}
                            placeholder="Email"
                            placeholderTextColor="#aaa"
                            onChangeText={(text)=>this.setState({email: text})}
                            autoCorrect={false}
                            autoCapitalize={false}
                        />
                        <TextInput
                            style={loginStyles.textInput}
                            placeholder="Username"
                            placeholderTextColor="#aaa"
                            onChangeText={(text)=>this.setState({username:text})}
                            autoCorrect={false}
                            autoCapitalize={false}
                        />
                        <TextInput
                            style={loginStyles.textInput}
                            placeholder="Password"
                            placeholderTextColor="#aaa"
                            onChangeText={(text)=>this.setState({password:text})}
                            autoCorrect={false}
                            autoCapitalize={false}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={loginStyles.textInput}
                            placeholder="Confirm Password"
                            placeholderTextColor="#aaa"
                            autoCorrect={false}
                            autoCapitalize={false}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={{backgroundColor:"#0279D2", paddingVertical:"5%", paddingHorizontal:'16%', justifyContent:'center', borderRadius:50, marginTop:'10%', width: '100%'}} onPress={()=>this.signUpWithEmail()}>
                            <Text style={{color:'white', fontWeight:'400', fontSize:15, alignSelf:'center'}}>Signup Now</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{backgroundColor:"white", paddingVertical:"5%", paddingHorizontal:'16%', justifyContent:'center', borderRadius:50, marginTop:'10%', width: '100%', borderWidth:1, borderColor:'#aaa'}} onPress={()=>this.signUpWithEmail()}>
                            <Text style={{color:'#gray', fontWeight:'400', fontSize:15, alignSelf:'center'}}>Signup With Google</Text>
                        </TouchableOpacity>
                    </View></TouchableWithoutFeedback>
                </Modal>


                <View style={styles.imageView}>

                </View>
                <View style={styles.buttonsView}>
                    <TouchableOpacity style={{borderWidth:1.5, borderColor:"#0279D2", paddingVertical:"3.5%", paddingHorizontal:'16%', justifyContent:'center', borderRadius:5}} onPress={()=>this.setState({loginModalVisible:true})}>
                        <Text style={{color:'#0279D2', fontWeight:'700', fontSize:15}}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:"#0279D2", paddingVertical:"3.5%", paddingHorizontal:'16%', justifyContent:'center', borderRadius:5, }} onPress={()=>this.setState({signupModalVisible: true})}>
                        <Text style={{color:'white', fontWeight:'700', fontSize:15}}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                
               
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingVertical:"5%"
    },

    imageView:{
        width:'100%',
        height:'85%'
    },

    buttonsView:{
        flexDirection: 'row', 
        justifyContent:'space-between',
        paddingHorizontal:'5%'
        
    }
  });

  const loginStyles = StyleSheet.create({
    textInput:{
        backgroundColor:'white',

        fontSize:16,
        borderColor:'#ddd',
        borderBottomWidth:1.5,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:'1%',
        paddingVertical:'6%',
        alignSelf:'center',
        marginTop:'5%'
    },


  });