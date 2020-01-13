import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const {
    userInfo: { uid, displayName, email, photoURL }
  } = props;

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera == "denied") {
      console.log("Es necesario aceptar los permisos de la galería.");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        console.log("has cancelado la galeria");
      } else {
        uploadImage(result.uri, uid);
      }
    }
  };

  const uploadImage = async (uri, nameImage) => {
    const response = await fetch(uri);
    console.log(response);
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="xlarge"
        showEditButton
        onEditPress={changeAvatar}
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
          {displayName ? displayName : "anonimo"}
        </Text>
        <Text style={styles.displayEmail}>{email ? email : "sin email"}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20,
    borderWidth: 5,
    borderColor: "#CDCDCD",
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
