import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Agenda from './screens/Agenda'
import Auth from './screens/Auth'

const AppNavigator = createSwitchNavigator(
    {
        Auth: Auth,
        Agenda: Agenda
    },
    {
      initialRouteName: "Auth"
    }
  );

export default createAppContainer(AppNavigator)

