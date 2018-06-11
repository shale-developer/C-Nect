import React from 'react';
import { Text,
         Image,
         ScrollView,
         View,
         FlatList,
         ActivityIndicator,
         Button, StyleSheet, AsyncStorage, Alert,TouchableHighlight ,ImageBackground ,TouchableOpacity ,Platform , Modal} from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import { StackNavigator } from 'react-navigation'; 
import axios from 'axios';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AwesomeAlert from 'react-native-awesome-alerts';

//

import AlertPop from '../reuse/alert';

var array , arrayTwo = [];
var user_id;

import ProfileHeader from '../reuse/profileHeader';

export default class MyCourses extends React.Component {
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      username : '',
      defaultSync :true,
      dataComplete : [],
      user_id : 0,
      showSaveAlert : false,
      message : ''
    }
  }


  navigateToLocale(item) {

    console.log("item");
    
    this.props.navigation.navigate('Course Menu',{item});
  

  }

  static navigationOptions = { 
    header :null,
  }
  //This function is going to be moved to the download items page

    async getCourseList ()  {

      await AsyncStorage.multiGet(['dataSource' ,'dataSourceComplete']).then((p) => {
        
        debugger;

        array = JSON.parse(p[0][1]);
        if (p[1][1] == null)
          arrayTwo = [];
        else
          arrayTwo = JSON.parse(p[1][1]);

        if (p == "" || p == null) {
          if (array[0][1].defaultSync) {
              this.generateCourseList();
              console.log("default sync")
          }
            else {
              this.defaultList();
              console.log("Don't default sync");
            } 
        }
        else {


          debugger;
          if (p[1][1] == null ) { 
            this.setState({
              isLoading:false,
              dataSource : array,
              dataComplete : [],
            })
           } else {
                      for (var i = 0, len = arrayTwo.length; i < len; i++) { 
                          for (var j = 0, len2 = array.length; j < len2; j++) { 
                              if (arrayTwo[i].course_id === array[j].course_id) {
                                  array.splice(j, 1);
                                  len2=array.length;
                              }
                          }
                      }
                        this.setState({
                          isLoading:false,
                          dataSource : array,
                          dataComplete : arrayTwo,
                        })
                      }
                  }
          debugger;

    


    debugger;
       console.log("loaded from storage...");
      }).catch((error) => {
        this.defaultList();
        console.log(`Error: ${error}`);

      });

    }

   async componentDidMount() {

    AsyncStorage.getItem('dataSource').then((success) => { 
      if (success == null)
        this.defaultList();
      else  
        this.getCourseList();
    }).catch((error) => {
      console.log(`error : ${error}`);
    })
    
   


  }

  // functions 
  
  defaultList () {
        debugger
            axios.post('https://c-nnect.testurl.co/api/default.php').then((success) => {
           
                  this.setState({
                    isLoading: false,
                    dataSource:success.data.menu_items,
                    defaultSync:false
                  });
              try {                 // handle device Storage

                  AsyncStorage.setItem("dataSource",JSON.stringify(success.data.menu_items)).then((success) => {
                    alert("Welcome to Cnnect , watch view intro course to get started :) ! ");

                }).catch((error) => { 
                    console.log(`Error: ${error}`); 
                });
              } catch (error) {
                
                console.log(`Caught Error: ${error}`)
              } 

        }).catch((error) => {
            console.log(error);
        });
  }
