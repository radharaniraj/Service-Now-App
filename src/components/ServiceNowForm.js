require('dotenv').config()
import React, { Component } from 'react'
let base64 = require('base-64')
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'

class ServiseNowForm extends Component {
   state = {
      Description: ''
   }
   handleDescription = (text) => {
      this.setState({ Description: text })
   }
   login = (Description) => {
       
    let url = 'https://'+process.env.INSTANCE+'.service-now.com/api/now/table/x_514301_shubhamap_shubhamtable';
    let username = process.env.USERNAME;
    let password = process.env.PASSWORD;
  
    let headers = new Headers();
    let data = {
        'description': Description
    }
    console.log(data)
  
  //headers.append('Content-Type', 'text/json');
  headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
  headers.append('Content-Type', 'application/json;charset=UTF-8') 
  fetch(url, {method:'POST',
    headers: headers,
    body: JSON.stringify(data)
   })
    .then(response => {
        console.log(response.status)
        if(response.status==201)
        {
            Alert.alert("Ticket created "+Description)
        }
    })
    .catch(error => console.log(error))
      
   }
   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Write Here"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleDescription}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.Description)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default ServiseNowForm

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})