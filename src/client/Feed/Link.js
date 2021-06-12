import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import { LinkPreview } from '@flyerhq/react-native-link-preview'

export default class Link extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            links: this.props.route.params.data.links
        }
    }

    renderLinkItem = (url) =>{
        return(
            <LinkPreview 
                text={url} 
                containerStyle={styles.linkStyle}
            />
        )
    }

    render(){
        return(
            <SafeAreaView style={{backgroundColor:'white'}}>
                <View style={styles.header}>
                    <Icon
                        name='arrow-left'
                        type='font-awesome-5'
                        color='gray'
                        size={18}
                        onPress={()=>this.props.navigation.pop()}
                        style={{alignSelf:'flex-start'}}
                    />
                    <Text style={{color:'#555', fontWeight:'700', fontSize:16, marginLeft:'3%', alignSelf:'center'}}>LINKS</Text>
                </View>
                <FlatList
                    data={this.state.links}
                    renderItem={({item}) => this.renderLinkItem(item)}
                />
            </SafeAreaView>
            
        )
    }

}

const styles = StyleSheet.create({
    header:{
        backgroundColor:'white',
        paddingHorizontal:'3.5%',
        paddingVertical:'2.5%',
        flexDirection:"row",
        alignItems:'center',
    },

    linkStyle:{
        backgroundColor:"#F1F2F4",
        marginTop:10,
        borderRadius:20,
        marginHorizontal:"3%"
    }
  });
