import { createStackNavigator } from "react-navigation-stack";
import EventsScreen from "../screens/Events";

const TopListScreenStacks = createStackNavigator({
  TopRestaurants: {
    screen: EventsScreen,
    navigationOptions: () => ({
      title: "Eventos"
    })
  }
});

export default TopListScreenStacks;
