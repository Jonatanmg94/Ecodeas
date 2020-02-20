import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";

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
      <Text>Estamos en eventos JAJAJA...</Text>

      {user && <AddEventButton navigation={navigation} />}
    </View>
  );
}

function AddEventButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      active={true}
      buttonColor="rgba(231,76,60,1)"
      onPress={() => navigation.navigate("AddEvent")}
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
