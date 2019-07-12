import React from 'react';
import {createStackNavigator} from 'react-navigation';
import NavigationDrawerStructure from './NavigationDrawerStructure'
import CarScreen from '../CarScreen'
import MainScreen from '../MainScreen'
import DriverScreen from '../DriverScreen'
import RouteScreen from '../RouteScreen'
import WriteCeturScreen from '../WriteCeturScreen'
import SettingScreen from '../SettingScreen'
import ExitScreen from '../ExitScreen'

var backgroundColor="#37C1CC";
var headerTintColor="#fff";
var menuTitle=require('./../../data/MenuTitles.json');

export const MainScreenStackNavigator = createStackNavigator({
    First: {
      screen: MainScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: headerTintColor,
      }),
    },
  });
   
  export const CarScreenStackNavigator = createStackNavigator({
    Second: {
      screen: CarScreen,
      navigationOptions: ({ navigation }) => ({
        title: menuTitle.CarScreenTitle,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: '#fff',
      }),
    },
  });
   
  export const DriverScreenStackNavigator = createStackNavigator({
    Third: {
      screen: DriverScreen,
      navigationOptions: ({ navigation }) => ({
        title: menuTitle.DriverScreenTitle,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: '#fff',
      }),
    },
  });

  export const RouteScreenStackNavigator = createStackNavigator({
    Fourth: {
      screen: RouteScreen,
      navigationOptions: ({ navigation }) => ({
        title: menuTitle.RouteScreenTitle,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: '#fff',
      }),
    },
  });

  export const WriteCeturScreenStackNavigator = createStackNavigator({
    Fifth: {
      screen: WriteCeturScreen,
      navigationOptions: ({ navigation }) => ({
        title: menuTitle.WriteCeturScreenTitle,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: '#fff',
      }),
    },
  });

  export const SettingScreenStackNavigator = createStackNavigator({
    Sixth: {
      screen: SettingScreen,
      navigationOptions: ({ navigation }) => ({
        title: menuTitle.SettingScreenTitle,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: '#fff',
      }),
    },
  });

  export const ExitScreenStackNavigator = createStackNavigator({
    Seventh: {
      screen: ExitScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: '#fff',
      }),
    },
  });