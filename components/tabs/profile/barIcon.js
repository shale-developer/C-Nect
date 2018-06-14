import React, { Component , Text } from 'react';
import FontAwesome , { Icons } from 'react-native-fontawesome';

export default class BarIcon extends Component {
    render() {
        return (
        <Text style={{fontSize:20, color:'#50C878'}}>
            <FontAwesome>{Icons.user}</FontAwesome>
          </Text>);
    }
}


