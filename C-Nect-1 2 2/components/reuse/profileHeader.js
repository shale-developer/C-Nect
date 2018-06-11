import React, { Component } from 'react';
import { ImageBackground , Text , Image , Platform , AsyncStorage , TouchableHighlight } from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import { TabNavigator , StackNavigator } from 'react-navigation';

import NavigationService from '../NavigationService';

export default class ProfileHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
        }
    }

  async componentDidMount() {
            
    let x = await AsyncStorage.getItem("loggedin").then((success) => {

        var user = JSON.parse(success);
        console.log(user);
        this.setState({
          username : user.email,
        })
        }).catch((error)=>{
    
        })
    }

    render() {
        return (
            <ImageBackground 
            style={{flex: 0, alignItems:"center",justifyContent:'space-evenly'}}
            source = {require('../../assets/bgplain.jpg')}>
                <Text style={{textAlign:'center',color:'#fff',fontSize:15,padding:20,marginTop:25,marginBottom:0}}>Welcome Back</Text>
                    <Image
                        source={require('../../assets/avatar.jpg')}
                        style={{ width: 100, height: 100,borderRadius:50,padding:0}}
                        
                    /> 
                  <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold',fontSize:15,...Platform.select({ ios : { marginTop: 10 } , android : {marginTop:10} })}}>{this.state.username}</Text>
                  <Text style={{textAlign:'center',color:'#fff',fontSize:15,padding:10,letterSpacing:10,...Platform.select({ ios : { marginBottom: 10 , letterSpacing:0 } })}}>
                    <FontAwesome>{Icons.star} </FontAwesome>  
                    <FontAwesome>{Icons.star} </FontAwesome>  
                    <FontAwesome>{Icons.star} </FontAwesome>  
                    <FontAwesome>{Icons.star} </FontAwesome>  
                    <FontAwesome>{Icons.star}</FontAwesome>  
                </Text>
            </ImageBackground>
        );
    }
}