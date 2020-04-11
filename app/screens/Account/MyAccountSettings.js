import React, { useState, useEffect, useRef, Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, Image } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import { YellowBox } from "react-native";

export default function MyAccountSettings() {
  YellowBox.ignoreWarnings(["Setting a timer"]);

  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  return (
    <View>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <Toast ref={toastRef} position="top" opacity={0.8} />
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 30,
  },
});
