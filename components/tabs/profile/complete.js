import React, {component} from 'react';
import { WebView, StyleSheet, Alert, AsyncStorage, Platform, View , Text , ScrollView , TouchableHighlight , ImageBackground} from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

var count = 0;

// 

import HeaderBar from '../../reuse/headerBar'; 

import BarIcon from './barIcon'
//

export default class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            complete : 0 ,
            enrolled : 0,
            quzzies_taken : 0,
            CPD_hours_gains : 0,
            viewed : 0
        }
 
    }
    static navigationOptions = { 
        header:(<HeaderBar name="Profile" />),
    };
    componentDidMount () {
        
        const header = this.props.navigation.state.params.type.toLowerCase();
        this.setState({header});
        AsyncStorage.getItem("course").then((value) => {
            deubgger;
            var currentCourseDetails  = JSON.parse(value);
            if (value != "" || value != null) {
                this.setState({
                complete : currentCourseDetails.complete ,
                enrolled : currentCourseDetails.enrolled ,   
                quzzies_taken : currentCourseDetails.enrolled,
                CPD_hours_gains : currentCourseDetails.gained,
                viewed  : currentCourseDetails.enrolled
                });
            }
          }).catch((error) =>{
            console.log("error");
          })

    }

    renderCount () {

        debugger;
        const type = this.props.navigation.state.params.type.toLowerCase();

        switch (type) {
            case 'complete':
                count  = this.state.complete;
                header = `Number of completed courses : ${count}`
                break;
            case 'viewed':
                count  = this.state.viewed;
                header = `Number of viewed courses : ${count}`
                break;
            case 'taken':
                count  = this.state.quzzies_taken;
                header = `Number of courses taken : ${count}`
                break;
            case 'gained':
                count  = this.state.CPD_hours_gains;
                header = `Educoinns Gained So far  : ${count}`
                break;
            case 'enrolled':
                count  = this.state.enrolled;
                header = `Number of courses enrolled in : ${count}`
                break;
        }
    }

render() {

    this.renderCount();

    const courseList = this.state.list.map((titleObj,index)=> {
        console.log(titleObj.title);
        return (    
       <View key={index}  style={{flex :0 , flexDirection:'row'}}>
        <Text style={styles.textStyleNo}>{titleObj.viewed}</Text>
                <Text style={styles.textStyle}>
                    {titleObj.title}
                </Text>
            </View> )  
    })


    return (
        <View>
            <ScrollView>
                <Text style={styles.header}>
                    {header} 
                </Text>
                {courseList}
                <View style={{justifyContent:'center',margin:20,alignContent:'center',alignSelf:'center'}}>
                    <TouchableHighlight onPress={() =>  this.props.navigation.goBack()} style={styles.button}>
                        <Text style={styles.backButton}>
                        Back
                        </Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
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
    textStyle : {
      textAlign : 'left',
      padding: 12,
      fontSize : 16,
      color : '#808080',
      marginTop: 21,
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
    button :{
      borderWidth: 2,
      borderColor: '#00adee',
      borderRadius:100,
      width:160,
      marginBottom:20,
    },
    backButton : {
        color : '#00adee',
        textAlign:'center',
        fontSize:14,
        padding:10,
        letterSpacing:10
    }
  }); 