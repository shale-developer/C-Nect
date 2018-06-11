import React, {component} from 'react';
import { WebView, StyleSheet, Alert, AsyncStorage, Platform, View , Text , ScrollView , TouchableHighlight} from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';

var SQLite = require('react-native-sqlite-storage');

//var temp = SQLite.deleteDatabase({ name : "resource",location: "~resources.db"});

var db = SQLite.openDatabase({ name : "resource",createFromLocation: "~resources.db"});
var courses = [];
//

export default class AllCourses extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list : []
        }
    }
    static navigationOptions = { 
      header : null,
    };


    componentDidMount () {
    
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM resources`, [], (tx, results) => {
              // Get rows with Web SQL Database spec compliance.
              var len = results.rows.length; 
              console.log(len);
              
            for (let index = 0; index < results.rows.length; index++) {  
    
              courses.push(results.rows.item(index)); 
            }

            this.setState({list:courses})

            },(error) => {
              console.log(JSON.stringify(error) + "line here");
            }, 
          (error) => {
            console.log(JSON.stringify(error));
          });
        });
    }


render() {

    const courseList = this.state.list.map((titleObj,index)=> {
        console.log(titleObj.title);
        return ( <View key={index}><Text style={styles.textStyle}>{titleObj.title}</Text></View>)  
    })


    return (
        <ScrollView>
            <Text style={styles.header}>
                Courses Enrolled In
            </Text>
            {courseList}
            <View style={{justifyContent:'center',margin:20,alignContent:'center',alignSelf:'center'}}>
              <TouchableHighlight onPress={() =>  this.props.navigation.goBack()} style={styles.button}>
                  <Text style={{color : '#00adee',textAlign:'center',fontSize:14,padding:10,letterSpacing:10}}>
                  Back
                  </Text>
              </TouchableHighlight>
          </View>
        </ScrollView>);
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
    }
  }); 