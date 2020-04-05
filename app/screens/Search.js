import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import { Card, Button } from "react-native-elements";

export default function Search(props) {
  const { navigation } = props;

  return (
    <ScrollView>
      <View>
        <Grid>
          <Col>
            <Card>
              <Image
                source={require("../../assets/img/eventsearch.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Button
                title="Buscar eventos"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                onPress={() => {
                  navigation.navigate("SearchEvents");
                }}
              />
            </Card>

          </Col>
        </Grid>
        <Grid>
          <Col>
            <Card>
              <Image
                source={require("../../assets/img/postsearch.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Button
                title="Buscar posts"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                onPress={() => {
                  navigation.navigate("SearchPosts");
                }}
              />
            </Card>
          </Col>
        </Grid>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: "100%",
    marginBottom: 5,
    tintColor: "#969696"
  },
  txtGridTitles: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2BA418",
    textAlign: "center",
    paddingBottom: 10
  },
  btnContainer: {
    width: "100%",
    paddingTop: 10
  },
  btnStyle: {
    backgroundColor: "#2BA418",
    borderRadius: 10
  }
});