async generateCourseList () {
          
          await AsyncStorage.getItem('loggedin').then((p) => {
  
            user_id = parseInt(JSON.parse(p).user_id);

                axios.post('https://c-nnect.testurl.co/api/menu_builder.php',
                { user_id: user_id }).then((success) => {

            
                      console.log(success);
                      this.setState({
                        isLoading: false,
                        dataSource:success.data.menu_items,
                        defaultSync : true,
                      });
                  try {                 // handle device Storage

                      AsyncStorage.setItem("dataSource",JSON.stringify(this.state.dataSource)).then((success) => {
                        this.setState({
                          showSaveAlert:true,
                          message:"Courses Successfully Updated ! "
                        });
                          setTimeout(()=> {
                            console.log("yeah!!!");
                            this.setState({showSaveAlert:false})
                          },2000);
                          console.log(success);
                          debugger;
                    }).catch((error) => { 
                        console.log(`Error: ${error}`); 
                    });
                  } catch (error) {
                    
                    console.log(`Caught Error: ${error}`)
                  } 

            }).catch((error) => {
                console.log(error);
            });

          }).catch((error) => { 
            debugger;
            console.log(error);

          })

        AsyncStorage.getItem('dataSourceComplete').then((p) => {
          debugger;
          
          this.setState({dataComplete:JSON.parse(p)})

         
        }).catch((e) => {
          console.log(e);
        })

        this.getCourseList();
  }
 
  currentSelected = (props) => {
    Alert.alert('called');
  }

  list (obj = {}) {
    
    this.props.navigation.navigate('CourseList',{info : obj});
  }

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20 , justifyContent:'center'}}>
          <ActivityIndicator size="large"   color='#00adee'/>
        </View>
      )
    }

    return(
      //https://blog.binoy.io/simple-carousel-in-react-native-ae71cac279de
      <PTRView onRefresh={this.generateCourseList.bind(this)}>
      <View>
            <ProfileHeader/>
            <View>
              <AlertPop icon="emotsmile" color="#90c73e" showAlert={this.state.showSaveAlert} Message={this.state.message}/>
              <ScrollView>
                  <View style={[styles.backSection]}>
                    <View style={styles.textHeader}>
                        <View style={{width:'41%'}}>
                            <Text style={styles.textStyle}>My Courses</Text>
                        </View> 
                        <View style={{width:'95%'}}>
                          <TouchableHighlight onPress={()=>this.list(this.state.dataSource)}>                  
                            <Text style={styles.seeAll}>See all <FontAwesome>  {Icons.angleRight}</FontAwesome> 
                            </Text>
                          </TouchableHighlight> 
                        </View>
                      </View>
                  <ScrollView horizontal>
                    <FlatList horizontal
                      data={this.state.dataSource}
                      renderItem={
                        ({item}) => {
                          if (this.state.dataSource!=[]) {
                       
                            return (  
                              <View style={styles.iconStyle}>
                                <TouchableOpacity onPress={()=>this.navigateToLocale(item)}>
                                  <ImageBackground  
                                  style={styles.imageStyleScore} 
                                  source = {{uri: item.icon_url}} 
                                  >
                                    <View style={styles.scoreBorder}>
                                      <Text style={styles.score}></Text>
                                    </View> 
                                  </ImageBackground>
                                </TouchableOpacity>
                                  <Text 
                                    style={{padding:10,paddingBottom:0,color:'#808080',fontWeight:'bold'}}>{item.course_title } {"\n"}
                                  </Text>
                                  <Text style={styles.iconStar}><FontAwesome>{Icons.star}</FontAwesome>  4.5</Text>
                              </View>
                                ) 
                            } else {
                              return (
                                <View style={styles.iconStyle}>
                                    <Text style={styles.textStyle}>You currently have no new task !</Text>
                                </View>
                              )
                            } 
                       }                        
                  }
                      keyExtractor={(item, index) => index.toString()}                 
                    /> 
                  </ScrollView>
                </View>
                {/* Start Course Complete Section  */}
                <View style={styles.backSection}>
                    <View style={styles.textHeader}>
                        <View style={{width:'41%'}}>
                            <Text style={styles.textStyle}>Courses Complete</Text>
                        </View> 
                        <View style={{width:'95%'}}>
                          <TouchableHighlight onPress={()=>this.list(this.state.dataComplete)}>                  
                            <Text 
                            style={styles.seeAll}>See all <FontAwesome>  {Icons.angleRight}</FontAwesome> 
                            </Text>
                          </TouchableHighlight> 
                          </View>
                      </View>
                  <ScrollView horizontal>
                    <FlatList horizontal
                      data={this.state.dataComplete}
                      renderItem={({item}) => {
                            return (
                              <View style={styles.iconStyle}>
                                <TouchableOpacity onPress={()=>this.navigateToLocale(item)}>
                                  <ImageBackground  
                                  style={styles.imageStyleTag} 
                                  source = {{uri: item.icon_url}} 
                                  >
                                    <View style={styles.complete}>
                                      <Text style={styles.tag}>COMPLETE</Text>
                                    </View> 
                                  </ImageBackground>
                                </TouchableOpacity>
                                  <Text 
                                  style={{padding:10,paddingBottom:0,color:'#808080',fontWeight:'bold'}}>{item.course_title } {"\n"}
                                  </Text>
                                <Text style={styles.iconStar}><FontAwesome>{Icons.star}</FontAwesome>  4.5</Text>
                              </View>
                            )
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </ScrollView>
                </View>
              {/* New Courses Section   */}
                <View style={styles.backSection}>
                    <View style={styles.textHeader}>
                        <View style={{width:'41%'}}>
                            <Text style={styles.textStyle}>New Courses</Text>
                        </View> 
                        <View style={{width:'95%'}}>
                          <TouchableHighlight onPress={()=>this.list(this.state.dataSource)}>                   
                            <Text 
                            style={styles.seeAll}>See all <FontAwesome>  {Icons.angleRight}</FontAwesome> 
                            </Text>
                          </TouchableHighlight> 
                          </View>
                      </View> 
                      <ScrollView horizontal>
                    <FlatList horizontal
                      data={this.state.dataSource}
                      renderItem={({item}) => {
                              return (
                                <View style={styles.iconStyle}>
                                <TouchableHighlight onPress={()=>this.navigateToLocale(item)}>
                                     <ImageBackground  
                                    style={styles.imageStyleTag} 
                                    source = {{ uri: item.icon_url }} 
                                    >
                                      <View style={styles.new}>
                                        <Text style={styles.tag}>NEW</Text>
                                      </View> 
                                    </ImageBackground>
                                  </TouchableHighlight>
                                      <Text 
                                      style={{padding:10,paddingBottom:0,color:'#808080',fontWeight:'bold'}}>{item.course_title } {"\n"}
                                    </Text>
                                    <Text style={styles.iconStar}><FontAwesome>{Icons.star}</FontAwesome>  4.5</Text>
                                </View>
                              )
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
        </View>
      </PTRView>
    );
  }

}



const styles = StyleSheet.create({
  backSection : { 
    backgroundColor : '#fff',
    borderRadius: 15,
    height : '30%',
    margin : 0,
    marginTop: 10,
    marginBottom: 5,
    ...Platform.select({
      ios  : {
        shadowOpacity: 0,
      },
      android : {
        shadowOpacity: 1,
      }
    }),
  },
  textHeader : {
   flex : 0  ,
   flexDirection : 'row', 
   borderBottomWidth: 1,
   borderColor : '#eee',
   paddingBottom:5,
   marginBottom: -10
  },
  viewHeight: {
    flex : 1,
    flexDirection: "row", 
    alignSelf: 'flex-start',
    width:500, 
  },
  iconStyle: {
    flex: 1,
    width:155,
    height:255,
    marginRight: 2,
    marginLeft : 20
  },
  imageStyleScore: {
    width:140,
    height:120,
    marginTop:30,
    marginLeft:10,
    justifyContent :'center',
  },
  imageStyleTag :{
    width:140,
    height:120,
    marginTop:30
  },
  score :{
    textAlign :'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },  
  tag :{
    textAlign :'center',
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',

  },  
  scoreBorder : {
    // borderWidth: 4,
    // borderColor: '#50C878',
    // padding:10,
    // width:80,
    // height:80,
    // alignSelf:'center',
    // borderRadius:50 ,
    // justifyContent:'center'
  }, 
  complete : { 
    width:80,
    borderRadius : 20,
    backgroundColor: '#90c73e',
    marginTop : 20,
    marginLeft: 10,
    height:20,
    justifyContent:'center'
  },
  new : { 
    width:60,
    borderRadius : 20,
    backgroundColor: '#00adee',
    marginTop : 20,
    marginLeft: 10,
    height:20,
    justifyContent:'center'
  },
  textStyle : {
    textAlign : 'left',
    paddingLeft: 12, 
    paddingTop: 12,
    fontSize : 16,
    color : '#666666'
  },
  seeAll : {
    textAlign : 'center',
    padding : 12,
    fontSize : 16, 
    color : '#c8c8c8'
  },
  iconStar : {
    paddingLeft : 8,
    color : '#c8c8c8'
  },
  courseName : {
    padding:10,
    marginBottom: -1,
  },
  icon : {
    fontSize:20,
    color :'#666666',
    fontWeight: "100",
  }
});