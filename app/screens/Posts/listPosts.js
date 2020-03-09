import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ListPostsTemplate from "../../components/Posts/listPostsTemplate";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function listPosts(props) {
  const { navigation } = props;
  const { params } = navigation.state;
  const postsCategory = params ? params.postsCategory : null;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [starPosts, setStarPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const limitPosts = 8;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("posts")
      .where(postsCategory, "==", true)
      .get()
      .then(snap => {
        setTotalPosts(snap.size);
      });
    (async () => {
      const resultPosts = [];
      const posts = db
        .collection("posts")
        .where(postsCategory, "==", true)
        .limit(limitPosts);
      await posts.get().then(response => {
        setStarPosts(response.docs[response.docs.length - 1]);
        response.forEach(doc => {
          let post = doc.data();
          post.id = doc.id;
          resultPosts.push({ post });
        });
        setPosts(resultPosts);
      });
    })();
  }, []);

  const handleLoadMore = async () => {
    const resultPosts = [];
    posts.length < totalPosts && setIsLoading(true);
    const postsDb = db
      .collection("posts")
      .where(postsCategory, "==", true)
      .startAfter(starPosts.data().createAt)

      .limit(limitPosts);

    await postsDb.get().then(response => {
      if (response.docs.length > 0) {
        setStarPosts(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }
      response.forEach(doc => {
        let post = doc.data();
        post.id = doc.id;
        resultPosts.push({ post });
      });

      setPosts([...posts, ...resultPosts]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListPostsTemplate
        posts={posts}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
        navigation={navigation}
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
