import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Dimensions,
  TouchableOpacity,
  Picker
} from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Input,
  Button,
  Card,
  CheckBox,
  Divider,
  Text
} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import Modal from "../Modal";
import * as Location from "expo-location";
import Moment from "moment";
import DatePicker from "react-native-datepicker";
import uuid, { v4 as uuidv4 } from "uuid";
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
    Moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
  );
  const [eventDateFin, setEventDateFin] = useState(
    Moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
  );
  const [eventType, setEventType] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [eventCountry, setEventCountry] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventStreet, setEventStreet] = useState("");
  const [eventPostalCode, setEventPostalCode] = useState("");

  const optionsv4 = () => {
    uuidv4Options = uuidv4({
      random: [
        Math.floor(Math.random() * 100) + 1,
        Math.floor(Math.random() * 150) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 150) + 1,
        Math.floor(Math.random() * 100) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 256) + 1,
        Math.floor(Math.random() * 150) + 1
      ]
    });
  };

  const addEvent = () => {
    if (
      !eventName ||
      !eventDescription ||
      !eventType ||
      !eventCapacity ||
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
    } else if (!eventLocation) {
      toastRef.current.show(
        "Debes establecer la localización en el mapa",
        3000
      );
    } else if (!eventDateInit || !eventDateFin) {
      toastRef.current.show("Debes establecer las dos fechas del evento", 3000);
    } else {
      setIsLoading(false);
      uploadImagesStorage(imagesSelected);
    }
  };

  const testeoVariables = () => {
    console.log("eventName " + eventName);
    console.log("eventDescription " + eventDescription);
    console.log("eventCapacity " + eventCapacity);
    console.log("eventLocation " + eventLocation);
    console.log("eventCountry " + eventCountry);
    console.log("eventState " + eventState);
    console.log("eventStreet " + eventStreet);
    console.log("eventPostalCode " + eventPostalCode);
    console.log("eventdateInit " + eventDateInit);
    console.log("eventdateFin " + eventDateFin);
    console.log("eventype " + eventType);
  };

  const uploadImagesStorage = async imageArray => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async image => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref("events-images")
          .child(uuidv4());
        await ref.put(blob).then(result => {
          console.log(result);
        });
      })
    );
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
        setEventLocation={setEventLocation}
        eventLocation={eventLocation}
        setEventCountry={setEventCountry}
        setEventState={setEventState}
        setEventStreet={setEventStreet}
        setEventPostalCode={setEventPostalCode}
        setIsVisibleMap={setIsVisibleMap}
        testeoVariables={testeoVariables}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setEventLocation={setEventLocation}
        toastRef={toastRef}
      />
      <Button
        title="TesteoVariables"
        onPress={testeoVariables}
        buttonStyle={styles.btnCreateEvent}
      />
      <Button
        title="Ver random"
        onPress={() =>
          console.log(
            uuidv4({
              random: [
                Math.floor(Math.random() * 100) + 1,
                Math.floor(Math.random() * 150) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 150) + 1,
                Math.floor(Math.random() * 100) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 256) + 1,
                Math.floor(Math.random() * 150) + 1
              ]
            })
          )
        }
        buttonStyle={styles.btnCreateEvent}
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
    eventLocation,
    setEventType,
    eventType,
    setEventStatus,
    setEventCapacity,
    setEventLocation,
    setEventCountry,
    setEventState,
    setEventStreet,
    setEventPostalCode,
    setIsVisibleMap,
    testeoVariables
  } = props;

  return (
    <View style={styles.viewForm}>
      <Card>
        <View>
          <Text style={styles.txtHeadline} h4>
            Información
          </Text>
          <Input
            placeholder="Nombre del evento"
            containerStyle={styles.input}
            onChange={e => setEventName(e.nativeEvent.text)}
          />
          <Input
            placeholder="Descripción"
            containerStyle={styles.textArea}
            multiline={true}
            onChange={e => setEventDescription(e.nativeEvent.text)}
          />
        </View>
      </Card>
      <Card>
        <View style={styles.containerEventType}>
          <Text style={styles.txtHeadline} h4>
            Otros datos
          </Text>
          <Picker
            mode={"dropdown"}
            selectedValue={eventType == null ? "java" : eventType}
            style={styles.pickEventType}
            onValueChange={(itemValue, itemIndex) => setEventType(itemValue)}
          >
            <Picker.Item label="Recogida de basura" value="recogidas" />
            <Picker.Item label="Talleres" value="talleres" />
            <Picker.Item label="Charlas" value="charlas" />
            <Picker.Item label="Ferias" value="ferias" />
            <Picker.Item label="Manifestaciones" value="manifestaciones" />
            <Picker.Item label="Reforestaciones" value="reforestaciones" />
          </Picker>
          <Divider style={{ backgroundColor: "grey", height: 1 }} />
          <Input
            placeholder="Aforo del evento"
            containerStyle={styles.input}
            keyboardType="numeric"
            maxLength={1000000}
            onChange={e => setEventCapacity(e.nativeEvent.text)}
          />
          <Text style={styles.txtDateSelect}>Fecha inicial</Text>
          <DatePicker
            style={{ width: "100%" }}
            date={eventDateInit}
            mode="date"
            placeholder="Selecciona fecha inicial"
            format="YYYY-MM-DD hh:mn:ss"
            minDate="2016-05-01"
            maxDate="2030-06-01"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => setEventDateInit(date)}
          />
          <Text style={styles.txtDateSelect}>Fecha final</Text>
          <DatePicker
            style={{ width: "100%" }}
            date={eventDateFin}
            mode="date"
            placeholder="Selecciona fecha final"
            format="YYYY-MM-DD hh:mn:ss"
            minDate="2016-05-01"
            maxDate="2030-06-01"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => setEventDateFin(date)}
          />
        </View>
      </Card>
      <Card>
        <Text style={styles.txtHeadline} h4>
          Ubicación
        </Text>
        <TouchableOpacity onPress={() => setIsVisibleMap(true)}>
          <Input
            placeholder={
              eventLocation ? "Ubicación seleccionada" : "Seleccione ubicación"
            }
            placeholderTextColor={eventLocation ? "#2BA418" : "#000000"}
            disabled={true}
            rightIcon={{
              type: "material-community",
              name: "google-maps",
              color: eventLocation ? "#2BA418" : "#c2c2c2",
              onPress: () => setIsVisibleMap(true)
            }}
            containerStyle={styles.input}
            onChange={e => setEventLocation(e.nativeEvent.text)}
          />
        </TouchableOpacity>
        <Input
          placeholder="País"
          containerStyle={styles.input}
          onChange={e => setEventCountry(e.nativeEvent.text)}
        />
        <Input
          placeholder="Municipio"
          containerStyle={styles.input}
          onChange={e => setEventState(e.nativeEvent.text)}
        />
        <Input
          placeholder="Calle"
          containerStyle={styles.input}
          onChange={e => setEventStreet(e.nativeEvent.text)}
        />
        <Input
          placeholder="Código Postal"
          containerStyle={styles.input}
          keyboardType="numeric"
          onChange={e => setEventPostalCode(e.nativeEvent.text)}
        />
      </Card>
    </View>
  );
}

