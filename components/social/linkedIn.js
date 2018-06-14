import React from 'react'
import { StyleSheet, View , AsyncStorage } from 'react-native'
import axios from 'axios';


import LinkedInModal from 'react-native-linkedin'
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
 
export default class LinkedIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      credentials : {},
      token : ''
    }
  }


  async successCallback (token) {

  debugger;
  this.setState(token);

  const access_token = token.access_token;
  const baseApi = 'https://api.linkedin.com/v1/people/'
  const params = [
    'first-name',
    'last-name',
    // add more fields here
  ]
  const qs = { format: 'json' }
   
  axios.get(baseApi,{headers:{
    Authorization: 'Bearer ' + access_token
  }}).then((success) => {

    console.log(success);
    debugger;
  }).catch((error) => {

    debugger;
    console.log(error);

  })

  const response = await fetch(
    `${baseApi}~:(${params.join(',')})?${querystring.stringify(qs)}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    }
  )
  const payload = await response.json()
  console.log(payload);
  debugger;

  AsyncStorage.setItem('loggedin',JSON.stringify(credentials)).then((success) => {
    console.log(credentials);
    this.props.navigation.navigate('Main', credentials);
}).catch((error)=>{
    this.setState({isLoading:false}); 
    console.log(error);
});




  }

  errorCallback (error) {

  debugger;

  console.log(`Error : ${error}`)
  
  }

  render() {

    const clientID = "78pr32qzrmw6t4";
    const clientSecret = "mWoOw7WsBemjTui5";
    const redirectUri  = "http://www.chuckshale.co.za";


    return (
      <View style={styles.container}>
        <LinkedInModal
          clientID={clientID}
          clientSecret={clientSecret}
          redirectUri={redirectUri}
          linkText = "Continue With Linkedin"
          onSuccess={(token) => this.successCallback(token)}
          onError={(error) => this.errorCallback(error)}
        />
      </View>
    )
  }
}