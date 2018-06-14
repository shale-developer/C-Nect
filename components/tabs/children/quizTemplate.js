import React from 'react';
import {Text, KeyboardAvoidingView, Button, StyleSheet, ScrollView ,View ,WebView, Platform , AsyncStorage , Image , TouchableOpacity} from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';

//

import NavigationService from '../../NavigationService';

import AlertPop from '../../reuse/alert';
var courseList;
var toUse = "";

export default class QuizTemplate extends React.Component {

    constructor(props){ 
        super(props);  

        this.state = {
            questions : [],
            title : '',
            courseToUpdate  : {},
            questions  : '',
            quiz_id : '',
            js : '',
            icon_url : '',
            course_id : 0,
            course_title : '',
            showTrophy : true,
            score:0,
            course : {},
            completeTemp : 0
        }
    }

    static navigationOptions = { 
            title :  'Current Quiz'
    }

   async componentDidMount() {

    debugger;

    const quiz = this.props.navigation.state.params;
    const quiz_id = quiz.params.id;
    const title = quiz.params.title;
    const icon_url = this.props.navigation.state.params.icon;
    const course_id  = quiz.course_id;
    const course_title = quiz.course_title;

    let questions = decodeURIComponent(quiz.params.html);
    
    this.setState({
        title,
        questions,
        icon_url,
        course_id,
        course_title,
        showTrophy:false,
        quiz_id,
        course : quiz.course
    });

    debugger;

    await AsyncStorage.getItem(title).then((success) => 
    {
        if (success == null) 
        {   
            let progressObj = {
                title,
                course_id,
                total : quiz.course.params.length,
                complete : 0,
                progress : 0
            }
         AsyncStorage.setItem(title,JSON.stringify(progressObj)).then((promise) => 
            {
                console.log(promise);

            }).catch((error) => 
            {
                console.log(error);
            })
        } 
        else      
        {
            console.log(success);
            this.setState({
                completeTemp : JSON.parse(success).complete
            })
            console.log(" do something here ... ");
        }
    }).catch((error) => 
    {
        console.log(error);
    })

    } 



    backToHome () {

        this.props.navigation.navigate('MyCourses');
    }

    handleSubmit (data) {
        debugger;
        
        var dataResult  = data.split(",");

        var num1 = parseInt(dataResult[0]);
        var num2 = parseInt(dataResult[1]);
        var result = (num1 / num2) * 100;

        this.setState({showTrophy:true,score:result.toFixed(2)})
        
        this.courseProgress();

            var quiz = {};

            AsyncStorage.getItem("course").then((success) => 
            {
        
                quiz = JSON.parse(success);
        
                quiz.complete = quiz.complete + 1;
                quiz.enrolled = quiz.enrolled + 1;
                
                debugger;
        
                if(result == 100)
                    quiz.gained =  quiz.gained + 80;
                else    
                    quiz.gained =  quiz.gained + 0;
            
                AsyncStorage.setItem("course",JSON.stringify(quiz));
                
        
            }).catch((error) => 
            
            {
                
                debugger;
                quiz = {};
        
                quiz.complete = 1;
                quiz.enrolled = 1;
        
                if(result == 100)
                    quiz.gained =  80;
                else    
                    quiz.gained =   0;
        
                AsyncStorage.setItem("course",JSON.stringify(quiz)).then((success) => 
                {
                    debugger;   

                }).catch((error) => { console.log(`error ${error}`) });
        
        
            });
                
    }

    setCompleteCourse ()    
    {
                
        AsyncStorage.getItem('dataSourceComplete').then((p) => {
            debugger;
                 
                // if (result.params.length == 0) 
                // {
                    var completeCourse  = this.props.navigation.state.params.params;
                    completeCourse.complete = "true";
                    completeCourse.newCourse = "false";
                    completeCourse.icon_url = this.state.icon_url;
                    completeCourse.course_id = this.state.course_id;
            
                    let array  = [];
                    array.push(completeCourse);
            
                    if (p == null) {
                        debugger;
                        AsyncStorage.setItem('dataSourceComplete',JSON.stringify(array),(p) => {
                            console.log(p) 
                            console.log("first Completed course") }).catch((e)=>{console.log(e)});
                    }
                    else {
                        debugger;
                        var temp = JSON.parse(p);
                        temp.push(completeCourse);
                            debugger;
                        AsyncStorage.setItem('dataSourceComplete',JSON.stringify(temp),(p) => {
                            console.log(p); 
                            console.log("new complete course added") }).catch((e)=>{console.log(e)});
                    }
                // } else {
                
                // // AsyncStorage.mergeItem('coursesInProgress',JSON.stringify(result)).then((success) => 
                // // {
                // //     if(success == null) 
                // //     {
                // //         AsyncStorage.setItem('coursesInProgress',JSON.stringify(result)).then((success) => 
                // //         {

                // //         }).catch((error) => {
                // //             console.log(error);
                // //         });
                // //     }
                // // }).catch((error) => { 
                // //     console.log(error);
                // // })
                    
                // } 
            }).catch((e) => {    
                console.log(e)
            })

    }

