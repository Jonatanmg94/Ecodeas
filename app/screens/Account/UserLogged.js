import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
  }, []);

  return (
    <View>
      <InfoUser userInfo={userInfo} />
      <Button
        title="Cerrar sesión"
        onPress={() => firebase.auth().signOut()}
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainerLogin: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20
  },
  btnLogin: {
    backgroundColor: "#2BA418"
  }
});
