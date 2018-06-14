import React from 'react';
import {Text, 
  LayoutAnimation , 
  TouchableHighlight ,
  UIManager , 
  KeyboardAvoidingView, 
  Button,
  StyleSheet, 
  Alert,
  ScrollView, AsyncStorage, Platform , View , Image , ImageBackground} from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
//

import AlertPop from '../reuse/alert';
import PTRView from 'react-native-pull-to-refresh';

//

import NavigationService from '../../components/NavigationService';

if(Platform.OS == "android") {
  var SQLite = require('react-native-sqlite-storage');
  var db = SQLite.openDatabase({ name : "resource",createFromLocation: "~resources.db"})
}

// resuable

import ProfileHeader from '../reuse/profileHeader';
import { setTimeout } from 'core-js';

// globals

const courseList = [];
let courses = [];
const spacing  = { ios : { letterSpacing : 0 } };

// 

export default class Profile extends React.Component {

  static navigationOptions = { 
    header :null,
  }

  constructor(props) {
    super(props);

    this.state = {
      viewed : 0,
      enrolled : 0,
      complete : 0,
      quzzies_taken : 0 ,
      CPD_hours_gains : 0,
      courses : {},
      rewards:  0,
      resources : [],
      userType : '',
      email : '',
      showAlert : false,
      message : '',
      icon: 'like',
      color : ''
    } 


  }





  list( ) {

    console.log("hit");

  }
  
  logout () {
    debugger;
    AsyncStorage.getItem("loggedin").then((success) => {

      var user = JSON.parse(success).email;

      alert(`Goodbye ${user}`);
      NavigationService.navigate("Login",{});

    }).catch((error)=>{

      console.log(`Error : ${error}`)

    })

  }

  claim () {

  }
 
  componentDidMount() {


    AsyncStorage.getItem("course").then((value) => {

      var currentCourseDetails  = JSON.parse(value);
      debugger;
      if (value == null) {
           return;
        } else {
          this.setState({
            complete : currentCourseDetails.complete ,
            enrolled : currentCourseDetails.enrolled ,   
            quzzies_taken : currentCourseDetails.enrolled,
            CPD_hours_gains : currentCourseDetails.gained
          }) 
        }
    }).catch((error) => {

      console.log("error");

    })


  } 

  updateParams () {
      
      AsyncStorage.getItem("course").then((value) => {
        var currentCourseDetails  = JSON.parse(value);
        debugger;
        if (value == null) 
        {
            this.setState({
            
            color : '#e50000',
            showAlert:true,
            message : 'Nothing to update',
            icon : "close"
          });

            setTimeout(() => 
            {

              this.setState({showAlert:false})

            },2000);
            return;
          } 
          else 
          {
              this.setState({
                complete : currentCourseDetails.complete ,
                enrolled : currentCourseDetails.enrolled ,   
                quzzies_taken : currentCourseDetails.enrolled,
                CPD_hours_gains : currentCourseDetails.gained,
                showAlert:true,
                message : 'Updated Profile..!',
                icon : "like",
                color : '#90c73e'
              }) 
              setTimeout(() => {
                this.setState({showAlert:false})
              },2000)
          }
      }).catch((error) => {

        console.log("error");

      })
  
    }

