import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Card } from "react-native-elements";

export default function Events(props) {
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListEvents", {
                eventsCategory: "recogidas"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/reciclaje.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Recogida de basura</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListEvents", {
                eventsCategory: "charlas"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/charlas.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Charlas</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListEvents", {
                eventsCategory: "manifestaciones"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/manifestacion.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Manifestaciones</Text>
            </Card>
          </TouchableOpacity>
        </Col>
        <Col>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListEvents", {
                eventsCategory: "talleres"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/talleres.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Talleres</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListEvents", {
                eventsCategory: "ferias"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/ferias.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Ferias</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListEvents", {
                eventsCategory: "reforestaciones"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/reforestar.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Reforestaciones</Text>
            </Card>
          </TouchableOpacity>
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
