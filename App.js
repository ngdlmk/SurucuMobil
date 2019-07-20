import { createStackNavigator, createAppContainer } from "react-navigation";
import {LoginScreen,MenuScreen,ExitScreen,OtpSmsScreen} from './src/screens'

const AppStack = createStackNavigator(
  {
    Login:LoginScreen,
    Menu: MenuScreen,
    Exit:ExitScreen
  },
  {
    initialRouteName: "Login",
    headerMode:"none"
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppStack,
    },
    OtpSms: {
      screen: OtpSmsScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);