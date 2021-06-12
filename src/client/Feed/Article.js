import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Image } from 'react-native';
import { Avatar, SearchBar, Icon } from 'react-native-elements';
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import DataManager from '../../server/DataManager';

export default class Article extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            images: []
        }
    }

    data = this.props.route.params.data

    componentDidMount(){
        console.log(this.data)
        numImages = this.data.images.length
        for(var i = 0; i < numImages; i++){
            DataManager.getDownloadLink(this.data.postID, i).then(result =>{
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
            <SafeAreaView style={{backgroundColor:'white'}}>
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
                    <View style={styles.commentSection}>
                        <Text style={{color:'#555', fontWeight:'600', fontSize:13, marginVertical:'3%', marginLeft:'5%'}}>Activity (32)</Text>
                        {this.renderCommentItem()}
                        {this.renderCommentItem()}
                    </View>
                </ScrollView>
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