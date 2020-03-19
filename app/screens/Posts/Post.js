import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import { Rating, Card, Icon, ListItem } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel from "../../components/Carousel";
import ListPosts from "../../components/Posts/ListComments";
import moment from "moment";
import * as firebase from "firebase";

const screenWidth = Dimensions.get("window").width;

export default function Post(props) {
  const { navigation } = props;
  const { post } = navigation.state.params.post.item;
  const [imagesPost, setImagesPost] = useState([]);
  const [rating, setRating] = useState(post.rating);


  useEffect(() => {
    const arrayUrls = [];
    (async () => {
      await Promise.all(
        post.images.map(async idImage => {
          await firebase
            .storage()
            .ref(`posts-images/${idImage}`)
            .getDownloadURL()
            .then(imageUrl => {
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
        rating={post.rating}
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
  const { name, description, rating, createAt, postVideoUrl } = props;
  const datePost = createAt.toDate();

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
        <Text style={styles.eventText}>{postVideoUrl}</Text>
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
