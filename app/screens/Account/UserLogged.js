import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
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

  return (
    <View>
      <UserProfile
        userProfile={userProfile}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <Button
        title="Editar cuenta"
        onPress={() => {
          navigation.navigate("MyAccountSettings", {
            setReloadData: () => setReloadData(true)
          });
        }}
        containerStyle={styles.btnContainerEditProfile}
        buttonStyle={styles.btnEditProfile}
      />
      <Button
        title="Cerrar sesión"
        onPress={() => firebase.auth().signOut()}
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
      />
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
    backgroundColor: "#2BA418"
  },
  btnContainerEditProfile: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
  btnEditProfile: {
    backgroundColor: "#7E7E7E"
  }
});
