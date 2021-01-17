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
  ChangePasswordScreenStackNavigator,
  MissionTrack,
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
  // Screen5: {
  //   screen: WriteCeturScreenStackNavigator,
  //   navigationOptions: {
  //     drawerLabel: menuTitle.WriteCeturScreenTitle,
  //   },
  // },
  // Screen6: {
  //   screen: SettingScreenStackNavigator,
  //   navigationOptions: {
  //     drawerLabel: menuTitle.SettingScreenTitle,
  //   },
  // },  
  Screen7: {
    screen: ChangePasswordScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.ChangePasswordScreenTitle,
    },
  },
  Screen8: {
    screen: MissionTrack,
    navigationOptions: {
      drawerLabel: menuTitle.GorevTakipTitle,
    },
  },
  Screen9: {
    screen: ExitScreenStackNavigator,
    navigationOptions: {
      drawerLabel: menuTitle.ExitScreenTitle,
    },
  },
},{
  drawerBackgroundColor: "#4983B7",
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: "#48B3CF",
    inactiveTintColor: 'rgba(255,255,255,0.5)'
  },
});
 
export default createAppContainer(MenuScreen);