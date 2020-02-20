import { createStackNavigator } from "react-navigation-stack";
import EventsScreen from "../screens/Events/Events";
import AddEventScreen from "../screens/Events/addEvent";

const EventScreenStacks = createStackNavigator({
  Events: {
    screen: EventsScreen,
    navigationOptions: () => ({
      title: "Eventos"
    })
  },
  AddEvent: {
    screen: AddEventScreen,
    navigationOptions: () => ({
      title: "Nuevo Evento"
    })
  }
});

export default EventScreenStacks;
