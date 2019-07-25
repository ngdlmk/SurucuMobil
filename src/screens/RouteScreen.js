import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';

export default class RouteScreen extends Component {
  constructor(props){
    super(props);    
  } 

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Route Screen </Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});