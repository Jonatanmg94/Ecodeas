import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import { YellowBox } from "react-native";

export default function UserProfile(props) {
  YellowBox.ignoreWarnings(["Setting a timer"]);

  const {
    userProfile: { uid, displayName, email, photoURL },
    setReloadData
  } = props;

  return (
    <View style={styles.viewUserProfile}>
      <Avatar
        rounded
        size="xlarge"
        containerStyle={styles.userInfoAvatar}
        overlayContainerStyle={{ backgroundColor: "#fff" }}
        source={{
          uri: photoURL
            ? photoURL + "?type=large"
            : "https://firebasestorage.googleapis.com/v0/b/ecodeas-5142d.appspot.com/o/UsersAvatars%2FDefaultAvatar%2Favatar.png?alt=media&token=607d825f-80cc-4d73-b70e-637487b45a02"
        }}
      />
      <View style={styles.viewUserName}>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text style={styles.displayEmail}>{email ? email : "sin email"}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  viewUserProfile: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    borderWidth: 5,
    borderColor: "#2BA418",
    borderStyle: "solid"
  },
  displayName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2BA418"
  },
  displayEmail: {
    fontSize: 14,
    color: "#2BA418"
  },
  viewUserName: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  }
});
