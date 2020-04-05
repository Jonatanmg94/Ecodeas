import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Avatar, Card, ListItem, Button } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { YellowBox } from "react-native";
import { withNavigation } from "react-navigation";
import Modal from "../Modal";
import ChangeDisplayNameForm from "../Account/ChangeDisplayNameForm";
import ChangeEmailForm from "../Account/ChangeEmailForm";
import ChangePasswordForm from "../Account/ChangePasswordForm";

function InfoUser(props) {
  YellowBox.ignoreWarnings(["Setting a timer"]);
  const { userInfo } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const {
    userInfo: { uid, displayName, email, photoURL },
    setReloadData,
    toastRef,
    setIsLoading,
    setTextLoading,
    navigation
  } = props;

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera == "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galería.",
        1000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        toastRef.current.show("Has cerrado la galería de imágenes.", 1500);
      } else {
        uploadImage(result.uri, uid).then(() => {
          toastRef.current.show("La imagen se ha subido correctamente.", 1500);
          updatePhotoUrl(uid);
        });
      }
    }
  };

  const uploadImage = async (uri, nameImage) => {
    setTextLoading("Actualizando Avatar");
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase
      .storage()
      .ref()
      .child(`UsersAvatars/${nameImage}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = uid => {
    firebase
      .storage()
      .ref(`UsersAvatars/${uid}`)
      .getDownloadURL()
      .then(async result => {
        const update = {
          photoURL: result
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
        setIsLoading(false);
        navigation.state.params.setReloadData("true");
        navigation.goBack();
      })
      .catch(() => {
        toastRef.current.show(
          "Error al recuperar el avatar del servidor.",
          1500
        );
      });
  };

  const menuOptions = [
    {
      title: "Cambiar Nombre y apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#A3A3A3",
      iconNameRight: "chevron-right",
      iconColorRight: "#A3A3A3",
      onPress: () => selectedComponent("displayName")
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#A3A3A3",
      iconNameRight: "chevron-right",
      iconColorRight: "#A3A3A3",
      onPress: () => selectedComponent("email")
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#A3A3A3",
      iconNameRight: "chevron-right",
      iconColorRight: "#A3A3A3",
      onPress: () => selectedComponent("password")
    }
  ];

  const RefreshAndGoBack = () => {
    navigation.state.params.setReloadData("true"), navigation.goBack();
  };

  const selectedComponent = key => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
            navigation={navigation}
          />
        );
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
            navigation={navigation}
          />
        );
        setIsVisibleModal(true);
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm
            userInfo={userInfo}
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
            navigation={navigation}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
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
        <Card containerStyle={styles.cardUserData}>
          <Text style={styles.displayName}>
            {displayName ? displayName : "Usuario anónimo"}
          </Text>
          <Text style={styles.displayEmail}>{email ? email : "sin email"}</Text>
          <View>
            {menuOptions.map((menu, index) => (
              <ListItem
                key={index}
                title={menu.title}
                leftIcon={{
                  type: menu.iconType,
                  name: menu.iconNameLeft,
                  color: menu.iconColorLeft
                }}
                rightIcon={{
                  type: menu.iconType,
                  name: menu.iconNameRight,
                  color: menu.iconColorRight
                }}
                onPress={menu.onPress}
                containerStyle={styles.menuItem}
              />
            ))}
          </View>
          <Button
            title="Volver a mi cuenta"
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            onPress={RefreshAndGoBack}
          />
        </Card>
      </View>
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

export default withNavigation(InfoUser);

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    borderWidth: 5,
    borderColor: "#CDCDCD",
    borderStyle: "solid"
  },
  displayName: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  displayEmail: {
    textAlign: "center",
    fontSize: 14,
    paddingBottom: 10
  },
  viewUserName: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%"
  },
  cardUserData: {
    width: "95%",
    paddingBottom: 10
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    backgroundColor: "#EBEBEB",
    paddingBottom: 10
  },
  btnStyle: {
    backgroundColor: "#2BA418"
  },
  btnContainer: {
    width: "100%",
    paddingTop: 10
  }
});
