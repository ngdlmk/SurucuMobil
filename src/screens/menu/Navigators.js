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
import ChangePasswordScreen from '../ChangePasswordScreen'

var backgroundColor="#37C1CC";
var headerTintColor="#fff";
var menuTitle=require('./../../data/MenuTitles.json');

export const MainScreenStackNavigator = createStackNavigator({
    Main: {
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
    Car: {
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
    Driver: {
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
    Route: {
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
    WriteCetur: {
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
    Setting: {
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

  export const ChangePasswordScreenStackNavigator = createStackNavigator({
    ChangePassword: {
      screen: ChangePasswordScreen,
      navigationOptions: ({ navigation }) => ({
        title: menuTitle.ChangePasswordScreenTitle,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: '#fff',
      }),
    },
  });

  export const ExitScreenStackNavigator = createStackNavigator({
    Exit: {
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