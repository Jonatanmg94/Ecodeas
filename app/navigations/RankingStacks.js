import { createStackNavigator } from "react-navigation-stack";
import RankingScreen from "../screens/Ranking";

const RankingStacks = createStackNavigator({
  Ranking: {
    screen: RankingScreen,
    navigationOptions: () => ({
      title: "Ranking",
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

export default RankingStacks;
