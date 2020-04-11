import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card, Image, Icon, Rating } from "react-native-elements";
import * as firebase from "firebase";

export default function ListTopPosts(props) {
  const { posts, navigation } = props;

  return (
    <FlatList
      data={posts}
      renderItem={(post) => <Post post={post} navigation={navigation} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

function Post(props) {
  const { post, navigation } = props;
  const { name, description, images, rating } = post.item;
  const [imagePost, setImagePost] = useState(null);
  const [iconColor, setIconColor] = useState("#000");

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`posts-images/${image}`)
      .getDownloadURL()
      .then((response) => {
        setImagePost(response);
      });
  }, []);

  useEffect(() => {
    if (post.index === 0) {
      setIconColor("#efb819");
    } else if (post.index === 1) {
      setIconColor("#e3e4e5");
    } else if (post.index === 2) {
      setIconColor("#cd7f32");
    }
  });

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Post", {
          post: post.item,
        })
      }
    >
      <Card containerStyle={styles.containerCard}>
        <Icon
          type="material-community"
          name="chess-queen"
          color={iconColor}
          size={40}
          containerStyle={styles.containerIcon}
        />
        <Image
          style={styles.postImage}
          resizeMode="cover"
          source={{ uri: imagePost }}
        />
        <View style={styles.titleRating}>
          <Text style={styles.title}>{name}</Text>
          <Rating
            imageSize={20}
            startingValue={rating}
            readonly
            style={styles.rating}
          />
        </View>
        <Text style={styles.description}>
          {description.substring(0, 80) + "..."}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 30,
    borderWidth: 0,
    borderRadius: 10,
  },
  containerIcon: {
    position: "absolute",
    top: -30,
    left: -30,
    zIndex: 1,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  titleRating: {
    flexDirection: "row",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  description: {
    color: "grey",
    marginTop: 0,
    textAlign: "justify",
  },
});
