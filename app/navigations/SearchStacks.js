import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";
import SearchEventsScreen from "../screens/SearchEvents";
import SearchPostsScreen from "../screens/SearchPosts";

const SearchScreenStacks = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Búsquedas",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }),
  },
  SearchEvents: {
    screen: SearchEventsScreen,
    navigationOptions: () => ({
      title: "Buscar eventos",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }),
  },
  SearchPosts: {
    screen: SearchPostsScreen,
    navigationOptions: () => ({
      title: "Buscar posts",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }),
  },
});

export default SearchScreenStacks;
