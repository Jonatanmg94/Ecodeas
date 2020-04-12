import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import ListTopPosts from "../components/Ranking/ListTopPosts";
import { firebaseApp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Ranking(props) {
  const { navigation } = props;
  const [posts, setPosts] = useState([]);
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      db.collection("posts")
        .orderBy("rating", "desc")
        .limit(5)
        .get()
        .then((response) => {
          const postsArray = [];
          response.forEach((doc) => {
            let post = doc.data();
            post.id = doc.id;
            postsArray.push(post);
          });
          setPosts(postsArray);
        })
        .catch(() => {
          toastRef.current.show(
            "Error al cargar el Ranking, intentlo más tarde",
            3000
          );
        });
    })();
  }, []);

  return (
    <View>
      <ListTopPosts posts={posts} navigation={navigation} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </View>
  );
}
