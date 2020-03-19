import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import { Rating, Card, Icon, ListItem } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
import moment from "moment";
import ListReviews from "../../components/Events/ListReviews";
import Toast from "react-native-easy-toast";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const screenWidth = Dimensions.get("window").width;

export default function Event(props) {
  const { navigation } = props;
  const { event } = navigation.state.params;
  const [imagesEvent, setImagesEvent] = useState([]);
  const [rating, setRating] = useState(event.rating);
  const [isFavorite, setIsFavorite] = useState(false);
  const toastRef = useRef();
  useEffect(() => {
    const arrayUrls = [];
    (async () => {
      await Promise.all(
        event.images.map(async idImage => {
          await firebase
            .storage()
            .ref(`events-images/${idImage}`)
            .getDownloadURL()
            .then(imageUrl => {
              arrayUrls.push(imageUrl);
            });
        })
      );
      setImagesEvent(arrayUrls);
    })();
  }, []);

  useEffect(() => {
    db.collection("events-favorites")
      .where("idEvent", "==", event.id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then(response => {
        if (response.docs.length === 1) {
          setIsFavorite(true);
        }
      });
  }, []);

  const addFavorite = () => {
    const payload = {
      idUser: firebase.auth().currentUser.uid,
      idEvent: event.id
    };
    db.collection("events-favorites")
      .add(payload)
      .then(() => {
        setIsFavorite(true);
        toastRef.current.show("Evento añadido a la lista de favoritos", 3000);
      })
      .catch(() => {
        toastRef.current.show(
          "No se ha podido añadir a la lista de favoritos",
          3000
        );
      });
  };

  const removeFavorite = () => {
    db.collection("events-favorites")
      .where("idEvent", "==", event.id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then(response => {
        response.forEach(doc => {
          const idFavorite = doc.id;
          db.collection("events-favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsFavorite(false);
              toastRef.current.show(
                "Evento eliminado de la lista de favoritos",
                3000
              );
            })
            .catch(() => {
              toastRef.current.show(
                "No se ha podido eliminar el evento de favoritos",
                3000
              );
            });
        });
      });
  };

  return (
    <ScrollView style={styles.viewBody}>
      <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "red" : "grey"}
          size={35}
          underlayColor="transparent"
        />
      </View>
      <Carousel arrayImages={imagesEvent} width={screenWidth} height={200} />
      <TitleEvent
        name={event.name}
        description={event.description}
        rating={rating}
        createAt={event.createAt}
      />
      <EventInfo
        location={event.location}
        name={event.name}
        state={event.state}
        country={event.country}
        street={event.street}
        zipCode={event.zipCode}
        dateInit={event.dateInit}
        dateFin={event.dateFin}
        capacity={event.capacity}
      />
      <ListReviews
        navigation={navigation}
        idEvent={event.id}
        setRating={setRating}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

function TitleEvent(props) {
  const { name, description, rating, createAt } = props;
  const dateEvent = createAt.toDate();

  return (
    <View style={styles.viewEventTitle}>
      <Card>
        <Grid>
          <Col style={{ width: "73%", paddingBottom: 10 }}>
            <Text style={styles.nameEvent}>{name}</Text>
          </Col>
          <Col>
            <View style={{ flexDirection: "row" }}>
              <Rating
                style={styles.rating}
                imageSize={18}
                readonly
                startingValue={parseFloat(rating)}
              />
            </View>
          </Col>
        </Grid>
        <Text style={styles.eventText}>{description}</Text>
        <Text style={styles.eventTextPublished}>
          {"Publicado: " +
            moment.unix(dateEvent / 1000).format("DD MMM YYYY hh:mm a")}
        </Text>
      </Card>
    </View>
  );
}

function EventInfo(props) {
  const {
    location,
    name,
    state,
    country,
    street,
    zipCode,
    dateInit,
    dateFin,
    capacity
  } = props;

  const listInfo = [
    {
      text: country + ",  " + state + ", " + street + ", " + zipCode,
      iconName: "map-marker",
      iconType: "material-community",
      action: null
    },
    {
      text: "Aforo: " + capacity + " personas",
      iconName: "user",
      iconType: "font-awesome",
      action: null
    },
    {
      text: "Comienza: " + dateInit,
      iconName: "calendar",
      iconType: "font-awesome",
      action: null
    },
    {
      text: "Finaliza: " + dateFin,
      iconName: "calendar",
      iconType: "font-awesome",
      action: null
    }
  ];

  return (
    <View>
      <Card>
        <View style={styles.viewEventInfo}>
          <Text style={styles.eventInfoTitle}>Información del evento</Text>
        </View>
        <View style={styles.viewEventBlock}>
          <Map location={location} name={name} height={160} />
          {listInfo.map((item, index) => (
            <ListItem
              key={index}
              title={item.text}
              leftIcon={{
                name: item.iconName,
                type: item.iconType,
                color: "#2BA418"
              }}
              containerStyle={styles.containerListItem}
            />
          ))}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewEventTitle: {
    margin: 0
  },
  nameEvent: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  },
  descriptionEvent: {
    marginTop: 15,
    color: "grey"
  },
  viewEventInfo: {
    margin: 10,
    marginTop: 5
  },
  viewEventBlock: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15
  },
  eventInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  eventTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
  eventText: {
    fontSize: 14,
    color: "grey",
    marginBottom: 10
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1
  },
  eventTextPublished: {
    fontSize: 10,
    color: "grey",
    textAlign: "right"
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "white",
    borderBottomLeftRadius: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5
  }
});
