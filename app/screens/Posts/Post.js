import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Linking,
  Image,
} from "react-native";
import { Rating, Card, Button } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel from "../../components/Carousel";
import ListPosts from "../../components/Posts/ListComments";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";

const screenWidth = Dimensions.get("window").width;

export default function Post(props) {
  const { navigation } = props;
  const { post } = navigation.state.params;
  const [imagesPost, setImagesPost] = useState([]);
  const [rating, setRating] = useState(post.rating);

  useEffect(() => {
    const arrayUrls = [];
    (async () => {
      await Promise.all(
        post.images.map(async (idImage) => {
          await firebase
            .storage()
            .ref(`posts-images/${idImage}`)
            .getDownloadURL()
            .then((imageUrl) => {
              arrayUrls.push(imageUrl);
            });
        })
      );
      setImagesPost(arrayUrls);
    })();
  }, []);

  return (
    <ScrollView style={styles.viewBody}>
      <Carousel arrayImages={imagesPost} width={screenWidth} height={200} />
      <TitlePost
        name={post.name}
        description={post.description}
        postVideoUrl={post.postVideoUrl}
        postTypeWood={post.postTypeWood}
        postTypeGlass={post.postTypeGlass}
        postTypeMetal={post.postTypeMetal}
        postTypePaper={post.postTypePaper}
        postTypePlastic={post.postTypePlastic}
        postTypeTextile={post.postTypeTextile}
        rating={rating}
        createAt={post.createAt}
      />
      <ListPosts
        navigation={navigation}
        idPost={post.id}
        setRating={setRating}
      />
    </ScrollView>
  );
}

function TitlePost(props) {
  const {
    name,
    description,
    rating,
    createAt,
    postVideoUrl,
    postTypeWood,
    postTypeGlass,
    postTypeMetal,
    postTypePaper,
    postTypePlastic,
    postTypeTextile,
  } = props;
  const datePost = createAt.toDate();

  return (
    <View style={styles.viewEventTitle}>
      <Card containerStyle={styles.cards}>
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
        <Text style={styles.descriptionEventTitle}>Descripción: </Text>
        <Text style={styles.eventText}>{description}</Text>
        <View>
          {postVideoUrl == "" ? (
            <Text></Text>
          ) : (
            <Button
              icon={<Icon name="youtube" size={25} color="white" />}
              title=" Ver video"
              buttonStyle={styles.btnStyle}
              containerStyle={styles.btnContainer}
              onPress={() => {
                Linking.openURL(postVideoUrl);
              }}
            />
          )}
        </View>
        <Text style={styles.materialsEventTitle}>Materiales: </Text>
        <Grid>
          <Col>
            <Image
              source={require("../../../assets/img/madera.png")}
              style={
                postTypeWood == false ? styles.materialNo : styles.materialOk
              }
              resizeMode="contain"
            />
          </Col>
          <Col>
            <Image
              source={require("../../../assets/img/metales.png")}
              style={
                postTypeMetal == false ? styles.materialNo : styles.materialOk
              }
              resizeMode="contain"
            />
          </Col>
          <Col>
            <Image
              source={require("../../../assets/img/plastico.png")}
              style={
                postTypePlastic == false ? styles.materialNo : styles.materialOk
              }
              resizeMode="contain"
            />
          </Col>
          <Col>
            <Image
              source={require("../../../assets/img/textil.png")}
              style={
                postTypeTextile == false ? styles.materialNo : styles.materialOk
              }
              resizeMode="contain"
            />
          </Col>
          <Col>
            <Image
              source={require("../../../assets/img/papel.png")}
              style={
                postTypePaper == false ? styles.materialNo : styles.materialOk
              }
              resizeMode="contain"
            />
          </Col>
          <Col>
            <Image
              source={require("../../../assets/img/cristal.png")}
              style={
                postTypeGlass == false ? styles.materialNo : styles.materialOk
              }
              resizeMode="contain"
            />
          </Col>
        </Grid>
        <Text style={styles.eventTextPublished}>
          {"Publicado: " +
            moment.unix(datePost / 1000).format("DD MMM YYYY hh:mm a")}
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewEventTitle: {
    margin: 0,
  },
  descriptionEventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  materialsEventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nameEvent: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  descriptionEvent: {
    marginTop: 15,
    color: "grey",
  },
  viewEventInfo: {
    margin: 10,
    marginTop: 5,
  },
  viewEventBlock: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 15,
    marginLeft: 15,
  },
  eventInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventText: {
    fontSize: 14,
    color: "grey",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
  eventTextPublished: {
    fontSize: 10,
    color: "grey",
    textAlign: "right",
  },
  btnStyle: {
    backgroundColor: "#ff0000",
    borderRadius: 10,
  },
  btnContainer: {
    width: "100%",
    paddingBottom: 20,
    paddingTop: 10,
  },
  materialNo: {
    height: 30,
    width: "100%",
    marginBottom: 10,
    tintColor: "#969696",
  },
  materialOk: {
    height: 30,
    width: "100%",
    marginBottom: 10,
    tintColor: "#2BA418",
  },
  cards: {
    borderRadius: 10,
  },
});
