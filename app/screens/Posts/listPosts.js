import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import * as firebase from "firebase";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Card } from "react-native-elements";

export default function listPosts(props) {
  const { navigation } = props;
  const { params } = navigation.state;
  const postsCategory = params ? params.postsCategory : null;
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
          <Button
            title="que hay en category"
            onPress={() => console.log(postsCategory)}
            buttonStyle={styles.btnCreateEvent}
          />
        </Col>
      </Grid>
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
