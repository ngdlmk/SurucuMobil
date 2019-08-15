import { createStackNavigator, createAppContainer } from "react-navigation";
import CarScreen from '../CarScreen'
import InsuranceImageModalScreen from '../modals/InsuranceImageModalScreen'
import ExaminationImageModalScreen from '../modals/ExaminationImageModalScreen'
import RoutePermissionDocumentModalScreen from '../modals/RoutePermissionDocumentModalScreen'

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
    RoutePermissionDocumentImageModal: {
      screen: RoutePermissionDocumentModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(RootStack);