  render() { 


  
    return(
          <PTRView  onRefresh={this.updateParams.bind(this)}>
              <View style={styles.MainContainer}>
              <ProfileHeader/>
                <AlertPop showAlert={this.state.showAlert} icon={this.state.icon} color={this.state.color} Message={this.state.message}/>
              <ScrollView>
                    <View style={{flex :0 , flexDirection:'row'}}>
                      <Text style={styles.textStyle}>
                      My Performance
                      </Text>      
                    </View>   
                      <View style={{flex :0 , flexDirection:'row'}}>
                        <Text  style={styles.textStyleNo}>{this.state.enrolled} </Text>
                        <Text onPress={()=>{this.props.navigation.navigate('Complete',{ type : 'enrolled' })}} style={styles.textStyle}>
                          Courses Enrolled into 
                        </Text>      
                      </View>   

                    <View style={{flex :0 , flexDirection:'row'}}>
                      <Text style={styles.textStyleNo}>{this.state.complete}</Text>
                        <Text onPress={()=>{this.props.navigation.navigate('Complete',{ type : 'complete' })}} style={styles.textStyle}>
                            Courses Complete
                        </Text>   
                    </View>

                    <View style={{flex :0 , flexDirection:'row'}}>
                    <Text style={styles.textStyleNo}>{this.state.quzzies_taken}</Text>
                      <Text onPress={()=>{this.props.navigation.navigate('Complete',{ type : 'taken' })}} style={styles.textStyle}>
                            Quizzes Taken  
                        </Text>  
                    </View>

                    <View style={{flex :0 , flexDirection:'row'}}>
                    <Text style={styles.textStyleNo}>{this.state.CPD_hours_gains}</Text>
                        <Text onPress={()=>{this.props.navigation.navigate('Complete',{ type : 'gained' })}} style={styles.textStyle}>
                          Educoinns Gained 
                        </Text>
                      </View>

                    <View style={{flex :0 , flexDirection:'row'}}>
                    <Text style={styles.textStyleNo}>{this.state.viewed}</Text>
                      <Text onPress={()=>{this.props.navigation.navigate('Complete',{ type : 'viewed' })}} style={styles.textStyle}>
                            Couses Viewed 
                      </Text>
                    </View>
                  <View>
                    <Text style={styles.textStyle}>
                    Badges
                    </Text>    
                    <View style= {{alignItems: 'center',}}>
                    <Text style={{textAlign:'center',color:'#90c73e',fontSize:40,padding:10,letterSpacing:10,...Platform.select(spacing)}}>
                    <FontAwesome>{Icons.trophy} </FontAwesome>  
                    <FontAwesome>{Icons.trophy} </FontAwesome>  
                    <FontAwesome>{Icons.trophy} </FontAwesome>  
                    <FontAwesome>{Icons.trophy} </FontAwesome>  
                    <FontAwesome>{Icons.trophy}</FontAwesome>  
                </Text>
                      <Text style={{margin:10,marginBottom:20,fontWeight:'bold',fontSize:14}}>My Rewards: 123 Educoinns </Text>
                        <TouchableHighlight onPress={this.claim.bind(this)} style={[styles.button,{backgroundColor:'#00adee',borderWidth:0}]}>
                          <Text style={{color : '#fff',fontWeight:'bold',textAlign:'center',fontSize:14,padding:10,letterSpacing:10,...Platform.select(spacing)}}>
                            CLAIM REWARDS
                          </Text>
                      </TouchableHighlight>
                    </View>
                  </View>  
                </ScrollView>
            </View>  
         </PTRView>
      )   
  } 
}  

const styles = StyleSheet.create({
  header : {
    padding: 12,
    textAlign: 'left',
    fontSize : 16,
    color : '#808080',
  },
  textStyle : {
    textAlign : 'left',
    padding: 12,
    fontSize : 16,
    color : '#808080',
    marginTop: 21,
    marginLeft: 10,
  },
  textStyleDetails : {
    textAlign : 'left',
    padding: 12,
    fontSize : 16,
    color : '#808080',
    marginTop: 0,
    marginLeft: 10,
  },
  textStyleNo : {
    margin: 20,
    marginRight: 0,
    marginBottom:0,
    textAlign : 'center',
    padding: 12,
    paddingRight:18,
    paddingLeft:18,
    fontSize : 16,
    color : '#808080',
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 200,
    fontWeight:'bold'
  },
  MainContainer : {
      flex: 1,
      backgroundColor :'#fff'
  },
    button : {
        borderWidth: 2,
        borderColor: '#00adee',
        backgroundColor :'#00adee',
        width:300,
        borderRadius:10,
        marginBottom:20,
  }
}); 