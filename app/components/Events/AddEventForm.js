import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Dimensions,
  TouchableOpacity,
  Picker,
} from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Input,
  Button,
  Card,
  CheckBox,
  Text,
} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Modal from "../Modal";
import Moment from "moment";
import DatePicker from "react-native-datepicker";
import uuid from "uuid/v4";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function AddEventForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDateInit, setEventDateInit] = useState(
    Moment(new Date()).format("DD-MM-YYYY")
  );
  const [eventDateFin, setEventDateFin] = useState(
    Moment(new Date()).format("DD-MM-YYYY")
  );
  const [eventType, setEventType] = useState("recogidas");
  const [eventStatus, setEventStatus] = useState("approbed");
  const [eventCapacity, setEventCapacity] = useState("");
  const [eventCountry, setEventCountry] = useState("");
  const [eventContactName, setEventContactName] = useState("");
  const [eventContactPhone, setEventContactPhone] = useState("");
  const [eventContactEmail, setEventContactEmail] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventStreet, setEventStreet] = useState("");
  const [eventPostalCode, setEventPostalCode] = useState("");

  const addEvent = () => {
    if (
      !eventName ||
      !eventDescription ||
      !eventType ||
      !eventCapacity ||
      !eventContactName ||
      !eventContactPhone ||
      !eventContactEmail ||
      !eventCountry ||
      !eventState ||
      !eventStreet ||
      !eventPostalCode
    ) {
      toastRef.current.show(
        "Todos los campos del formulario son obligatorios",
        3000
      );
    } else if (imagesSelected.length === 0) {
      toastRef.current.show("El evento tiene que tener almenos una foto", 3000);
    } else if (!eventDateInit || !eventDateFin) {
      toastRef.current.show("Debes establecer las dos fechas del evento", 3000);
    } else {
      setIsLoading(true);
      uploadImagesStorage(imagesSelected).then((arrayImages) => {
        db.collection("events")
          .add({
            name: eventName.toLowerCase(),
            description: eventDescription,
            contactName: eventContactName,
            contactPhone: eventContactPhone,
            contactEmail: eventContactEmail,
            country: eventCountry,
            state: eventState,
            street: eventStreet,
            zipCode: eventPostalCode,
            dateInit: eventDateInit,
            dateFin: eventDateFin,
            type: eventType,
            status: eventStatus,
            capacity: eventCapacity,
            images: arrayImages,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createdBy: firebaseApp.auth().currentUser.uid,
          })
          .then(() => {
            setIsLoading(false);
            navigation.navigate("Events");
          })
          .catch((error) => {
            setIsLoading(false);
            toastRef.current.show(
              "Error al subir el evento, intentelo más tarde"
            );
          });
      });
    }
  };

  const uploadImagesStorage = async (imageArray) => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("events-images").child(uuid());
        await ref.put(blob).then((result) => {
          imagesBlob.push(result.metadata.name);
        });
      })
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <ImageEventFeatured imageEvent={imagesSelected[0]} />
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <FormAdd
        setEventName={setEventName}
        setEventDescription={setEventDescription}
        setEventDateInit={setEventDateInit}
        setEventDateFin={setEventDateFin}
        eventDateInit={eventDateInit}
        eventDateFin={eventDateFin}
        setEventType={setEventType}
        eventType={eventType}
        setEventStatus={setEventStatus}
        setEventCapacity={setEventCapacity}
        setEventCountry={setEventCountry}
        setEventContactName={setEventContactName}
        setEventContactPhone={setEventContactPhone}
        setEventContactEmail={setEventContactEmail}
        setEventState={setEventState}
        setEventStreet={setEventStreet}
        setEventPostalCode={setEventPostalCode}
      />
      <Button
        title="Crear nuevo evento"
        onPress={addEvent}
        buttonStyle={styles.btnCreateEvent}
      />
    </ScrollView>
  );
}

