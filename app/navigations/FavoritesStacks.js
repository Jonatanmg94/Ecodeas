import { createStackNavigator } from "react-navigation-stack";
import FavoriteScreen from "../screens/Favorites";

const FavoriteScreenStacks = createStackNavigator({
  Favorites: {
    screen: FavoriteScreen,
    navigationOptions: () => ({
      title: "Eventos favoritos",
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

export default FavoriteScreenStacks;
