import React from 'react';
import { Button, View, Text, StyleSheet, AsyncStorage, TouchableHighlight, Image, Alert ,Platform ,AppState , StatusBar} from 'react-native';
import { StackNavigator , SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import SyncStorage from 'sync-storage';


// components 

import Welcome from './components/welcome';
import Login from './components/login'; 
import Registration from './components/registration';

// landing Page

import Home from './components/home';

// tab 

import Main from './components/main';

// Social Media Auth Components 

import LinkedIn from './components/social/linkedIn';

// tab routes 

import LibraryView from './components/tabs/LibraryView';
import MyCourses  from './components/tabs/MyCourses';
import MyProfile from './components/tabs/MyProfile';

import NavigationService from './components/NavigationService';


// add test fairy config

const TestFairy = require('react-native-testfairy');

// handle global functions and usage 

var currentState = false;
 debugger;
 //
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

 componentDidMount() {

    if (Platform.OS == "android")
    TestFairy.begin('8825ba1b96b72c536d3e647e923ccbf58559d80a');
  }

  render() {return <RootStack 
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
     />;}  
}


const RootStack = StackNavigator( 
  {
    Home : {
      screen : Home
    },
    Main :{
      screen : Main
    },
    Welcome : {
      screen: Welcome
    },
    Registration : {
      screen : Registration
    },
    Login : {
      screen : Login
    }
    ,
    LinkedIn : {
      screen : LinkedIn
    }
  }, 
  { 
    initialRouteName: "Home"      
  } 
);
  
const styles = StyleSheet.create({
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
  }
});