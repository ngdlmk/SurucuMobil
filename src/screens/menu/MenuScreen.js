import {
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import {MainScreenStackNavigator,
  CarScreenStackNavigator,
  DriverScreenStackNavigator,
  RouteScreenStackNavigator,
  WriteCeturScreenStackNavigator,
  SettingScreenStackNavigator,
  ExitScreenStackNavigator} 
from './Navigators'

var menuTitle=require('./../../data/MenuTitles.json');

const MenuScreen = createDrawerNavigator({
  Screen1: {
    screen: MainScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.MainScreenTitle,
    },
  },
  Screen2: {
    screen: CarScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.CarScreenTitle,
    },
  },
  Screen3: {
    screen: DriverScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.DriverScreenTitle,
    },
  },
  Screen4: {
    screen: RouteScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.RouteScreenTitle,
    },
  },
  Screen5: {
    screen: WriteCeturScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.WriteCeturScreenTitle,
    },
  },
  Screen6: {
    screen: SettingScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.SettingScreenTitle,
    },
  },
  Screen7: {
    screen: ExitScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.ExitScreenTitle,
    },
  },
});
 
export default createAppContainer(MenuScreen);