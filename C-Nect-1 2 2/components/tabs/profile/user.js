import React from 'react';
import {Text, 
  LayoutAnimation , 
  TouchableHighlight ,
  UIManager , 
  KeyboardAvoidingView, 
  Button,
  StyleSheet, 
  Switch ,
  Alert,
  TextInput,
  Animated,
  Image,
  ScrollView, AsyncStorage, Platform , View} from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import ProfileHeader from '../../reuse/profileHeader';
import AlertPop from '../../reuse/alert';
import NavigationService from '../../NavigationService/';

import PhotoUpload from 'react-native-photo-upload';

// globals

const courseList = [];
let courses = [];
const spacing  = { ios : { letterSpacing : 0 } };

// 


class ProfileLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList : 'flex',
    }
  }
  render () {
    return (
        <View style={[styles.buttonContainer,{paddingTop:10,paddingBottom:0,display:this.state.showList}]}>
            <TouchableHighlight style={styles.button}>
                <Text style={styles.textStyle}>{this.props.placeholder}</Text>
            </TouchableHighlight>
            <Icon name={this.props.icon} size={20} color="#00adee"/>
        </View>
    )
  }
}

export default class User extends React.Component {

  static navigationOptions = { 
    header :null,
    tabBarIcon: ({ tintColor }) => (   
     <Text style={{fontSize:20, color:'#50C878'}}>
      <FontAwesome>{Icons.user}</FontAwesome>
    </Text>
    )}

  constructor(props) {
    super(props);

    this.state = {
      userType : 'user',
      email : 't@example.com',
      switchValue:false,
      showBtn : 'none',
      showDefaults : 'flex',
      showAlert : false,
      password : '',
      name: '',
      surname : '',
      number : 0,
    } 


  }

  componentDidMount() {

    debugger;
    AsyncStorage.getItem("loggedin").then((success) => {

      var userObj = JSON.parse(success);

      this.setState({
        username : userObj.email,
        userType : userObj.userType,

      }) 


    }).catch((error) => {

      console.log(error);

    })  


  } 

  switchValue (switchValue) {
    this.setState({switchValue});

    if (switchValue) 
    {
        this.setState({showBtn:'flex',showDefaults:'none'});
    }

    else 
    {
        this.setState({showBtn:'none',showDefaults:'flex'});
    } 

  }

  uploadImage () {
    
  }

  logout () {
    debugger;

      let keys = ['dataSource','course','loggedin','dataSourceComplete'];

      AsyncStorage.multiRemove(keys).then((success) => { 
        console.log(success);
        console.log("Clear Device Storage");
        debugger;
      }).catch((error) => {
        debugger;
        console.log(`Error : ${error}`);
      });


      NavigationService.navigate('Login');

  }

  update () {

    debugger;
  //   for (var key in this.state) { // validation 
  //     if (this.state[key] == "") {
  //         console.log(`Please fill in ${key}`);

  //         alert(`Please fill in ${key}`);
         
  //         return;  
  //     } 
  // }

  console.log(this.state);

    this.setState({showAlert:true})
    setTimeout(() => {this.setState({showAlert:false})},2000);
    return;

  }
 
