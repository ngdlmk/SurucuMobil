import React, { Component } from 'react';
import {View} from 'react-native';
 
export default class ExitScreen extends Component {
  componentWillMount(){
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View/>  
    );
  }
}