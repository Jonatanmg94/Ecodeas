import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  YellowBox
} from "react-native";
import { Image, Icon, Card } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as firebase from "firebase";

export default function ListPostsTemplate(props) {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const { posts, isLoading, handleLoadMore, navigation } = props;

  return (
    <View>
      {posts ? (
        <FlatList
          data={posts}
          renderItem={post => <Post post={post} navigation={navigation} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loadingEvents}>
          <ActivityIndicator size="large" />
          <Text>Cargando posts...</Text>
        </View>
      )}
    </View>
  );
}

function Post(props) {
  const { post, navigation } = props;
  const { name, description, images } = post.item.post;
  const [imagePost, setImagePost] = useState(null);

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`posts-images/${image}`)
      .getDownloadURL()
      .then(result => {
        setImagePost(result);
      });
  });

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Post", { post })}>
      <View style={styles.viewEvent}>
        <Card>
          <Grid>
            <Col style={{ width: 80 }}>
              <View style={styles.viewEventImage}>
                <Image
                  resizeMode="cover"
                  source={{ uri: imagePost }}
                  style={styles.imageEvent}
                  PlaceholderContent={<ActivityIndicator color="#ƒƒffff" />}
                />
              </View>
            </Col>
            <Col>
              <Grid>
                <Row>
                  <View style={styles.viewEventTitle}>
                    <Text style={styles.eventName}>{name.toUpperCase()}</Text>
                  </View>
                </Row>
                <Row>
                  <View style={styles.viewEventDescription}>
                    <Text style={styles.eventDescription}>
                      {description.substring(0, 30) + "..."}
                    </Text>
                  </View>
                </Row>
              </Grid>
            </Col>
          </Grid>
        </Card>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <View style={styles.loadingEvents}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundEvents}>
        <Text>No quedan más eventos por cargar...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingEvents: {
    marginTop: 20,
    alignItems: "center"
  },
  viewEventTitle: {
    marginLeft: 10,
    flexDirection: "row"
  },
  viewEventContent: {
    marginLeft: 10,
    flexDirection: "row"
  },
  viewEventDescription: {
    marginLeft: 10,
    flexDirection: "row"
  },
  imageEvent: {
    width: 80,
    height: 80
  },
  eventName: {
    fontWeight: "bold"
  },
  eventDescription: {
    fontWeight: "300"
  },
  viewUbication: {
    marginRight: 10
  },
  loadingEvents: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundEvents: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
  }
});
