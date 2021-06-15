import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigation from './src/client/TabNavigation'
import firebase from 'firebase'
import DataManager from './src/server/DataManager'
import Landing from './src/client/Login/Landing'

const firebaseConfig = {
  apiKey: "AIzaSyApwYEGr4l89ppqxYejzR9QG2QRl5ildsE",
  authDomain: "zing-968a3.firebaseapp.com",
  projectId: "zing-968a3",
  storageBucket: "zing-968a3.appspot.com",
  messagingSenderId: "515359522395",
  appId: "1:515359522395:web:09ac74a5907276a3b1497e",
  measurementId: "G-8JML5S1J2H"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app()
}

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user != null){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    });    
  }, []);



  if(isLoggedIn){
    return(<TabNavigation/>)
  }else{
    return(<Landing/>)
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
