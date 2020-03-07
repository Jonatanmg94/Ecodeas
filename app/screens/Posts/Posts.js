import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Card } from "react-native-elements";

export default function Posts(props) {
  const { navigation } = props;

  return (
    <View style={styles.viewBody}>
      <Grid>
        <Col>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListPosts", {
                postsCategory: "maderas"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/madera.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Maderas</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListPosts", {
                postsCategory: "metales"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/metales.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Metales</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListPosts", {
                postsCategory: "plasticos"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/plastico.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Plásticos</Text>
            </Card>
          </TouchableOpacity>
        </Col>
        <Col>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListPosts", {
                postsCategory: "textiles"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/textil.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Textiles</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListPosts", {
                postsCategory: "papeles"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/papel.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Papeles</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListPosts", {
                postsCategory: "vidrios"
              });
            }}
          >
            <Card>
              <Image
                source={require("../../../assets/img/cristal.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.txtGridTitles}>Vidrios</Text>
            </Card>
          </TouchableOpacity>
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
