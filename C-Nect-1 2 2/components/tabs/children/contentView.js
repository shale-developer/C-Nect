import React , { Component } from 'react';
import { Text,
         Image,
         ScrollView,
         View,
         FlatList,
         ActivityIndicator,
         Button, StyleSheet, AsyncStorage, Alert,TouchableHighlight ,ImageBackground ,TouchableOpacity ,Platform , WebView } from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import { StackNavigator } from 'react-navigation'; 
import axios from 'axios';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
//

import HeaderBar from '../../reuse/headerBar';

//

var contentList ;

export default class ContentView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title : '',
            decodedHTML : ''
        }
    }

     static navigationOptions = {
        title : "Course Content"
        // ({navigation}) =
        // const {params = {}} = navigation.state;
        // return {
        //     headerRight: <Button
        //                      title="Refresh"
        //                      onPress={ () => params.handleThis() } />

        // };
    };



    componentDidMount () { 

    const content = this.props.navigation.state.params.params;
    const html = decodeURIComponent(content.html);
    const title = content.title;

    const decodedHTML =  `${html}`;
    
    this.setState({title,decodedHTML});
    
    debugger;
    }
    

    render() {

        debugger;

        return (
                <WebView 
                source={{html : this.state.decodedHTML}}
                style={{marginTop: 20,height:200}}
                />
        );
    }
}

const styles = StyleSheet.create({
    header : {
        margin : 20,
        marginBottom: 0,
        padding: 12,
        textAlign: 'center',
        fontSize : 16,
        color : '#808080',
      },
    button : {
        width:320,
        borderRadius:5,
        marginBottom:20,
        height: 40,
        justifyContent : 'center',
        borderBottomWidth:1,
        borderColor: '#c8c8c8',
        backgroundColor:'#90c73e'
    },
    textStyle :{
        color:'#fff',
        fontSize: 16,
        textAlign:'center'
    },
    buttonContainer : {
        flex : 0 ,
        flexDirection: 'row',
        padding:20,
        paddingTop:10
    },
    image : {
        width:350,
        height:250
    }
})