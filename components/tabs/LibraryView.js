import React, {component} from 'react';
import { WebView, StyleSheet, Alert, AsyncStorage, Platform ,Text , View , Image, ImageBackground ,ActivityIndicator} from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// 

import ProfileHeader from '../reuse/profileHeader';
var email = "";
var url = '';
//

export default class LibraryView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:true
    }
  }
  static navigationOptions = { 
    header :null,
  }

  saveMenu = (data)=> {
    console.log(JSON.parse(data).title);
    AsyncStorage.setItem('menu_file', data, () => {});
    Alert.alert('Content Save Success');
  }
 
  saveRecord (data) {

    var obj = JSON.parse(data).menu_items; 
    debugger; 
    console.log("WTF");
    console.log(obj);
    this.props.navigation.navigate('My Courses', {
      itemId  : 0,
      otherParam : data
    })
  }

 componentWillMount () {

}

 componentDidMount() {


  }
   
  getThisMenu () {
    this.forceUpdate();
  }

render() {

    debugger;

    const userData = this.props.navigation.state.params.params;
    const email = userData.email;
    const id  = userData.user_id;
    const type = userData.userDetails[0].user_type;

    const url = `https://c-nnect.testurl.co/api/library_api.php?user_id=${id}&user_type=${type}`
    debugger;

    return (
      <View style={{flex:1}}>
          <ProfileHeader/>
          <WebView source={{ uri : url }}
            style={styles.iframeHeight}  
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={(event) => { this.props.navigation.navigate('My Courses',{ selectedResource:event.nativeEvent.data })}}
          />   
          <Text onPress={()=>{this.getThisMenu.bind(this)}}></Text>
      </View>
    );
  }

  componentWillUpdate() {

    console.log("will updated");
  }

  componentDidUpdate () {
    console.log("updated");
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
