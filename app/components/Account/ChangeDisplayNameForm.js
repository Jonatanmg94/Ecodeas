import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
  const {
    displayName,
    setIsVisibleModal,
    setReloadData,
    toastRef,
    navigation,
  } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDisplayName = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre de usuario no ha cambiado");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          navigation.state.params.setReloadData("true"), navigation.pop(2);
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Error al actualizar el nombre.");
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.txtHeadline} h4>
        Cambiar nombre
      </Text>
      <Input
        maxLength={80}
        placeholder="Nombre"
        containerStyle={styles.input}
        defaultValue={displayName && displayName}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#C2C2C2",
        }}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnChange}
        onPress={updateDisplayName}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  txtHeadline: {
    textAlign: "center",
    color: "#2BA418",
    marginBottom: 10,
  },
  btnChange: {
    backgroundColor: "#000000",
    borderRadius: 10,
  },
});
