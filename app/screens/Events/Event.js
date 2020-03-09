import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import { Rating, Card, Icon, ListItem } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
import moment from "moment";
import * as firebase from "firebase";

const screenWidth = Dimensions.get("window").width;

export default function Event(props) {
  const { navigation } = props;
  const { event } = navigation.state.params.event.item;
  const [imagesEvent, setImagesEvent] = useState([]);

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

  return (
    <ScrollView style={styles.viewBody}>
      <Carousel arrayImages={imagesEvent} width={screenWidth} height={200} />
      <TitleEvent
        name={event.name}
        description={event.description}
        rating={event.rating}
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
  }
});
