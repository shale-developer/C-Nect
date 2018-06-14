import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity ,Image, ImageBackground, AsyncStorage , AppState} from 'react-native';
import { StackNavigator , NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import Login from './login'; 

export default class Welcome extends React.Component{

    static navigationOptions = {
        title :'Logout',
        header :null,
        tabBarIcon: ({ tintColor }) => (<Icon name="notebook" size={20} color="red"/>),
        tabBarOptions : {
            showIcon : true,
        }
    }


    constructor(props){
        super(props);
    } 
    state = {};


    componentDidMount () {
    
    debugger;
    AsyncStorage.clear();
    console.log("welcome mounted !!");
    console.log(AppState.currentState); 

    }

    login () {
        
    }
 
    render() { 
    
        return (
            <ImageBackground
                style={styles.bgContainer}  
                source = {require('../assets/bg.png')} >
                <View style={{marginBottom:80,marginTop : 60}}>    
                    <Image source={require('../assets/logo.png')}
                    style={{width: 220, height: 180}} />
                </View> 
                <View style={styles.buttonSection}>
                {/*
                    <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Home',{})}} style={styles.login}> 
                        <Text style={styles.textStyle}>GET STARTED</Text>
                    </TouchableOpacity> 
                */}
                    <TouchableOpacity style={styles.login} onPress={()=> {this.props.navigation.navigate('Login',{})}}>
                        <Text style={styles.textStyle}>GET STARTED</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>DISRUPT. EDUCATE. REWARD</Text>
                </View>
            </ImageBackground> 
        );
    }
}  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', 
      alignItems: 'center',
      justifyContent: 'center',
    },
    bgContainer : {
        flex: 1,
        alignItems :'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly', 
     },
     footerSection : {
     
     },
     buttonSection : {
        marginTop: 0, 
        marginBottom: 100, 
     }, 
     login : {    
        borderColor :'#fff',
        borderWidth:1, 
        borderRadius: 50,
        width: 220
     }, 
     textStyle : {
        fontSize: 20, 
        color : '#fff',
        padding: 10, 
        fontFamily: 'Roboto-Regular',
        textAlign:'center',
     } ,
     footerText :{
         color:'#fff',
         fontFamily: 'Roboto-Regular',
         fontWeight : 'bold',
     } 
  });        