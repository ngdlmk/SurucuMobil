import React, { Component } from 'react';
import {StyleSheet  } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
 
var menuTitle=require('./../data/MenuTitles.json');
var navigateKeys=require('../data/NavigateKeys.json');

export default class MainScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.CarKey)}>
              <Text>{menuTitle.CarScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.DriverKey)}>
              <Text>{menuTitle.DriverScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.RouteKey)}>
              <Text>{menuTitle.RouteScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.WriteCeturKey)}>
              <Text>{menuTitle.WriteCeturScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.SettingKey)}>
              <Text>{menuTitle.SettingScreenTitle}</Text>
            </Button>
        </Content>
    </Container>
    );
  }  
}

const styles = StyleSheet.create({
  Button: {
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    height:70
  },
});