import { createStackNavigator } from "react-navigation-stack";
import PostScreen from "../screens/Posts";

const PostScreenStacks = createStackNavigator({
  Restaurants: {
    screen: PostScreen,
    navigationOptions: () => ({
      title: "Publicaciones"
    })
  }
});

export default PostScreenStacks;
