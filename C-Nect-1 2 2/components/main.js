import React from 'react';
import { 
  ImageBackground, 
  Text, 
  KeyboardAvoidingView, 
  Button, 
  StyleSheet, 
  ScrollView ,
  View ,WebView , AsyncStorage,Image,TouchableOpacity,TouchableHighlight , Platform } from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import { TabNavigator , StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

// Parent compontents

import LibraryView from './tabs/LibraryView';
import Profile from './tabs/MyProfile';
import MyCourses from './tabs/MyCourses';

// course children

import AllCourses from './tabs/children/allCourses'
import course from './tabs/children/course';
import new_course from './tabs/children/new_course';
import course_menu from './tabs/children/course_menu';
import Content from './tabs/children/content';
import ContentView from './tabs/children/contentView';
import Quiz from './tabs/children/quiz';
import QuizTemplate from './tabs/children/quizTemplate';
// profile children 

import Views from './tabs/profile/views';
import Complete from './tabs/profile/complete';
import user from './tabs/profile/user';

// library children 

import CourseList from './CourseList';
import temp from '../components/tabs/library/temp';

// settings children

import Welcome from './welcome';
import Registration from './registration';
import Login from './login';

// default routes

import Home from './home';


// IDK


import { lowerCase } from 'change-case';


var firstname = '';

class avator extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
} 
 
export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname : 'LISA'
    }

  }

  componentDidMount () {

      firstname = 'Tom';
  }


   static navigationOptions = 
  {
    headerLeft: null, 
    header:null,
    headerTitleStyle: {flex: 1, textAlign: 'center'},
    titleStyle :{
      textAlign: 'center',
    },
    headerTitleStyle: {
      color : '#fff'
    },
    headerStyle: {
      backgroundColor: '#50C878',
      borderWidth:0,
      elevation : 0,
      height:0 ,
    },
  }  

  render () {
  return (

    <Tabs/>

);
  }

}

const MyCourse = StackNavigator(
  {
    MyCourses : {
      screen: MyCourses,
    }, 
    Views :{
      screen : Views,
    },
    "Course Menu" : {
      screen : course_menu,
    },
    "New Course" : {
      screen : new_course
    }, 
    QuizTemplate : {
      screen : QuizTemplate,
    },
    CourseList  : {
      screen : CourseList,
    },
    Content : {
      screen : Content 
    },
    ContentView : {
      screen: ContentView
    },
    Quiz : {
      screen : Quiz
    }
  })

  const MyProfile = StackNavigator({   
    Profile : {
      screen : Profile,
    },
    AllCourses : {
      screen : AllCourses
    },
    Complete : {
      screen: Complete,
    },
  })

  const Libraries = StackNavigator({     
        temp : { screen: temp },
        Library   : { screen : LibraryView, },  
        Quiz   : { screen : QuizTemplate, },
  })

  const Settings = StackNavigator({
    User : {
      screen : user 
    },
  })
const Tabs = TabNavigator({
  "Courses" : 
  { screen : MyCourse ,
    navigationOptions : {
    tabBarIcon: ({ tintColor }) => (<Icon name="book-open" size={20} color={tintColor}/>),
    }
  },
  Profile   :
   { screen : MyProfile, 
    navigationOptions : {
      tabBarIcon: ({ tintColor }) => (<Icon name="user" size={20} color={tintColor} />),
    }
  },
  Library : { 
    screen : Libraries,
    navigationOptions : {
      tabBarIcon: ({ tintColor }) => (<Icon name="notebook" size={20} color={tintColor} />),
    }
  },
  Settings : {
    screen: Settings , 
    navigationOptions : {
      tabBarIcon: ({ tintColor }) => (<Icon name="settings" size={20} color={tintColor} />),
      
        }
    },
},
// {
//   initialRouteName: 'Courses',       
// }, 
{
  tabBarOptions : {
    showIcon : true,
    activeBackgroundColor : '#fff', 
    activeTintColor : '#50C878',
    inactiveTintColor:'black',
    indicatorStyle :'#50C878',
    labelStyle : {
      ...Platform.select({
        ios : {
          justifyContent : 'center',
        },
        android : {
          fontSize:10
        }
      }),
    },
    style : {
      backgroundColor : '#fff',
      ...Platform.select({
        ios : {
          justifyContent : 'center',
        },
      })
    },
  },
  tabBarPosition :"bottom",
},

) 

// Tabs configuration  

const styles = StyleSheet.create({
  bgContainer : {
    flex: 1,
    alignItems :'center',
    position: 'absolute',
    width: '100%',
    height: '100%', 
    justifyContent: 'space-evenly',
 },  
    viewlayout: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'black',
    },
    updatestyle: {
      width:250,
      marginBottom: 2,
      alignItems: 'center',
      color: 'white',
    },
    logoDisplay: {
      marginTop:20,
    },
    carouselHeight:{
      marginBottom:125,
    },
    complete : { 
      width:100,
      borderRadius : 20,
      backgroundColor: '#90c73e',
      marginTop : 20
    },
    new : { 
      width:60,
      borderRadius : 20,
      backgroundColor: '#00adee',
      marginTop : 20
    },
  });