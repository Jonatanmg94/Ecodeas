import { createStackNavigator } from "react-navigation-stack";
import PostsScreen from "../screens/Posts/Posts";
import ListPostScreen from "../screens/Posts/listPosts";
import AddPostScreen from "../screens/Posts/addPost";
import PostScreen from "../screens/Posts/Post";
import AddReviewPostScreen from "../screens/Posts/AddReviewPost";

const PostsStacks = createStackNavigator({
  Posts: {
    screen: PostsScreen,
    navigationOptions: () => ({
      title: "Posts",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }),
  },
  Post: {
    screen: PostScreen,
    navigationOptions: () => ({
      title: "Ficha del post",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }),
  },
  AddReviewPost: {
    screen: AddReviewPostScreen,
    navigationOptions: () => ({
      title: "Escribir valoración",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }),
  },
  AddPost: {
    screen: AddPostScreen,
    navigationOptions: () => ({
      title: "Añadir post",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }),
  },
  ListPosts: {
    screen: ListPostScreen,
    navigationOptions: () => ({
      title: "Lista de posts",
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

export default PostsStacks;
