import React from 'react';
import { Alert ,StyleSheet, Text, View , TouchableOpacity ,Image, ImageBackground , TextInput ,AsyncStorage ,Platform , ActivityIndicator , AppState , KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { StackNavigator , TabNavigator , NavigationActions , StackActions } from 'react-navigation'; // Version can be specified in package.json
import FontAwesome , { Icons } from 'react-native-fontawesome';
import SyncStorage from 'sync-storage';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class Login extends React.Component{

    static navigationOptions = {
        title :'Login',
        header :null,

    }

    constructor(props){
        super(props);
 
    }
    state =  {
        email : '',
        pword : '' ,
        isLoading : false,
    };   
    componentDidMount () {
            
        debugger;
        //AsyncStorage.clear();
        console.log("Login mounted !!");
        console.log(AppState.currentState); 

    }
 
    login () {

        var url = "https://c-nnect.testurl.co/api/user_login.php";

        for (var key in this.state) {


            if (this.state[key].toString() == "") {
                console.log(`Please fill in ${key}`);
                this.alert("Failure",`Please fill in ${key}`);         
                return;  
            } 
        }

        this.setState({isLoading:true});

        var userData = JSON.stringify(this.state);
        console.log(userData);  
        axios.post(url,userData).then((data ) => {
        console.log(data.data);   
        debugger;
        
        this.setState({isLoading:false}); 
      
                if(data.data != "fail") {                            
                    var credentials = {
                        email : this.state.email,
                        loggedIn : true,
                        userDetails:  data.data,
                        userType : data.data[0].user_type,
                        user_id : data.data[0].user_id
                    }
                    AsyncStorage.setItem('loggedin',JSON.stringify(credentials)).then((success) => {
                        this.alert("Success",`Welcome back ${this.state.email}`)
                        console.log(credentials);
                        this.props.navigation.navigate('Main', credentials);
                    }).catch((error)=>{
                        this.setState({isLoading:false,showAlert:false}); 
                        console.log(error);
                    });

                }               
                else
                    alert(data.data);
        }).catch((error)=>{
            this.setState({isLoading:false}); 
            console.log("error" + error);
        }); 




    }
    close () {

        const { navigate } = this.props.navigation;
        navigate('Welcome', {});
    }

    linkedIn () {
        
        this.props.navigation.navigate('LinkedIn',{})
    }
    
    onFocusChange = () => {
        this.setState({ isFocused: true });
    }

    alert (title,message) {
        Alert.alert(
            title,
            message,
            [
                {text:"Ok" , onPress:()=> console.log("Pressed..!")}
            ],
            {cancelable:false}
        )
    }

    render() {
    
        return (
            <ImageBackground
                style={styles.bgContainer}
                source = {require('../assets/bgplain.jpg')} >
                <View style={{marginTop:30,marginBottom:'10%'}}>
                    <Image source={require('../assets/logo.png')}
                    style={{width: 170, height: 140}} />
                </View>   
                <KeyboardAvoidingView style={styles.inputSection}>
                <View style={styles.innerInput}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Email"
                        underlineColorAndroid='transparent'    
                        placeholderTextColor="white" 
                        onChangeText = {email => this.setState({email: email.toLowerCase()})}
                        onFocus={this.onFocusChange.bind(this)}
                    /> 
                    <Text style={styles.iconStyle}><FontAwesome>{Icons.user}</FontAwesome></Text>
                </View> 
                <View style={styles.innerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true} 
                        underlineColorAndroid='transparent'
                        placeholderTextColor="white"
                        onChangeText = {pword => this.setState({pword})}
                    />
                    <Text style={styles.iconStyle}><FontAwesome>{Icons.eye}</FontAwesome></Text>
                </View>
                <View style={{flex: 0, flexDirection: 'row' , width:'60%',marginLeft:24}}>
                        <View style={{width:'100%', height: 20}}> 
                            <Text  onPress={() => { this.props.navigation.navigate('Registration', {})}} style={{color:"#fff",paddingLeft:'7%'}}>Register</Text>
                        </View>
                        <View style={{height: 20}}>
                                <Text style={{color:"#fff",paddingRight:'12%',textAlign:'right',fontSize:13}}>Forgot my password</Text>
                        </View>   
                    </View>  
                    <View style={[styles.buttonSection]}>
                    <ActivityIndicator style={{marginTop:-40,marginBottom:20}} size="large" color="#fff" animating={this.state.isLoading}/>
                    <TouchableOpacity style={styles.login} onPress={this.login.bind(this)}>
                          <Text style={styles.textStyle}>SIGN IN</Text>
                      </TouchableOpacity> 
                      <Text style={[styles.textStyle,{margin:20}]} onPress={this.linkedIn.bind(this)} >Sign in using LinkedIn</Text>
                  </View>
                  <View>
                      <TouchableOpacity style={styles.close} onPress={this.close.bind(this)}>
                          <Text style={styles.textStyle}>X</Text>
                      </TouchableOpacity> 
                  </View>
            </KeyboardAvoidingView>
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%', 
     },
     footerSection : {
       marginBottom: -100
     },
     input : {     
        width: '90%' ,
        color : '#fff',
        borderBottomWidth: 2 ,  
        borderColor : '#fff',
        fontSize:16,
        marginBottom: 10, 
        fontFamily: 'Roboto-Regular', 
        paddingLeft: 10
     }, 
     textStyle : {
        fontSize: 18,
        color : '#fff',
        padding: 10,  
        fontFamily: 'Roboto-Regular', 
        textAlign:'center',
     } ,
     footerText :{
         color:'#fff',
         fontFamily: 'tahoma',
         fontWeight : 'bold',
     },
     login : {    
        borderColor :'#fff',
        borderWidth:1,
        borderRadius: 50,
        width: '60%',
     }, 
     close : {    
        borderColor :'#fff',
        borderWidth:1,
        borderRadius: 50,
        width: 49,
        marginBottom: 20,
        marginTop  : 10,
        alignSelf: 'center',
     }, 
     buttonSection :{
         marginTop:30, 
         alignItems: 'center',
     },
     logoStyle : {
        resizeMode : 'stretch',
        alignItems: 'center',
        width: 20,
        height: 20,
        marginLeft: -22, 
        marginTop: -20   
     },  
     innerInput : {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        ...Platform.select({
            ios : {
                margin : 10,
    
            },
            android : {
                margin :  0,
            }
        }),
     },
     iconStyle : {
        color : '#fff',
        paddingBottom:10,
        marginLeft: -20
     } ,
     linkedinIcon : {
        backgroundColor:'#fff',
        color:'red',
        paddingLeft:'4%'
     }
  });          