function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setEventLocation, toastRef } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localización para crear un evento.",
          3000
        );
      } else {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001 * 60,
          longitudeDelta: 0.001 * 60
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setEventLocation(location);
    toastRef.current.show("Localización guardada correctamente");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={region => setLocation(region)}
          >
            <MapView.Marker
              draggable
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
                longitudeDelta: location.longitudeDelta,
                latitudeDelta: location.latitudeDelta
              }}
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicación"
            onPress={confirmLocation}
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
          />
          <Button
            title="Cancelar Ubicación"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
          />
        </View>
      </View>
    </Modal>
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

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 0
  },
  viewBtn: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  viewMapBtnContainerSave: {
    paddingRight: 5
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5
  },
  viewMapBtnSave: {
    backgroundColor: "#2BA418"
  },
  viewMapBtnCancel: {
    backgroundColor: "#b2b2b2"
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    height: 70,
    width: 70,
    backgroundColor: "#d0d0d0"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
    marginBottom: 10
  },
  viewForm: {
    marginLeft: 5,
    marginRight: 5
  },
  input: {
    marginBottom: 10
  },
  inputMapDisabled: {
    color: "red"
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  },
  txtHeadline: {
    textAlign: "center",
    color: "#2BA418"
  },
  txtDateSelect: {
    marginBottom: 10,
    marginTop: 10
  },
  btnCreateEvent: {
    backgroundColor: "#2BA418",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  btnDate: {
    backgroundColor: "#b2b2b2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e7e7e7",
    marginBottom: 10
  },
  pickEventType: {
    height: 50,
    width: "100%"
  },
  mapStyle: {
    width: "100%",
    height: "90%"
  }
});
