import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function UserGuest(props) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/userGuestWelcome.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Súmate a nuestra comunidad</Text>
      <Text style={styles.description}>
        Con tu cuenta podrás crear nuevos posts y eventos, además de poder
        publicar opiniones en ellos. Regístrate ya para comenzar a cambiar tu
        entorno con Ecodeas.
      </Text>
      <Text style={styles.description}>Regístrate ya o inicia sesión.</Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Acceder a mi cuenta"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#2BA418",
    borderRadius: 10,
  },
  btnContainer: {
    width: "70%",
  },
});
