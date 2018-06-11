import React, {component} from 'react';
import { WebView, StyleSheet, Alert, AsyncStorage, Platform ,Text , View , Image, ImageBackground ,ActivityIndicator} from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
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

async componentDidMount() {

    await AsyncStorage.getItem('loggedin').then((p) => {
        
        console.log('will mount'); 
        userData = JSON.parse(p);
        this.props.navigation.navigate('Library',{params:userData})
        debugger;
       }).catch((error) => { console.log(`Error : ${error}`);})
    
  }
   
render() {
    
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
        <Image
        source={require('../../../assets/loader.gif')}
        style={{width:300,height:150,alignSelf:'center'}}
        />
      </View>
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
