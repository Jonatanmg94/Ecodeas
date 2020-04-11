import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, Card, Overlay } from "react-native-elements";
import * as firebase from "firebase";
import UserProfile from "../../components/Account/UserProfile";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import { withNavigation } from "react-navigation";

function UserLogged(props) {
  const { navigation } = props;
  const [userProfile, setUserProfile] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserProfile(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  const userLoginCheck = async () => {
    const user = firebase.auth().currentUser;
    user.providerData.forEach((userInfo) => {

      if (userInfo.providerId != "password") {
        toastRef.current.show("Ha iniciado sesión con una red social, debe modificar en ella sus datos personales.", 2500);
      } else {
        navigation.navigate("MyAccountSettings", {
          setReloadData: () => setReloadData(true)
        });
      }

    });
  }

  return (
    <View>
      <Card containerStyle={styles.cards}>
        <UserProfile
          userProfile={userProfile}
          setReloadData={setReloadData}
          toastRef={toastRef}
          setIsLoading={setIsLoading}
          setTextLoading={setTextLoading}
        />
        <Button
          title="Editar cuenta"
          onPress={userLoginCheck}
          containerStyle={styles.btnContainerEditProfile}
          buttonStyle={styles.btnEditProfile}
        />
        <Button
          title="Cerrar sesión"
          onPress={() => firebase.auth().signOut()}
          containerStyle={styles.btnContainerLogin}
          buttonStyle={styles.btnLogin}
        />
      </Card>
      <Toast ref={toastRef} position="top" opacity={0.8} />
      <Loading text={textLoading} isVisible={isLoading} />

    </View>
  );
}

export default withNavigation(UserLogged);

const styles = StyleSheet.create({
  btnContainerLogin: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20
  },
  btnLogin: {
    backgroundColor: "#2BA418",
    borderRadius: 10,
    marginBottom: 20
  },
  btnContainerEditProfile: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
  btnEditProfile: {
    backgroundColor: "#7E7E7E",
    borderRadius: 10
  },
  cards: {
    borderRadius: 20,
  }
});
