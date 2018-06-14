import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity ,Image, ImageBackground , TextInput , ScrollView , KeyboardAvoidingView , AsyncStorage , Platform } from 'react-native';
import axios from 'axios';
export default class Registration extends React.Component{

    static navigationOptions = {
        title :'',
        header : null
    }

    constructor(props){
        super(props);
    }
    state = {
            firstname : '',
            lastname : '',
            email : '',
            job_title : '',
            company : '',
            contact_no : '',
    }; 

    componentDidMount(){
        // axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
        //     console.log(res);
        // })
    }
 
    login () {
        console.log("success login")
        this.props.navigation.navigate('MyProfile', {});
    }

    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/ ;
        if(reg.test(text) === false)
        {
        console.log("Email is Not Correct");
    
        return false;
          }
        else {
          this.setState({email:text})
          console.log("Email is Correct");
        } 
        }

    register () {
      
        var url = "https://c-nnect.testurl.co/api/register_api.php";

        for (var key in this.state) {
            if (this.state[key] == "") {
                console.log(`Please fill in ${key}`);

                alert(`Please fill in ${key}`);
               
                return;  
            } 
        }
        
        var userData = JSON.stringify(this.state);
        
        console.log(userData);

        axios.post(url,userData).then((data)=>{
            console.log(data.data);    
            var credentials = {
                email : this.state.email,
                loggedIn : true,
                userDetails:  {},
                userType : "Adcock"
            }
            AsyncStorage.setItem('loggedin',JSON.stringify(credentials))
            this.props.navigation.navigate('Main',{});

        }).catch((error) => {
            console.log("error" + error);
        });    

    }

    resetPassword () {
 
    } 
    render() {
        return (
            <ImageBackground
                style={styles.bgContainer}
                source = {require('../assets/bgplain.jpg')} > 
                <View style={{marginTop:30,marginBottom:10,alignContent:'center',alignItems:'center'}}>
                    <Image source={require('../assets/logo.png')} 
                        style={{width: 120, height: 100}}/> 
                </View>    
                <View style={{marginTop:10,marginBottom:10,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={styles.topText}>Create An Account</Text>
                </View>  
                <ScrollView >
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <View style={styles.innerInput}>
                            <TextInput  
                                style={styles.input}
                                placeholder="First Name"
                                underlineColorAndroid='transparent' 
                                placeholderTextColor="white" 
                                onChangeText = {firstname => this.setState({firstname})}
                            /> 
                        </View>    
                        <View style={styles.innerInput}>
                            <TextInput  
                                style={styles.input}
                                placeholder="Last Name"
                                underlineColorAndroid='transparent' 
                                placeholderTextColor="white" 
                                onChangeText = { lastname =>this.setState({lastname})}
                            /> 
                        </View>
                        <View style={styles.innerInput}>
                            <TextInput 
                                style={styles.input}
                                placeholder="Email Address"
                                underlineColorAndroid='transparent' 
                                placeholderTextColor="white" 
                                onChangeText = {(email)=>this.validate(email)}
                            /> 
                        </View> 
                        <View style={styles.innerInput}>
                            <TextInput 
                                style={styles.input}
                                placeholder="Job Title" 
                                underlineColorAndroid='transparent' 
                                placeholderTextColor="white" 
                                onChangeText = {job_title=>this.setState({job_title})}
                            />  
                        </View> 
                        <View style={styles.innerInput}> 
                            <TextInput 
                                style={styles.input}
                                placeholder="Company"
                                underlineColorAndroid='transparent' 
                                placeholderTextColor="white" 
                                onChangeText = {company=>this.setState({company})}
                            /> 
                        </View> 
                        <View style={styles.innerInput}> 
                            <TextInput 
                                style={styles.input}
                                placeholder="Contact no."
                                underlineColorAndroid='transparent' 
                                placeholderTextColor="white" 
                                onChangeText = {contact_no=>this.setState({contact_no})}
                            /> 
                        </View> 
                        <View style={styles.buttonSection}>
                        <TouchableOpacity style={styles.login} onPress={this.register.bind(this)}>
                                <Text style={styles.textStyle}>CREATE ACCOUNT</Text>
                            </TouchableOpacity>  
                        </View>
                        <View style={styles.buttonBack}>
                        <TouchableOpacity style={styles.back} onPress={()=> this.props.navigation.goBack()}>
                                <Text style={styles.textStyle}>X</Text>
                            </TouchableOpacity>  
                        </View>
                    </KeyboardAvoidingView>
               </ScrollView>
            </ImageBackground>   
        ); 
    } 
} 

const styles = StyleSheet.create({
    innerInput: {
        ...Platform.select({
            ios : {
                padding : 10,
                margin : 5,
                marginLeft : 0
            },
            android : {
                margin  : 0
            }
        }),
        alignItems: 'center',
        alignContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },  
    bgContainer : {
        flex: 1,
        width: '100%',
        height: '100%', 
     },
     footerSection : {
       marginBottom: -100
     },  
     input : {   
        width: '80%' ,
        color : '#fff',
        borderBottomWidth: 2 ,  
        borderColor : '#fff',
        fontSize:16,   
        marginBottom: 5,
        fontFamily: 'Roboto-Regular', 
     }, 
     textStyle : {
        fontSize: 16,
        color : '#fff',
        padding: 10,  
        fontFamily: 'Roboto-Regular', 
        textAlign : 'center' 
     },
     topText : {
        fontSize: 16,
        color : '#fff',
        fontFamily: 'Roboto-Regular', 
        paddingLeft: 0,  
        ...Platform.select({
            ios : {
                margin: 10
            }
        })
     },
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
        alignSelf: 'center',
     }, 
     back : {
        borderColor :'#fff',
        borderWidth:1,
        borderRadius: 50,
        width: 40
     },
     close : {    
        borderColor :'#fff',
        borderWidth:1,
        borderRadius: 50,
        width: 50, 
     }, 
     buttonSection :{
         alignItems: 'center', 
         marginTop : 30,
         marginBottom:30
     },
     buttonBack : {
        alignItems: 'center', 
        marginBottom:30
    },
     logoStyle : {
        resizeMode : 'stretch',
        alignItems: 'center',
        width: 20,
        height: 20,
        marginLeft: -22, 
        marginTop: -20 
     }, 
  });          