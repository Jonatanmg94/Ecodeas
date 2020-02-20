import React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import AccountScreen from "../screens/Account/MyAccount";
import MyAccountSettingsScreen from "../screens/Account/MyAccountSettings";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

const AccountScreenStacks = createStackNavigator({
  MyAccount: {
    screen: AccountScreen,
    navigationOptions: () => ({
      title: "Mi Cuenta",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418"
      },
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Iniciar sesión",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418"
      },
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registro",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2BA418"
      },
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  MyAccountSettings: {
    screen: MyAccountSettingsScreen,
    navigationOptions: () => ({
      title: "Editar cuenta",
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

export default AccountScreenStacks;
