import React, {component} from 'react';
import { WebView, StyleSheet, Alert, AsyncStorage, Platform } from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';

var SQLite = require('react-native-sqlite-storage');

//var temp = SQLite.deleteDatabase({ name : "resource",location: "~resources.db"});

var db = SQLite.openDatabase({ name : "resource",createFromLocation: "~resources.db"});

//

export default class Course extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content : ''
        }
    }
    static navigationOptions = { header : null ,
      tabBarIcon: ({ tintColor }) => (   
        <Text style={{fontSize:20,color:'#50C878'}}>
         <FontAwesome>{Icons.bookmark}</FontAwesome>
       </Text>
       ),
    };

    _viewCount(resourceToUpdate) {

        // handle increment function here
    
        db.transaction((tx) => {
          tx.executeSql(`UPDATE resources SET [viewed] = [viewed] + 1 where id = "${resourceToUpdate}"`, [], (tx, results) => {
              // Get rows with Web SQL Database spec compliance.  
            },(error) => {
              console.log(JSON.stringify(error) + "line here");
            }, 
          (error) => {
            console.log(JSON.stringify(error));
          });
        });
      } 

    componentDidMount () {

        const { params } = this.props.navigation.state;
        const selectedResource = params ? params.item.course_id : null;

        if (selectedResource != null || selectedResource != "")
            this._viewCount(selectedResource);
    
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM resources where id = "${selectedResource}"`, [], (tx, results) => {
              // Get rows with Web SQL Database spec compliance.
              var len = results.rows.length; 
              let row = results.rows.item(0);
                this.setState(
                  {
                    content:row.content 
                  })       
                 
            },(error) => {
              console.log(JSON.stringify(error) + "line here");
            }, 
          (error) => {
            console.log(JSON.stringify(error));
          });
        });
    }


render() {
    return (
      <WebView 
        source={{ html: this.state.content}}
        style={styles.iframeHeight}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  iframeHeight: {
   justifyContent: 'center',
   alignItems: 'center',
   flex:1,
   marginTop: (Platform.OS) === 'ios' ? 20 : 0
  }
});
