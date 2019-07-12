
import { createStackNavigator, createAppContainer } from "react-navigation";
import {LoginScreen,MenuScreen,ExitScreen} from './src/screens'

const AppNavigator = createStackNavigator(
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

export default createAppContainer(AppNavigator);