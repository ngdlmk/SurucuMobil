//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
import {  Button } from 'native-base';
// import all basic components
 
export default class RouteModalScreen extends Component {
  //Screen3 Component
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Route Modal Screen </Text>
        <Button block transparent 
                         onPress={() => this.props.navigation.goBack()} >
                        <Text style={{color:"#B22222"}}>İptal</Text>
                    </Button>
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