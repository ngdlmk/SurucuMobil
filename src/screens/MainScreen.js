import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
 
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../images/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: Screen1,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen 1',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});
 
const Screen2_StackNavigator = createStackNavigator({
  Second: {
    screen: Screen2,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen 2',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});
 
const Screen3_StackNavigator = createStackNavigator({
  Third: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen 3',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

const MainScreen = createDrawerNavigator({
  //Drawer Optons and indexing
  Screen1: {
    //Title
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Demo Screen 1',
    },
  },
  Screen2: {
    //Title
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Demo Screen 2',
    },
  },
  Screen3: {
    //Title
    screen: Screen3_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Demo Screen 3',
    },
  },
});
 
export default createAppContainer(MainScreen);