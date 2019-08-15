import { createStackNavigator, createAppContainer } from "react-navigation";
import CarScreen from '../CarScreen'
import InsuranceImageModalScreen from '../modals/InsuranceImageModalScreen'
import ExaminationImageModalScreen from '../modals/ExaminationImageModalScreen'

const RootStack = createStackNavigator(
  {
    Main: {
      screen: CarScreen,
    },
    InsuranceImageModal: {
      screen: InsuranceImageModalScreen,
    },
    ExaminationImageModal: {
      screen: ExaminationImageModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);