import { createStackNavigator, createAppContainer } from "react-navigation";
import CarScreen from '../CarScreen'
import InsuranceImageModalScreen from '../modals/InsuranceImageModalScreen'

const RootStack = createStackNavigator(
  {
    Main: {
      screen: CarScreen,
    },
    InsuranceImageModal: {
      screen: InsuranceImageModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);