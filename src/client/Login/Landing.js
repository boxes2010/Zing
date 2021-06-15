import React from 'react';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
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
                <Modal isVisible={this.state.loginModalVisible} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start', paddingHorizontal:'5%'}}>
                    <SafeAreaView></SafeAreaView>
                    <TouchableOpacity onPress={()=>this.setState({loginModalVisible: false})}>
                        <Icon
                            name='arrow-left'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                            style={{marginTop: '7%'}}
                        />
                    </TouchableOpacity>
                    
                    <Text style={{color:'#0279D2', fontWeight:'700', fontSize:20, marginTop:'10%'}}>Log in to Zing</Text>
                    <TextInput
                        style={loginStyles.textInput}
                        placeholder="Username/Email"
                        onChangeText={(text)=>this.setState({email:text})}
                    />
                    <TextInput
                        style={loginStyles.textInput}
                        placeholder="Password"
                        onChangeText={(text)=>this.setState({password:text})}
                    />
                    <TouchableOpacity onPress={()=>console.log(firebase.auth().currentUser.uid)}>
                        <Text style={{color:'#0279D2', fontWeight:'700', fontSize:13, marginTop:'5%'}}>FORGOT PASSWORD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:"#0279D2", paddingVertical:"3.5%", paddingHorizontal:'16%', justifyContent:'center', borderRadius:5, marginTop:'5%'}} onPress={()=>this.signInWithEmail()}>
                        <Text style={{color:'white', fontWeight:'700', fontSize:15}}>LOG IN</Text>
                    </TouchableOpacity>
                </Modal>
                <Modal isVisible={this.state.signupModalVisible} backdropOpacity={1.0} backgroundColor='white' style={{margin:'0%', alignItems:'flex-start',  justifyContent:'flex-start', paddingHorizontal:'5%'}}>
                    <SafeAreaView></SafeAreaView>
                    <TouchableOpacity onPress={()=>this.setState({signupModalVisible: false})}>
                        <Icon
                            name='arrow-left'
                            type='font-awesome-5'
                            color='gray'
                            size={18}
                            style={{marginTop: '7%'}}
                        />
                    </TouchableOpacity>
                    
                    <Text style={{color:'#0279D2', fontWeight:'700', fontSize:20, marginTop:'10%'}}>Sign Up with Zing!</Text>
                    <TextInput
                        style={loginStyles.textInput}
                        placeholder="Email"
                        onChangeText={(text)=>this.setState({email: text})}
                    />
                    <TextInput
                        style={loginStyles.textInput}
                        placeholder="Username"
                        onChangeText={(text)=>this.setState({username:text})}
                    />
                    <TextInput
                        style={loginStyles.textInput}
                        placeholder="Password"
                        onChangeText={(text)=>this.setState({password:text})}
                    />
                    <TextInput
                        style={loginStyles.textInput}
                        placeholder="Confirm Password"
                    />
                    <TouchableOpacity style={{backgroundColor:"#0279D2", paddingVertical:"3.5%", paddingHorizontal:'16%', justifyContent:'center', borderRadius:5, marginTop:'5%'}} onPress={()=>this.signUpWithEmail()}>
                        <Text style={{color:'white', fontWeight:'700', fontSize:15}}>SIGN UP</Text>
                    </TouchableOpacity>
                    
                </Modal>


                <View style={styles.imageView}>

                </View>
                <View style={styles.buttonsView}>
                    <TouchableOpacity style={{borderWidth:1.5, borderColor:"#0279D2", paddingVertical:"3.5%", paddingHorizontal:'16%', justifyContent:'center', borderRadius:5}} onPress={()=>this.setState({loginModalVisible:true})}>
                        <Text style={{color:'#0279D2', fontWeight:'700', fontSize:15}}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:"#0279D2", paddingVertical:"3.5%", paddingHorizontal:'16%', justifyContent:'center', borderRadius:5}} onPress={()=>this.setState({signupModalVisible: true})}>
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


  });