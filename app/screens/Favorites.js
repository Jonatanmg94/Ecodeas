import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import Loading from "../components/Loading";
import Toast from "react-native-easy-toast";
import { NavigationEvents } from "react-navigation";
import { firebaseApp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
  const { navigation } = props;
  const [events, setEvents] = useState([]);
  const [reloadEvents, setReloadEvents] = useState(false);
  const [isVisibleLoding, setIsVisibleLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    if (userLogged) {
      const idUser = firebase.auth().currentUser.uid;
      db.collection("events-favorites")
        .where("idUser", "==", idUser)
        .get()
        .then(response => {
          const idEventsArray = [];
          response.forEach(doc => {
            idEventsArray.push(doc.data().idEvent);
          });

          getDataEvents(idEventsArray).then(response => {
            const events = [];
            response.forEach(doc => {
              let event = doc.data();
              event.id = doc.id;
              events.push(event);
            });
            setEvents(events);
          });
        });
    }
    setReloadEvents(false);
  }, [reloadEvents]);

  const getDataEvents = idEventsArray => {
    const arrayEvents = [];
    idEventsArray.forEach(idEvent => {
      const result = db
        .collection("events")
        .doc(idEvent)
        .get();
      arrayEvents.push(result);
    });
    return Promise.all(arrayEvents);
  };

  if (!userLogged) {
    return (
      <UserNoLogged setReloadEvents={setReloadEvents} navigation={navigation} />
    );
  }

  if (events.length === 0) {
    return <NotFoundEvents setReloadEvents={setReloadEvents} />;
  }

  return (
    <View style={styles.viewBody}>
      <NavigationEvents onWillFocus={() => setReloadEvents(true)} />
      {events ? (
        <FlatList
          data={events}
          renderItem={event => (
            <Event
              event={event}
              navigation={navigation}
              setIsVisibleLoading={setIsVisibleLoading}
              setReloadEvents={setReloadEvents}
              toastRef={toastRef}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
          <View style={styles.loaderEvents}>
            <ActivityIndicator size="large" />
            <Text>Cargando eventos</Text>
          </View>
        )}
      <Toast ref={toastRef} position="center" opacity={1} />
      <Loading text="Eliminando Evento" isVisible={isVisibleLoding} />
    </View>
  );
}

function Event(props) {
  const {
    event,
    navigation,
    setIsVisibleLoading,
    setReloadEvents,
    toastRef
  } = props;
  const { id, name, images } = event.item;
  const [imageEvent, setImageEvent] = useState(null);

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`events-images/${image}`)
      .getDownloadURL()
      .then(response => {
        setImageEvent(response);
      });
  }, []);

  const confirmRemoveFavorite = () => {
    Alert.alert(
      "Eliminar evento de Favoritos",
      "¿Estas seguro de que quieres eliminar el evento de favoritos?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: removeFavorite
        }
      ],
      { cancelable: false }
    );
  };

  const removeFavorite = () => {
    setIsVisibleLoading(true);
    db.collection("events-favorites")
      .where("idEvent", "==", id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then(response => {
        response.forEach(doc => {
          const idFavorite = doc.id;
          db.collection("events-favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsVisibleLoading(false);
              setReloadEvents(true);
              toastRef.current.show("evento eliminado correctamente");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al eliminar el evento, intentelo más tarde"
              );
            });
        });
      });
  };

  return (
    <View style={styles.event}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Event", { event: event.item })}
      >
        <Image
          resizeMode="cover"
          source={{ uri: imageEvent }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Icon
          type="material-community"
          name="heart"
          color="#00a680"
          containerStyle={styles.favorite}
          onPress={confirmRemoveFavorite}
          size={40}
          underlayColor="transparent"
        />
      </View>
    </View>
  );
}

function NotFoundEvents(props) {
  const { setReloadEvents } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NavigationEvents onWillFocus={() => setReloadEvents(true)} />
      <Icon type="material-community" name="alert-outline" size={70} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        No tienes eventos en tu lista
      </Text>
    </View>
  );
}

function UserNoLogged(props) {
  const { setReloadEvents, navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NavigationEvents onWillFocus={() => setReloadEvents(true)} />
      <Icon type="material-community" name="alert-outline" size={70} />
      <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
        Necesitas estar logeado para ver esta sección.
      </Text>
      <Button
        title="Ir al login"
        onPress={() => navigation.navigate("Login")}
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#2BA418", borderRadius: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10
  },
  restaurant: {
    margin: 10
  },
  image: {
    width: "100%",
    height: 180
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -30,
    backgroundColor: "#fff"
  },
  name: {
    fontWeight: "bold",
    fontSize: 20
  },
  favorite: {
    marginTop: -35,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100
  }
});
