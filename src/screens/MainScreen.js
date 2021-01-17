import React, { Component } from 'react';
import {StyleSheet,AsyncStorage  } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
 
var menuTitle=require('./../data/MenuTitles.json');
var navigateKeys=require('../data/NavigateKeys.json');
var StorageKeys=require('../data/StorageKeys.json');

export default class MainScreen extends Component {


  componentWillMount(){
    this.clearStorage()
  }
  render() {
    return (
      <Container style={{paddingTop:50}}>
        <Content >
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
              onPress={()=>this.props.navigation.navigate(navigateKeys.ChangePasswordKey)}>
              <Text>{menuTitle.ChangePasswordScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.MissionTrack)}>
              <Text>{menuTitle.GorevTakipTitle}</Text>
            </Button>
            {/* <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.WriteCeturKey)}>
              <Text>{menuTitle.WriteCeturScreenTitle}</Text>
            </Button>
            <Button rounded block info style={styles.Button}
              onPress={()=>this.props.navigation.navigate(navigateKeys.SettingKey)}>
              <Text>{menuTitle.SettingScreenTitle}</Text>
            </Button> */}
        </Content>
    </Container>
    );
  }
  
  clearStorage=()=>{
    AsyncStorage.multiSet([[StorageKeys.SelectedCarId,"0"],
                         [StorageKeys.SelectedProjectId,"0"],
                         [StorageKeys.SelectedRouteId,"0"],
                         [StorageKeys.SelectedVoyageId,"0"]]);
  }
}

const MenuButton = () => {
  return(
    <TouchableOpacity style={{width: "95%"}}>

    </TouchableOpacity>
  )
}
 
const styles = StyleSheet.create({
  Button: {
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    height:70
  },
});