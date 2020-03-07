import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { Card } from "react-native-elements";
import ListEventsTemplate from "../../components/Events/listEventsTemplate";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function listEvents(props) {
  const { navigation } = props;
  const { params } = navigation.state;
  const eventsCategory = params ? params.eventsCategory : null;
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [starEvents, setStarEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalEvents, setTotalEvents] = useState(0);
  const limitEvents = 8;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("events")
      .where("type", "==", eventsCategory)
      .get()
      .then(snap => {
        setTotalEvents(snap.size);
      });
    (async () => {
      const resultEvents = [];
      const events = db
        .collection("events")
        .where("type", "==", eventsCategory)
        .limit(limitEvents);
      await events.get().then(response => {
        setStarEvents(response.docs[response.docs.length - 1]);
        response.forEach(doc => {
          let event = doc.data();
          event.id = doc.id;
          resultEvents.push({ event });
        });
        setEvents(resultEvents);
      });
    })();
  }, []);

  const handleLoadMore = async () => {
    const resultEvents = [];
    events.length < totalEvents && setIsLoading(true);
    const eventsDb = db
      .collection("events")
      .where("type", "==", eventsCategory)
      .startAfter(starEvents.data().createAt)
      .limit(limitEvents);

    await eventsDb.get().then(response => {
      if (response.docs.length > 0) {
        setStarEvents(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }
      response.forEach(doc => {
        let event = doc.data();
        event.id = doc.id;
        resultEvents.push({ event });
      });

      setEvents([...events, ...resultEvents]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListEventsTemplate
        events={events}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  image: {
    height: 80,
    width: "100%",
    marginBottom: 10,
    tintColor: "#969696"
  },
  txtGridTitles: {
    fontWeight: "bold",
    color: "#2BA418",
    textAlign: "center"
  }
});
