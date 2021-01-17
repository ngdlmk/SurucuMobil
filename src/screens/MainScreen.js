import React, { Component } from 'react';
import {StyleSheet,AsyncStorage, View  } from 'react-native';
import { Container, Content, Button, Text, Icon } from 'native-base';
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
        <View style={{flex: 1, backgroundColor: '#4983B7', paddingTop: 30}}>
            <View style={{width: "95%", height: 60, borderColor: "rgba(255,255,255,0.2)", borderBottomWidth: 1, alignSelf: 'center', alignItems: 'center', flexDirection: 'row'}}></View>
            <MenuButton 
              title={menuTitle.CarScreenTitle}
              onPress={()=>this.props.navigation.navigate(navigateKeys.CarKey)}
            />
            <MenuButton 
              title={menuTitle.DriverScreenTitle}
              onPress={()=>this.props.navigation.navigate(navigateKeys.DriverKey)}
            />
            <MenuButton 
              title={menuTitle.RouteScreenTitle}
              onPress={()=>this.props.navigation.navigate(navigateKeys.RouteKey)}
            />
            <MenuButton 
              title={menuTitle.ChangePasswordScreenTitle}
              onPress={()=>this.props.navigation.navigate(navigateKeys.ChangePasswordKey)}
            />
            <MenuButton 
              title={menuTitle.GorevTakipTitle}
              onPress={()=>this.props.navigation.navigate(navigateKeys.MissionTrack)}
            />
        </View>
    );
  }
  
  clearStorage=()=>{
    AsyncStorage.multiSet([[StorageKeys.SelectedCarId,"0"],
                         [StorageKeys.SelectedProjectId,"0"],
                         [StorageKeys.SelectedRouteId,"0"],
                         [StorageKeys.SelectedVoyageId,"0"]]);
  }
}

const MenuButton = ({
  onPress,
  title,
}) => {
  return(
    <TouchableOpacity onPress={onPress} style={{width: "95%", height: 60, borderColor: "rgba(255,255,255,0.2)", borderBottomWidth: 1, alignSelf: 'center', alignItems: 'center', flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '400', marginLeft: 10}}>{title}</Text>
      </View>
      <View style={{width: 50, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Icon type="Entypo" name="chevron-right" style={{color: "white", fontSize: 20}} />
      </View>
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