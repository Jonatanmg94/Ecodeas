import { createStackNavigator } from "react-navigation-stack";
import EventsScreen from "../screens/Events/Events";
import ListEventsScreen from "../screens/Events/listEvents";
import AddEventScreen from "../screens/Events/addEvent";
import EventScreen from "../screens/Events/Event";
import AddReviewEventScreen from "../screens/Events/AddReviewEvent";

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
  },
  AddReviewEvent: {
    screen: AddReviewEventScreen,
    navigationOptions: () => ({
      title: "Escribir valoración",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418"
      },
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  Event: {
    screen: EventScreen,
    navigationOptions: props => ({
      title: props.navigation.state.params.event.name,
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418"
      },
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  ListEvents: {
    screen: ListEventsScreen,
    navigationOptions: () => ({
      title: "Lista de eventos",
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
