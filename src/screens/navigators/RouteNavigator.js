import { createStackNavigator, createAppContainer } from "react-navigation";
import RouteScreen from '../RouteScreen'
import RouteModalScreen from '../modals/RouteModalScreen'

const RootStack = createStackNavigator(
  {
    Main: {
      screen: RouteScreen,
    },
    RouteModal: {
      screen: RouteModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);