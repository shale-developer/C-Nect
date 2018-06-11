import React from 'react';
import {Text, 
  LayoutAnimation , 
  TouchableHighlight ,
  UIManager , 
  KeyboardAvoidingView, 
  Button,
  StyleSheet, 
  Modal,
  Alert,
  ScrollView, AsyncStorage, Platform , View} from 'react-native';
import FontAwesome , { Icons } from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default class AlertPop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAlert : false
        }
    }



    render() {

        return (

        <Modal
            animationType="slide"
            presentationStyle="overFullScreen"
            transparent={true}
            visible={this.props.showAlert}
            style={{justifyContent: 'center',alignSelf: 'center',}}
            >
            <View style={styles.alert}>
                <Text style={styles.header}>{this.props.Message}</Text>
               <Icon name={this.props.icon} size={35} color={this.props.color}/>
            </View>
          </Modal>
        );
    }

}

//<Icon name="emotsmile" size={50} color="#90c73e"/>
// <TouchableHighlight style={styles.button} onPress={()=> {this.props.showAlert = false}}>
// <Text style={styles.textStyle}>OK</Text>
// </TouchableHighlight>

const styles = StyleSheet.create({
    header : {
        alignSelf: 'center',
        marginTop: '3.5%',
        fontSize:20,
        marginBottom: 10,
        color:'black'
    },
    alert : {
        backgroundColor : 'rgba(255,255,255,0.9)',
        height:'15%',
        width:'100%',
        alignSelf:'center',
        alignItems: 'center',
    },
    button : {
        alignSelf: 'center',
        backgroundColor:'#90c73e',
        height:'30%',
        width:'90%',
        justifyContent: 'center',
    },
    textStyle: {
        textAlign:'center',
        color: 'white'
    }
})