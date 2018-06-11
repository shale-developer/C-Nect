import React , { Component } from 'react';
import { Text,
         Image,
         ScrollView,
         View,
         FlatList,
         ActivityIndicator,
         Button, StyleSheet, AsyncStorage, Alert,TouchableHighlight ,ImageBackground ,TouchableOpacity ,Platform } from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import { StackNavigator } from 'react-navigation'; 
import axios from 'axios';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
//

import HeaderBar from '../../reuse/headerBar';

//

var quizList ;

export default class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quiz : [],
            count : 0,
            title : '',
            icon : '',
            course_id : 0
        }
    }

    static navigationOptions = { 
        header:(<HeaderBar name=""/>)
    };


    componentDidMount () { 
       
    debugger;
    
    const {params}  = this.props.navigation.state.params;
    const quiz = params.params;
    const icon  = params.icon;
    const course_id = params.course_id;

    console.log(quiz);
    
    quizList = quiz.map((value,index,result ) => {

        console.log(value);
        console.log(index);
        console.log(result);
        
        this.setState({
            count : result.length,
            icon,
            course_id

        })

        return (
            <TouchableHighlight onPress={() => {this.renderContent(value)}} style={styles.button} key={index}>
                <Text style={styles.textStyle}>{value.title}</Text>
            </TouchableHighlight>
        )

    });

    }


    renderContent (quiz) {


        this.props.navigation.navigate('QuizTemplate',{params:quiz , icon : this.state.icon ,course_id:this.state.course_id})
        debugger;

    }
    

    render() {

        
        return (
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.header}>Current Quiz ({this.state.count}) </Text>
                    <View style={{margin:30}}>
                        <Image style={{width:100,height:100}}
                            source={{ uri :this.state.icon}}
                        />
                    </View>
                    <View>
                        {quizList}
                    </View>
                    <View>
                        <TouchableHighlight style={[styles.button,{backgroundColor:'#00adee'}]} onPress={()=>{ this.props.navigation.goBack() }}>
                            <Text style={styles.textStyle}>Back</Text>
                        </TouchableHighlight>
                    </View>
            </View>
        );
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
    button : {
        width:320,
        borderRadius:5,
        marginBottom:20,
        height: 40,
        justifyContent : 'center',
        borderBottomWidth:1,
        borderColor: '#c8c8c8',
        backgroundColor:'#90c73e'
    },
    textStyle :{
        color:'#fff',
        fontSize: 16,
        textAlign:'center'
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