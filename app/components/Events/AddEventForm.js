import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Input,
  Button,
  Card,
  CheckBox
} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const widthScreen = Dimensions.get("window").width;

export default function AddEventForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventMapUbication, setEventMapUbication] = useState("");
  const [eventCountry, setEventCountry] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventStreet, setEventStreet] = useState("");
  const [eventPostalCode, setEventPostalCode] = useState("");

  return (
    <ScrollView>
      <ImageEventFeatured imageEvent={imagesSelected[0]} />
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <FormAdd />
    </ScrollView>
  );
}

function ImageEventFeatured(props) {
  const { imageEvent } = props;

  return (
    <View style={styles.viewPhoto}>
      {imageEvent ? (
        <Image
          source={{ uri: imageEvent }}
          style={{ width: widthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/Noimage.png")}
          style={{ width: widthScreen, height: 200 }}
        />
      )}
    </View>
  );
}

function UploadImage(props) {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const imagesSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos. Si los denegaste, entra en ajustes y actívalo manualmente.",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galería sin seleccionar una imagen.",
          5000
        );
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
        console.log(imagesSelected);
      }
    }
  };

  const removeImage = image => {
    const arrayImages = imagesSelected;

    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImagesSelected(
              arrayImages.filter(imageUrl => imageUrl !== image)
            )
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImage}>
      {imagesSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imagesSelect}
        />
      )}

      {imagesSelected.map(imageEvent => (
        <Avatar
          key={imageEvent}
          onPress={() => removeImage(imageEvent)}
          style={styles.miniatureStyle}
          source={{ uri: imageEvent }}
        />
      ))}
    </View>
  );
}

function FormAdd(props) {
  return (
    <View style={styles.viewForm}>
      <Card>
        <Input
          placeholder="Nombre del evento"
          containerStyle={styles.input}
          onChange={() => console.log("Nombre del evento actualizado")}
        />
        <Input
          placeholder="Descripción"
          containerStyle={styles.textArea}
          multiline={true}
          onChange={() => console.log("Descripción actualizada.")}
        />
        <Input
          placeholder="Ubicación en el mapa"
          rightIcon={{
            type: "material-community",
            name: "google-maps",
            color: "#c2c2c2",
            onPress: () => console.log("Seleccione la ubicación")
          }}
          containerStyle={styles.input}
          onChange={() => console.log("Direccion actualizada.")}
        />
        <Input
          placeholder="País"
          containerStyle={styles.input}
          onChange={() => console.log("Nombre del evento actualizado")}
        />
        <Input
          placeholder="Municipio"
          containerStyle={styles.input}
          onChange={() => console.log("Nombre del evento actualizado")}
        />
        <Input
          placeholder="Calle"
          containerStyle={styles.input}
          onChange={() => console.log("Nombre del evento actualizado")}
        />
        <Input
          placeholder="Código Postal"
          containerStyle={styles.input}
          onChange={() => console.log("Nombre del evento actualizado")}
        />
        <CheckBox
          center
          title="Recogida de basura"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={true}
        />
        <CheckBox
          center
          title="Charla"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={true}
        />
        <CheckBox
          center
          title="Manifestación"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={true}
        />
        <CheckBox
          center
          title="Taller"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={true}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 0
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
    marginBottom: 10
  },
  viewForm: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  }
});