  async  courseProgress () 
    {    
        if (this.state.completeTemp == 0) 
        {
            this.updateOverallCourse();
            const title = this.state.title;
            let update = {
                complete : this.state.completeTemp + 1
            }
         await AsyncStorage.mergeItem(title,JSON.stringify(update)).then((success) => 
            {
                console.log(success);
               
            }).catch((error) => 
            {
                console.log(error);
            })
        }
          else 
            console.log(`${this.state.title} has already been done ...`);
    }

      updateOverallCourse () 
    {
        debugger;
        const course_title = this.state.course_title;
        console.log(course_title);
        
        AsyncStorage.getItem(course_title).then((p) => 
        {
            console.log(p);
            console.log("C'momomomom");
            var completeObj = JSON.parse(p);
            console.log(completeObj.complete);
            var completeUpdate = { complete :completeObj.complete + 1 }

          AsyncStorage.mergeItem(course_title,JSON.stringify(completeUpdate)).then((success) => 
            {
                console.log(success);
                console.log(`${course_title} updates successfully`);

            }).catch((error) => 
            {
                console.log(error);
            })
                debugger;
                var progress = ((completeObj.complete / completeObj.total) * 100).toFixed(2);
                console.log(`Current progress is ${progress} % `);

                if (progress == 100) 
                {
                    console.log("Updating Complete Section");
                    this.setCompleteCourse();
                }
        }).catch((error) => {

        })
    }


    splitQuiz () 
    {
        // debugger;
        // var courseProgress = {};
        // var course = this.state.course;
        // var courseToRemoveID = this.state.quiz_id;
        // var newCourseArray = [];
        // var progress = 0;
        // var course_id =  this.state.course_id;

        // for (let index = 0; index < course.params.length; index++) 
        // {
        //     if (course.params[index]["id"] != courseToRemoveID) 
        //     {
        //         newCourseArray.push(course.params[index]["id"]);
        //     }
        // }
        
        // progress = ((newCourseArray.length / this.state.course.params.length) * 100).toFixed(2);
        // courseProgress = {
        //         progress,
        //         completeCourse : newCourseArray
        // }

        // var result = course;
        // return result;
    }
 
    render() { 
        
        debugger;
        const params = this.props.navigation.state.params.params;
        const course_id = params.course_id;

        if (this.state.showTrophy) {
            return(
            <View style={{justifyContent:'center',alignContent:'center',flex:1}}> 
                <Text style={{alignSelf:'center',fontSize:30}}>You Scored {this.state.score} %</Text>
                <Image
                source={require('../../../assets/trophy.gif')}
                style={{width:300,height:300,alignSelf:'center'}}
                />
                <TouchableOpacity style={styles.btn} onPress={this.backToHome.bind(this)}>
                    <Text style={styles.textStyle}>Back To Courses</Text>
                </TouchableOpacity>
            </View>
            );
            } else {
            return (  
            <WebView    
            source={{html: this.state.questions}} 
            javaScriptEnabled={true} 
            domStorageEnabled={true} 
            onMessage={(event)=> this.handleSubmit(event.nativeEvent.data)}
            />
            );  
        }
    }      
} 
 
// styles 
 
const styles = StyleSheet.create({

    scroll : {
        backgroundColor : '#fff'
    },
    MainContainer : {  
        flex: 1,
        justifyContent: 'center',
        borderBottomColor  : '#000',
        borderBottomWidth : 2, 
    }, 
    bodyContainer : {
        flex: 1,
        justifyContent: 'center',
    },
    course : {
        padding : 10,
        fontSize : 16,
        color : '#000' 
    },
    header: {
        padding : 20,
        textAlign : 'center',
        fontSize : 20,
        color : '#000'
    },
    btn : {
        width:'95%',
        borderRadius:5,
        marginTop:20,
        margin:20,
        height: 40,
        justifyContent : 'center',
        backgroundColor: '#00adee',
        alignSelf: 'center',
    },
    textStyle :{
        color:'#fff',
        fontSize: 16,
        textAlign:'center'
    },
});

