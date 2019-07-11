
import { createStackNavigator, createAppContainer } from "react-navigation";
import {LoginScreen,MainScreen} from './src/screens'

const AppNavigator = createStackNavigator(
  {
    Login:LoginScreen,
    Main: MainScreen
  },
  {
    initialRouteName: "Login",
    headerMode:"none"
  }
);

export default createAppContainer(AppNavigator);