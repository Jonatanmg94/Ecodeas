import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainerv, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import PostsScreenStacks from "./PostScreenStacks";
import EventsScreenStacks from "./EventsStacks";
import SearchSreenStacks from "./SearchStacks";
import AccountScreenStacks from "./AccountStacks";

const NavigationStacks = createBottomTabNavigator(
  {
    Search: {
      screen: SearchSreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="magnify"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Posts: {
      screen: PostsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Posts",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="format-list-bulleted"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Events: {
      screen: EventsScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Eventos",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="calendar-blank-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    MyAccount: {
      screen: AccountScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account-circle-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Events",
    order: ["Search", "Posts", "Events", "MyAccount"],
    tabBarOptions: {
      inactiveTintColor: "#CACACA",
      activeTintColor: "#2BA418",
      labelStyle: {
        fontSize: 12,
        fontWeight: "700"
      }
    }
  }
);

export default createAppContainer(NavigationStacks);