function FormAdd(props) {
  const {
    setEventName,
    setEventDescription,
    setEventDateInit,
    setEventDateFin,
    eventDateInit,
    eventDateFin,
    setEventType,
    eventType,
    setEventStatus,
    setEventCapacity,
    setEventCountry,
    setEventContactName,
    setEventContactPhone,
    setEventContactEmail,
    setEventState,
    setEventStreet,
    setEventPostalCode,
  } = props;

  return (
    <View style={styles.viewForm}>
      <Card containerStyle={styles.cards}>
        <View>
          <Text style={styles.txtHeadline} h4>
            Información
          </Text>
          <Input
            maxLength={70}
            label="Nombre"
            placeholder="nombre del evento..."
            labelStyle={styles.inputLabel}
            containerStyle={styles.input}
            onChange={(e) => setEventName(e.nativeEvent.text)}
          />
          <Input
            maxLength={500}
            labelStyle={styles.inputLabel}
            label="Descripción"
            placeholder="descripción del evento..."
            containerStyle={styles.textArea}
            multiline={true}
            onChange={(e) => setEventDescription(e.nativeEvent.text)}
          />
        </View>
      </Card>
      <Card containerStyle={styles.cards}>
        <View style={styles.containerEventType}>
          <Text style={styles.txtHeadline} h4>
            Fechas del evento
          </Text>

          <Text style={styles.txtDateSelect}>Fecha inicial</Text>
          <DatePicker
            style={{ width: "100%" }}
            date={eventDateInit}
            mode="date"
            placeholder="Selecciona fecha inicial"
            format="DD-MM-YYYY"
            minDate="01-05-2020"
            maxDate="31-12-2100"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => setEventDateInit(date)}
          />
          <Text style={styles.txtDateSelect}>Fecha final</Text>
          <DatePicker
            style={{ width: "100%" }}
            date={eventDateFin}
            mode="date"
            placeholder="Selecciona fecha final"
            format="DD-MM-YYYY"
            minDate="01-05-2020"
            maxDate="31-12-2100"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => setEventDateFin(date)}
          />
        </View>
      </Card>
      <Card containerStyle={styles.cards}>
        <Text style={styles.txtHeadline} h4>
          Características y contacto
        </Text>
        <Card containerStyle={styles.cardTypeEvent}>
          <Text style={styles.inputLabelCustom}>Tipo de evento</Text>
          <Picker
            mode={"dropdown"}
            selectedValue={eventType == null ? "java" : eventType}
            onValueChange={(itemValue) => setEventType(itemValue)}
          >
            <Picker.Item label="Recogida de basura" value="recogidas" />
            <Picker.Item label="Talleres" value="talleres" />
            <Picker.Item label="Charlas" value="charlas" />
            <Picker.Item label="Ferias" value="ferias" />
            <Picker.Item label="Manifestaciones" value="manifestaciones" />
            <Picker.Item label="Reforestaciones" value="reforestaciones" />
          </Picker>
        </Card>
        <Input
          maxLength={10}
          labelStyle={styles.inputLabel}
          label="Aforo del evento"
          placeholder="total de personas..."
          containerStyle={styles.input}
          keyboardType="numeric"
          maxLength={1000000}
          onChange={(e) => setEventCapacity(e.nativeEvent.text)}
        />
        <Input
          maxLength={100}
          labelStyle={styles.inputLabel}
          label="Persona de contacto..."
          placeholder="nombre completo..."
          containerStyle={styles.input}
          onChange={(e) => setEventContactName(e.nativeEvent.text)}
        />
        <Input
          maxLength={12}
          labelStyle={styles.inputLabel}
          label="Teléfono de contacto"
          placeholder="teléfono móvil o fijo..."
          keyboardType="numeric"
          containerStyle={styles.input}
          onChange={(e) => setEventContactPhone(e.nativeEvent.text)}
        />
        <Input
          maxLength={35}
          labelStyle={styles.inputLabel}
          label="Email de contacto"
          placeholder="correo electrónico..."
          containerStyle={styles.input}
          onChange={(e) => setEventContactEmail(e.nativeEvent.text)}
        />
      </Card>
      <Card containerStyle={styles.cards}>
        <Text style={styles.txtHeadline} h4>
          Ubicación
        </Text>
        <Input
          maxLength={30}
          labelStyle={styles.inputLabel}
          label="País"
          placeholder="país..."
          containerStyle={styles.input}
          onChange={(e) => setEventCountry(e.nativeEvent.text)}
        />
        <Input
          maxLength={30}
          labelStyle={styles.inputLabel}
          label="Municipio"
          placeholder="municipio..."
          containerStyle={styles.input}
          onChange={(e) => setEventState(e.nativeEvent.text)}
        />
        <Input
          maxLength={30}
          labelStyle={styles.inputLabel}
          label="Calle"
          placeholder="calle..."
          containerStyle={styles.input}
          onChange={(e) => setEventStreet(e.nativeEvent.text)}
        />
        <Input
          maxLength={6}
          labelStyle={styles.inputLabel}
          label="Código postal"
          placeholder="código postal..."
          containerStyle={styles.input}
          keyboardType="numeric"
          onChange={(e) => setEventPostalCode(e.nativeEvent.text)}
        />
      </Card>
    </View>
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
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galería sin seleccionar una imagen.",
          5000
        );
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    const arrayImages = imagesSelected;

    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImagesSelected(
              arrayImages.filter((imageUrl) => imageUrl !== image)
            ),
        },
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

      {imagesSelected.map((imageEvent) => (
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

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 0,
  },
  cardTypeEvent: {
    width: "100%",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D5D5D5",
    marginBottom: 20,
    marginLeft: 0,
  },
  viewBtn: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#2BA418",
  },
  viewMapBtnCancel: {
    backgroundColor: "#b2b2b2",
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    height: 70,
    width: 70,
    backgroundColor: "#d0d0d0",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
    marginBottom: 10,
  },
  viewForm: {
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D5D5D5",
  },
  inputLabel: {
    color: "#2BA418",
  },
  inputLabelCustom: {
    color: "#2BA418",
    fontWeight: "bold",
  },
  inputMapDisabled: {
    color: "red",
  },
  textArea: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D5D5D5",
    width: "100%",
    padding: 0,
    margin: 0,
  },
  txtHeadline: {
    textAlign: "center",
    color: "#2BA418",
    marginBottom: 10,
  },
  txtDateSelect: {
    marginBottom: 10,
    marginTop: 10,
  },
  btnCreateEvent: {
    backgroundColor: "#2BA418",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  btnDate: {
    backgroundColor: "#b2b2b2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e7e7e7",
    marginBottom: 10,
  },
  mapStyle: {
    width: "100%",
    height: "90%",
  },
  cards: {
    borderRadius: 20,
  },
});
