import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Card } from "react-native-elements";

export default function listEvents(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Grid>
        <Col>
          <Card>
            <Image
              source={require("../../../assets/img/reciclaje.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.txtGridTitles}>mierda</Text>
          </Card>
          <Card>
            <Image
              source={require("../../../assets/img/charlas.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.txtGridTitles}>mierda</Text>
          </Card>
          <Card>
            <Image
              source={require("../../../assets/img/manifestacion.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.txtGridTitles}>mierda</Text>
          </Card>
        </Col>
      </Grid>
      {user && <AddEventButton navigation={navigation} />}
    </View>
  );
}

function AddEventButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      active={true}
      buttonColor="rgba(43, 164, 24, 1)"
      onPress={() => navigation.navigate("AddEvent")}
    />
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
