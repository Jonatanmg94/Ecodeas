import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider, Card } from "react-native-elements";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/Account/LoginFacebook";

export default function Login(props) {
  const { navigation } = props;
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/ecodeas-logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <Card title="Accede a tu cuenta" style={styles.cardLogin}>
          <LoginForm toastRef={toastRef} />
        </Card>
        <CreateAccount navigation={navigation} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewFacebook}>
        <LoginFacebook toastRef={toastRef} navigation={navigation} />
      </View>
      <Toast
        ref={toastRef}
        opacity={0.8}
        style={{ backgroundColor: "green" }}
        position="top"
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={1000}
      />
    </ScrollView>
  );
}

function CreateAccount(props) {
  const { navigation } = props;
  return (
    <View style={styles.viewTextRegister}>
      <Text style={styles.textRegister}>
        ¿Aún no tienes cuenta?{"  "}
        <Text
          style={styles.btnRegister}
          onPress={() => navigation.navigate("Register")}
        >
          Regístrate
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 30
  },
  viewContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
  viewFacebook: {
    marginRight: 30,
    marginLeft: 30,
  },
  divider: {
    backgroundColor: "#2BA418",
    margin: 15
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegister: {
    color: "#2BA418",
    fontWeight: "bold"
  },
  viewTextRegister: {
    alignItems: "center"
  }
});
