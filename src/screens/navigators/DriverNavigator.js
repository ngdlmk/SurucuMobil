import { createStackNavigator, createAppContainer } from "react-navigation";
import DriverScreen from '../DriverScreen'
import Src2ImageModalScreen from '../modals/Src2ImageModalScreen'
import PsychoTechniqueImageModalScreen from '../modals/PsychoTechniqueImageModalScreen'

const RootStack = createStackNavigator(
  {
    Main: {
      screen: DriverScreen,
    },
    Src2ImageModal: {
      screen: Src2ImageModalScreen,
    },
    PsychoTechniqueImageModal: {
      screen: PsychoTechniqueImageModalScreen,
    }
    
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);