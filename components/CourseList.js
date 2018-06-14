import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ActivityIndicator, 
         ListView, Text, View, Alert,Image, Platform ,
         ScrollView ,FlatList,TouchableOpacity, 
         ImageBackground , TextInput } from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// 

import HeaderBar from './reuse/headerBar';

//class CourseList extends Component {
export default class CourseList extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        dataSource : [],
        count : 0
      }
    }
    
    static navigationOptions = { 
      header:(<HeaderBar name="My Courses"/>),
    };

    componentDidMount() {

      this.renderCourseList();

        
    }    

    renderCourseList  () 
    {

        let source = this.props.navigation.state.params.info;
        let count = 0;
        debugger;
        
        if (source.length == 0 )
          count = 0
        else 
          count = source.length

        this.setState({
          dataSource : source,
          count 
        })

        debugger;

    }

    createProgress () 
    {
       var quizzes =  [];
       
    }

    navigateToLocale(obj = {}) {
      
     
      this.props.navigation.navigate("New Course",{params : obj})
      debugger;
    }

    render() {

 
  //  }

   return (

     <View>
          <View style={styles.innerInput}>
            <TextInput 
                style={[styles.input,{borderBottomWidth:1,width:'90%',borderColor:'#808080',marginLeft:10}]}
                placeholder="Search..."
                underlineColorAndroid='transparent'    
                placeholderTextColor="#808080" 
                onChangeText = {email => this.setState({email: email.toLowerCase()})}
            /> 
            <Text style={styles.searchIcon}><Icon name="magnifier" size={18}/></Text>
          </View> 
          <View style={{alignItems:'center'}}>
            <Text style={styles.textHeader}>You currently have {this.state.count} course(s) </Text>
          </View>
        <ScrollView>
        <FlatList style={{paddingBottom:'35%'}}
          data={this.state.dataSource}
          renderItem={({item}) => {
            //<Image source={require('../assets/images/placeholder.png')} />
            return (  
              <View style={{flex:0,flexDirection:'row',backgroundColor:'#fff',margin:10,borderRadius:10}}>
                <View style={styles.iconStyle}>
                  <TouchableOpacity onPress={()=>this.navigateToLocale(item)}>
                    <ImageBackground  
                    style={styles.imageStyleScore} 
                    source = {{ uri : item.icon_url }} 
                    >
                      <View style={styles.scoreBorder}>
                        <Text style={styles.score}>8 / 15</Text>
                      </View> 
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
                  <View style={styles.iconStyle}>
                    <Text style={{paddingTop:25,paddingBottom:0,color:'#808080',fontWeight:'bold'}}>{item.course_title } {"\n"} </Text>
                    <Text style={{marginRight:170}}>
                       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    </Text>
                </View>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        /> 
      </ScrollView>
     </View>
   );
 }
}

const styles = StyleSheet.create({
  backSection : { 
    backgroundColor : '#fff',
    borderRadius: 15,
    height : 200,
    margin : 0,
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
  input : {     
    width: 300 ,
    color :'black',
    fontSize:20,
    marginBottom: 0, 
    fontFamily: 'Roboto-Regular', 
    paddingLeft: 10
 }, 
  innerInput : {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    height : 50,
    ...Platform.select({
        ios : {
            margin : 10,

        },
        android : {
            margin :  0,
        }
    }),
 },
  textHeader : {
   paddingTop: 20,
   fontSize: 20
  },
  viewHeight: {
    flex : 1,
    flexDirection: "row", 
    alignSelf: 'flex-start',
    width:500, 
  },
  iconStyle: {
    flex: 0,
    height:200,
    marginLeft: 10,
  },
  imageStyleScore: {
    width:140,
    height:130,
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
    marginLeft: 10
  },
  new : { 
    width:60,
    borderRadius : 20,
    backgroundColor: '#00adee',
    marginTop : 20,
    marginLeft: 10
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
    color : '#808080'
  },
  courseName : {
    padding:10,
    marginBottom: -1,
  },
  searchIcon : {
    color:'#808080',
    marginTop:12,
    marginLeft:-20,
    fontSize: 20
  }
});