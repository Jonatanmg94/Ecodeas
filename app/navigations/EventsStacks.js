import { createStackNavigator } from "react-navigation-stack";
import EventsScreen from "../screens/Events/Events";
import AddEventScreen from "../screens/Events/addEvent";

const EventScreenStacks = createStackNavigator({
  Events: {
    screen: EventsScreen,
    navigationOptions: () => ({
      title: "Eventos",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418"
      },
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  AddEvent: {
    screen: AddEventScreen,
    navigationOptions: () => ({
      title: "Nuevo Evento",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418"
      },
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  }
});

export default EventScreenStacks;
