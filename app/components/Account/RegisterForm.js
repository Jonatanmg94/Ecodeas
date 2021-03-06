import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../../components/Loading";

function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
  const [isVisibleLoading, setVisibleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const register = async () => {
    setVisibleLoading(true);
    if (!email || !password || !repeatPassword) {
      toastRef.current.show("Todos los campos son obligatorios.", 1000);
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no tiene un formato correcto.", 1000);
      } else {
        if (password !== repeatPassword) {
          toastRef.current.show(
            "Las contraseñas introducidas no son iguales.",
            1000
          );
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("MyAccount");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al crear la cuenta, intentelo más tarde.",
                1000
              );
            });
        }
      }
    }
    setVisibleLoading(false);
  };

  return (
    <View style={styles.formContainer} behavior="padding" enabled>
      <Input
        maxLength={100}
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        maxLength={100}
        placeholder="Contraseña"
        secureTextEntry={hidePassword}
        password={true}
        containerStyle={styles.inputForm}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Input
        maxLength={100}
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={hideRepeatPassword}
        onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
          />
        }
      />
      <Button
        title="Crear mi cuenta"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading text="creando cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}

export default withNavigation(RegisterForm);

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
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerRegister: {
    marginTop: 10,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#2BA418",
    borderRadius: 10,
    marginBottom: 10,
  },
});
