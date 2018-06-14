import React from 'react';
import {Text, 
  LayoutAnimation , 
  TouchableHighlight ,
  UIManager , 
  KeyboardAvoidingView, 
  Button,
  StyleSheet, 
  Alert,
  ScrollView, AsyncStorage, Platform , View , WebView ,ImageBackground , FlatList , TouchableOpacity  } from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import HeaderBar from '../../reuse/headerBar';

//

const spacing  = {ios : { letterSpacing : 0 , lineHeight : 20 } };

export default class Profile extends React.Component {

 
  static navigationOptions =  { header:(<HeaderBar name=""/>)}

  constructor(props) {
    super(props);

    this.state = {
      videoUrl : '',
      title : '',
      CPD_points : 0,
      rating : '',
      description : '',
      course_id : '',
      video : ''
    } 
  }

  componentDidMount() {
    
    const params = this.props.navigation.state.params.params;
    const title = params.course_title;
    let video = '';

    if (title == "Austell")
      video = "https://www.youtube.com/watch?v=BdUJLuCTsXI";
    else
      video =  "https://www.youtube.com/watch?v=p9tadP0T1N8";

    this.setState({video,title})
  }

  render() {

    debugger;

    debugger;
    return(
          <View style={styles.MainContainer}>
                <ScrollView>
                    <View style={{flex :0 , flexDirection:'row',padding:30}}>
                              <View>
                                  <Text style={{textAlign:'left',fontSize:15,padding:5,letterSpacing:10 ,...Platform.select(spacing) }}>
                                  {this.state.title}
                                  </Text>   
                              </View>                   
                                      <View>          
                                      <Text style={{textAlign:'left',color:'#00adee',fontSize:15,padding:5,letterSpacing:10 , ...Platform.select(spacing)}}>
                                          <FontAwesome>{Icons.star}  </FontAwesome>  
                                          4.5
                                      </Text>
                                  </View>
                                  <View>           
                                  <Text style={{textAlign:'right',color:'#00adee',fontSize:15,padding:5,paddingRight:0,letterSpacing:10 , ...Platform.select(spacing)}}>
                                        ( 2 CPD  Points)
                                  </Text>
                              </View>
                         </View>
                         <View style={{padding : 30,paddingTop:0}}>
                            <WebView
                            source={{uri: this.state.video }}
                            style={{marginTop: 0,height:200,borderRadius:20}}
                            />
                                <Text style={{textAlign:'left',fontSize:15,padding:5,letterSpacing:10 , ...Platform.select(spacing)}}>
                                 Course Description 
                            </Text>   
                            <Text style={{textAlign:'left',fontSize:15,padding:5,letterSpacing:10, ...Platform.select(spacing)}}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            </Text>   
                         </View>                        
                         <View style={{alignContent:'center',justifyContent:'center'}}>
                            <TouchableHighlight style={[styles.button,{backgroundColor:'#90c73e'}]}>
                              <Text style={{color : '#fff',textAlign:'center',fontSize:14,padding:10,letterSpacing:10 , ...Platform.select(spacing)}}>
                                GET THIS
                              </Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={[styles.button,{backgroundColor:'#00adee',marginTop:-10}]}>
                            <Text style={{color : '#fff',textAlign:'center',fontSize:14,padding:10,letterSpacing:10 , ...Platform.select(spacing)}}>
                              BACK
                            </Text>
                          </TouchableHighlight>
                         </View>
                    </ScrollView>
              </View>  
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
  new : { 
    width:40,
    borderRadius : 20,
    backgroundColor: '#00adee',
    marginTop : 20,
    color:'#fff',
    fontWeight: 'bold',
    textAlign:'center'
  },
  button :{
    width:'90%',
    borderRadius:5,
    marginBottom:20,
    height: 40,
    alignSelf: 'center',
    borderBottomWidth:1,
    borderColor: '#c8c8c8',
  },iconStyle: {
    flex: 1,
    width:155,
    height:255,
    marginRight: 2,
    marginLeft : 10
  },
  imageStyleScore: {
    width:155,
    height:155,
    marginTop:30,
    justifyContent :'center',
  },
  imageStyleTag :{
    width:155,
    height:155,
  },
}); 