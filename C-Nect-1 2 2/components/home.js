import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity ,Image, ImageBackground, AsyncStorage , AppState} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'; // Version can be specified in package.json


debugger;
    

export default class Welcome extends React.Component{

    static navigationOptions = {
        title :'Welcome',
        header :null
    }


    constructor(props) {
        super(props);
    } 
    state = {};


    async  componentDidMount () {

        try {
           await AsyncStorage.getItem('loggedin').then((p) => {
               console.log(p);
               if(p == null)
                 setTimeout(()=> {this.props.navigation.navigate('Login',{});},3000);  
               else
                 setTimeout(()=> {this.props.navigation.navigate('Main',{params:p});},3000);;

          }).catch((e) => {
                 //defaultRoute;
          });
       
         } catch (e) {
           debugger;
           console.log('Error : ' +  e);
           //defaultRoute;
         }

    }

 
 render() { 
        
        debugger;
        return (
            <ImageBackground
            style={styles.bgContainer}  
            source = {require('../assets/bg.png')} >
                <Image
                source={require('../assets/giphy.gif')}
                style={{width:200,height:200}}
                >
                </Image>
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