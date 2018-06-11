import React, { Component } from 'react';
import { View  , Text , TouchableHighlight , StyleSheet , Image , ScrollView, Platform , ActivityIndicator , WebView } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import ToggleSwitch from 'toggle-switch-react-native'
import WebViewer from 'react-native-android-fullscreen-webview-video';
import HeaderBar from '../../reuse/headerBar';

export default class CourseMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : 'Something',
            isLoading : true,
            params : {},
            title : '',
            content : [],
            quiz  : [],
            intro : {},
            showQuiz : false,
            showContent : false,
            icon : '',
            course_id : 0
        }
    }
    
    static navigationOptions = {header:(<HeaderBar name=""/>),
    };

    componentDidMount () {
    
    let params = this.props.navigation.state.params.item;
    const title = params.course_title;
    const icon  = params.icon_url;
    const courseID = params.course_id;
    
    console.log(`ID sent is ${courseID}`);
    
    this.setState({params});  

    let url = `https://c-nnect.testurl.co/api/course_content_compile.php?course_id=${courseID}`;

    axios.get(url).then((promise) => {

        console.log(promise);

        var content = [];
        var quiz = [];
        var intro = {};
        var title = '';
        var html = '';
        debugger;
        for (let index = 0; index < promise.data.length; index++) {           
            switch (promise.data[index]["type"]) {
                case "intro":
                    intro = promise.data[index];
                    title = intro.title;
                    html = intro.html;
                    break;
                case "quiz":
                    quiz.push(promise.data[index]);
                    break;
                case "content":
                    content.push(promise.data[index]);
                    break;
            }      
        }

debugger;

    var wrapped  = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${decodeURIComponent(html)}</body></html>`;


debugger;

        this.setState({
            isLoading:false,
            content,
            quiz,
            intro,
            title,
            icon ,
            html :wrapped,
            course_id : courseID
        });

        debugger;

    }).catch((error) => { 

        console.log(error);
        this.setState({isLoading:false});

    })

    }

    navigate(view,obj = {}) {
        
        debugger;
        this.props.navigation.navigate(view,{params:obj});

    }

    render() {

        if(this.state.isLoading) {
            return(
              <View style={{flex: 1, padding: 20 , justifyContent:'center',backgroundColor:'white'}}>
                    <Image
                    source={require('../../../assets/loader.gif')}
                    style={{width:300,height:150}}
                    />
              </View>
            )
          }


        return (
            <View style={{backgroundColor:'#fff',alignItems:'center'}}>
                <View style={[styles.buttonContainer,{justifyContent:'center',paddingTop:20, alignItems:'center',paddingLeft:0,paddingRight:0}]}> 
                    <Text style={[styles.textStyle,{fontWeight:'bold'}]}>{this.state.title} </Text>
                </View>
                <ScrollView>
                    <View style={[styles.buttonContainer,{justifyContent:'center',alignSelf:'center'}]}>  
                        <WebViewer
                            source={{html : this.state.html}}
                            style={{marginTop: 20,height:200}}
                            javaScriptEnabled={true} 
                            domStorageEnabled={true} 
                            />
                    </View>
                        <View style={[styles.buttonContainer,{paddingBottom:0}]} >
                            <TouchableHighlight style={styles.button} onPress={()=>{ this.navigate('Content',{params:this.state.content,icon:this.state.icon,}) }}>
                                <Text style={[styles.textStyle]}>Content ({this.state.content.length})</Text>
                            </TouchableHighlight>
                            <Icon name="docs" size={20} color="#00adee"/>
                        </View>
                        <View style={[styles.buttonContainer,{paddingTop:0,paddingBottom:0}]}>
                            <TouchableHighlight style={styles.button} onPress={()=>{ this.navigate('Quiz',{params:this.state.quiz,icon:this.state.icon,course_id:this.state.course_id}) }}>
                                <Text style={styles.textStyle}>Quiz ({this.state.quiz.length})  </Text>
                            </TouchableHighlight>
                            <Icon name="book-open" size={20} color="#00adee"/>
                        </View>
                        <View style={[styles.buttonContainer,{paddingTop:0,marginBottom:0}]}>
                            <TouchableHighlight style={styles.button} onPress={()=>{ this.navigate('New Course',this.state.params ) }}>
                                <Text style={styles.textStyle}>Description</Text>
                            </TouchableHighlight>
                            <Icon name="camrecorder" size={20} color='#ff4c4c'/>
                        </View>
                        <View style={[styles.buttonContainer,{paddingTop:0,marginBottom:10,marginTop:-20}]}>
                            <TouchableHighlight style={[styles.button,{backgroundColor:'#90c73e',width:'96%'}]} onPress={()=>{ this.navigate('New Course',this.state.params) }}>
                                <Text style={{color : '#fff',fontWeight:'bold',textAlign:'center'}}>
                                 INTRO
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <View style={[styles.buttonContainer,{paddingTop:0,marginBottom:10,marginTop:-20}]}>
                        <Text></Text>
                        </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button : {
        width:'90%',
        borderRadius:5,
        marginBottom:20,
        height: 40,
        justifyContent : 'center',
        borderBottomWidth:1,
        borderColor: '#c8c8c8',
    },
    textStyle :{
        color:'#666666',
        fontSize: 16,
        textAlign:'left'
    },
    buttonContainer : {
        flex : 0 ,
        flexDirection: 'row',
        padding:20,
        paddingTop:10
    },
    image : {
        width:350,
        height:250
    }
})