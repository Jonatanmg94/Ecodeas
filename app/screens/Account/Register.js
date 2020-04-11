import React, { useRef } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Card } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/Account/RegisterForm";
import Toast from "react-native-easy-toast";

export default function Register() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/ecodeas-logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewForm}>
        <Card title="Registrar cuenta" containerStyle={styles.cards}>
          <RegisterForm toastRef={toastRef} />
        </Card>
      </View>
      <Toast
        ref={toastRef}
        style={{ backgroundColor: "green" }}
        position="top"
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: "white" }}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 30
  },
  viewForm: {
    marginRight: 5,
    marginLeft: 5
  },
  cards: {
    borderRadius: 20,
  }
});
