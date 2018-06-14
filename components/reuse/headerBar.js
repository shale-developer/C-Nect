import React, { Component } from 'react';
import { ImageBackground , Text } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class HeaderBar extends Component {
    
    
    render() {
        return (
            <ImageBackground 
            style={{flex: 0, alignItems:"center",justifyContent:'center',flexDirection:'row',height:70}}
            source = {require('../../assets/bgplain.jpg')}>
                <Text style={{fontSize:20,color:'#fff',marginTop:15,}}>{this.props.name}</Text>
            </ImageBackground>
        );
    }
}