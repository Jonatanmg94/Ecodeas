import { createStackNavigator } from "react-navigation-stack";
import PostScreen from "../screens/Posts/Posts";

const PostScreenStacks = createStackNavigator({
  Posts: {
    screen: PostScreen,
    navigationOptions: () => ({
      title: "Publicaciones",
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

export default PostScreenStacks;
