import { createStackNavigator } from "react-navigation-stack";
import PostScreen from "../screens/Posts/Posts";
import ListPostScreen from "../screens/Posts/listPosts";

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
  },
  ListPosts: {
    screen: ListPostScreen,
    navigationOptions: () => ({
      title: "Lista de posts",
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
