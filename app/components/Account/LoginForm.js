import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import * as firebase from "firebase";

function LoginForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const login = async () => {
    setIsVisibleLoading(true);
    if (!email || !password) {
      toastRef.current.show("Todos los campos son obligatorios.", 1000);
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no tiene un formato correcto.", 1000);
      } else {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate("MyAccount");
          })
          .catch(() => {
            toastRef.current.show("Email o contraseña incorrecta", 1000);
          });
      }
    }
    setIsVisibleLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      <Input
        maxLength={100}
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={"at"}
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        maxLength={100}
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        secureTextEntry={hidePassword}
        password={true}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />

      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={login}
      />
      <Loading isVisible={isVisibleLoading} text="Iniciando sesión" />
    </View>
  );
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputForm: {
    width: "100%",
    marginTop: 5,
    marginBottom: 19,
  },
  btnContainerLogin: {
    marginTop: 10,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#2BA418",
    borderRadius: 10,
    marginBottom: 10,
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
