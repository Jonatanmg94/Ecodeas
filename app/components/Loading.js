import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
  const { isVisible, text } = props;

  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#2BA418"></ActivityIndicator>
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 200,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#2BA418",
    borderWidth: 2,
    borderRadius: 100
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: "#2BA418",
    textTransform: "uppercase",
    marginTop: 20,
    fontWeight: "700"
  }
});
