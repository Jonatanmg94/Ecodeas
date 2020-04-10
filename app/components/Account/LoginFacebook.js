import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import Loading from "../Loading";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";

export default function LoginFacebook(props) {
  const { toastRef, navigation } = props;
  const [isLoading, setIsLoading] = useState(false);

  async function login() {
    try {
      await Facebook.initializeAsync(FacebookApi.application_id);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: [FacebookApi.permissions]
      });
      if (type === "success") {
        setIsLoading(true);
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        await firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {
            navigation.navigate("MyAccount");
          });
      } else {
        toastRef.current.show(
          "Error accediendo con Facebook, inténtelo más tarde",
          2000
        );
      }
    } catch ({ message }) {
      alert(`Facebook - Error: ${message}`);
    }
    setIsLoading(false);
  }

  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading isVisible={isLoading} text="Iniciando sesión" />
    </>
  );
}