  render() { 

    return(
          <View style={styles.MainContainer}>
          <ProfileHeader/>
          <AlertPop showAlert={this.state.showAlert} icon="user-following" color="#50C878" Message="Details Updated..!"/>
          <ScrollView>  
              <KeyboardAvoidingView>
                  <View style={{display:this.state.showDefaults}}>
                    <ProfileLayer icon="user" placeholder={this.state.username} />
                    <ProfileLayer icon="envelope" placeholder={this.state.username} />
                    <ProfileLayer icon="support" placeholder="Help"/>
                    <ProfileLayer icon="exclamation" placeholder="About" />
                  </View>
                        <Animated.View style={[styles.buttonContainer,{paddingTop:20,paddingBottom:0,display:this.state.showBtn}]}>
                            <TextInput 
                            style={styles.button}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText = { password =>this.setState({password})}
                            underlineColorAndroid='transparent' 
                            />
                          <Icon name="lock-open" size={20} color="#ff4c4c"/>
                        </Animated.View>
                        <Animated.View style={[styles.buttonContainer,{paddingTop:0,paddingBottom:0,display:this.state.showBtn}]}>
                            <TextInput 
                            style={styles.button}
                            placeholder="name"
                            onChangeText = { name =>this.setState({name})}
                            underlineColorAndroid='transparent' 
                            value = {this.state.username}
                            />
                          <Icon name="user" size={20} color="#ff4c4c"/>
                        </Animated.View>
                        <Animated.View style={[styles.buttonContainer,{paddingTop:0,paddingBottom:0,display:this.state.showBtn}]}>
                            <TextInput 
                            style={styles.button}
                            placeholder="Surname"
                            onChangeText = { surname =>this.setState({surname})}
                            underlineColorAndroid='transparent' 
                            value = {this.state.username}
                            />
                          <Icon name="user" size={20} color="#ff4c4c"/>
                        </Animated.View>
                        <Animated.View style={[styles.buttonContainer,{paddingTop:0,paddingBottom:0,display:this.state.showBtn}]}>
                            <TextInput 
                            style={styles.button}
                            keyboardType="numeric"
                            placeholder="Number"
                            onChangeText = { number =>this.setState({number})}
                            underlineColorAndroid='transparent' 
                            value ='0728668908'
                            />
                          <Icon name="phone" size={20} color="#ff4c4c"/>
                        </Animated.View>
                        <Animated.View style={[styles.buttonContainer,{paddingTop:0,paddingBottom:0,display:this.state.showBtn,alignContent: 'center',justifyContent: 'center',}]}>                   
                          <TouchableHighlight style={{padding:'2%'}}>
                              <PhotoUpload
                                    onPhotoSelect={avatar => {
                                      if (avatar) {
                                        debugger;
                                        console.log('Image base64 string: ', avatar)
                                        alert(avatar);
                                      }
                                    }}>
                                    <Image
                                    source={require('../../../assets/avatar.jpg')}
                                    style={{ width: 100, height: 100,borderRadius:50,padding:0}}
                                    
                                  /> 
                              </PhotoUpload>
                          </TouchableHighlight>
                        </Animated.View>
                        <View style={[styles.buttonContainer,{paddingTop:0,paddingBottom:0}]}>
                            <TouchableHighlight style={styles.button}>
                                <Text style={styles.textStyle}>Edit Details</Text>
                            </TouchableHighlight>
                            <Switch
                            style={{marginLeft:'-8%'}}
                            onValueChange ={(value) => this.switchValue(value)}
                            value = {this.state.switchValue}/>
                        </View>
                        <View style={[styles.View,{paddingBottom:'20%'}]}>
                          <TouchableHighlight 
                              onPress={this.update.bind(this)} 
                              style={[styles.button,{backgroundColor:'#46b8da',borderWidth:0,width:'100%',marginBottom:5,display:this.state.showBtn}]}>
                            <Text style={{color : '#fff',fontWeight:'bold',textAlign:'center',fontSize:14,paddingBottom:0,letterSpacing:10,...Platform.select(spacing)}}>
                              Update
                            </Text>
                          </TouchableHighlight>
                          <TouchableHighlight onPress={this.logout.bind(this)} style={[styles.button,{backgroundColor:'#ff4c4c',borderWidth:0,width:'100%',display:this.state.showDefaults}]}>
                            <Text style={{color : '#fff',fontWeight:'bold',textAlign:'center',fontSize:14,paddingTop:0,letterSpacing:10,...Platform.select(spacing)}}>
                              Logout
                            </Text>
                          </TouchableHighlight>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
         </View>  
      )   
  } 
}  

const styles = StyleSheet.create({
  button : {
      width:'95%',
      borderRadius:5,
      marginBottom:10,
      height: 40,
      justifyContent : 'center',
      borderBottomWidth:1,
      borderColor: '#c8c8c8',
  },
  textStyle :{
      color:'#666666',
      fontSize: 16,
      textAlign:'left'
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
  },
  View  : {
    margin:20,
    marginTop:0
  },
  header : {
    fontWeight: 'bold',
    fontSize: 20,
  },
  MainContainer :{
    justifyContent: 'center',
    alignContent: 'center',
  }
})