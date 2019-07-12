import React, { Component } from 'react';
import {View,AsyncStorage} from 'react-native';
 
var NavigateKeys=require('../data/NavigateKeys.json');
var StorageKeys=require('../data/StorageKeys.json');

export default class ExitScreen extends Component {
  componentWillMount(){
    AsyncStorage.setItem(StorageKeys.IsLoginKey,"false");

    this.props.navigation.navigate(NavigateKeys.LoginKey);
  }

  render() {
    return (
      <View/>  
    );
  }
}