import React, { useState, useEffect, Component } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Input,
  Button,
  Card,
  Divider,
  Text,
  CheckBox
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import uuid from "uuid/v4";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function AddPostForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [postName, setPostName] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postVideoUrl, setPostVideoUrl] = useState("");
  const [postTypeWood, setPostTypeWood] = useState(false);
  const [postTypeMetal, setPostTypeMetal] = useState(false);
  const [postTypeTextile, setPostTypeTextile] = useState(false);
  const [postTypePaper, setPostTypePaper] = useState(false);
  const [postTypePlastic, setPostTypePlastic] = useState(false);
  const [postTypeGlass, setPostTypeGlass] = useState(false);
  const [postStatus, setPostStatus] = useState("approbed");

  const addPost = () => {
    if (!postName || !postDescription) {
      toastRef.current.show(
        "Nombre y descripción son campos obligatorios",
        3000
      );
    } else if (imagesSelected.length === 0) {
      toastRef.current.show("El evento tiene que tener almenos una foto", 3000);
    } else if (
      postTypeWood == false &&
      postTypeTextile == false &&
      postTypePlastic == false &&
      postTypePaper == false &&
      postTypeMetal == false &&
      postTypeGlass == false
    ) {
      toastRef.current.show(
        "Debes marcar como mínimo un material utilizado",
        3000
      );
    } else {
      setIsLoading(true);
      uploadImagesStorage(imagesSelected).then(arrayImages => {
        db.collection("posts")
          .add({
            name: postName.toLowerCase(),
            description: postDescription,
            postVideoUrl: postVideoUrl,
            postTypeWood: postTypeWood,
            postTypeTextile: postTypeTextile,
            postTypePaper: postTypePaper,
            postTypeMetal: postTypeMetal,
            postTypePlastic: postTypePlastic,
            postTypeGlass: postTypeGlass,
            status: postStatus,
            images: arrayImages,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createdBy: firebaseApp.auth().currentUser.uid
          })
          .then(() => {
            setIsLoading(false);
            navigation.navigate("Posts");
          })
          .catch(error => {
            setIsLoading(false);
            toastRef.current.show(
              "Error al subir el post, intentelo más tarde"
            );
          });
      });
    }
  };

  const uploadImagesStorage = async imageArray => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async image => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref("posts-images")
          .child(uuid());
        await ref.put(blob).then(result => {
          imagesBlob.push(result.metadata.name);
        });
      })
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <ImagePostFeatured imagePost={imagesSelected[0]} />
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <FormAdd
        setPostName={setPostName}
        setPostDescription={setPostDescription}
        setPostVideoUrl={setPostVideoUrl}
        setPostTypeWood={setPostTypeWood}
        postTypeWood={postTypeWood}
        setPostTypeMetal={setPostTypeMetal}
        postTypeMetal={postTypeMetal}
        setPostTypeTextile={setPostTypeTextile}
        postTypeTextile={postTypeTextile}
        setPostTypePaper={setPostTypePaper}
        postTypePaper={postTypePaper}
        setPostTypePlastic={setPostTypePlastic}
        postTypePlastic={postTypePlastic}
        setPostTypeGlass={setPostTypeGlass}
        postTypeGlass={postTypeGlass}
        setPostStatus={setPostStatus}
      />
      <Button
        title="Crear nuevo post"
        onPress={addPost}
        buttonStyle={styles.btnCreatePost}
      />
    </ScrollView>
  );
}

function FormAdd(props) {
  const {
    setPostName,
    setPostDescription,
    setPostVideoUrl,
    setPostTypeWood,
    postTypeWood,
    setPostTypeMetal,
    postTypeMetal,
    setPostTypeTextile,
    postTypeTextile,
    setPostTypePaper,
    postTypePaper,
    setPostTypePlastic,
    postTypePlastic,
    setPostTypeGlass,
    postTypeGlass,
    setPostStatus
  } = props;

  const changePostTypeWood = () => setPostTypeWood(!postTypeWood);

  return (
    <View style={styles.viewForm}>
      <Card>
        <View>
          <Text style={styles.txtHeadline} h4>
            Información
          </Text>
          <Input
            maxLength={70}
            placeholder="Nombre del post"
            containerStyle={styles.input}
            onChange={e => setPostName(e.nativeEvent.text)}
          />
          <Input
            maxLength={500}
            placeholder="Descripción"
            containerStyle={styles.textArea}
            multiline={true}
            onChange={e => setPostDescription(e.nativeEvent.text)}
          />
          <Input
            maxLength={10}
            placeholder="Url de video (Opcional)"
            containerStyle={styles.input}
            keyboardType="numeric"
            maxLength={1000000}
            onChange={e => setPostVideoUrl(e.nativeEvent.text)}
          />
        </View>
      </Card>
      <Card>
        <View style={styles.containerEventType}>
          <Text style={styles.txtHeadline} h4>
            Materiales utilizados
          </Text>
          <Grid>
            <Col>
              <CheckBox
                title="Maderas"
                value={postTypeWood}
                checked={postTypeWood}
                onPress={() => setPostTypeWood(!postTypeWood)}
              />
            </Col>
            <Col>
              <CheckBox
                title="Textiles"
                value={postTypeTextile}
                checked={postTypeTextile}
                onPress={() => setPostTypeTextile(!postTypeTextile)}
              />
            </Col>
          </Grid>
          <Grid>
            <Col>
              <CheckBox
                title="Plásticos"
                value={postTypePlastic}
                checked={postTypePlastic}
                onPress={() => setPostTypePlastic(!postTypePlastic)}
              />
            </Col>
            <Col>
              <CheckBox
                title="Papel"
                value={postTypePaper}
                checked={postTypePaper}
                onPress={() => setPostTypePaper(!postTypePaper)}
              />
            </Col>
          </Grid>
          <Grid>
            <Col>
              <CheckBox
                title="Metal"
                value={postTypeMetal}
                checked={postTypeMetal}
                onPress={() => setPostTypeMetal(!postTypeMetal)}
              />
            </Col>
            <Col>
              <CheckBox
                title="Vidrio"
                value={postTypeGlass}
                checked={postTypeGlass}
                onPress={() => setPostTypeGlass(!postTypeGlass)}
              />
            </Col>
          </Grid>
        </View>
      </Card>
    </View>
  );
}

function ImagePostFeatured(props) {
  const { imagePost } = props;

  return (
    <View style={styles.viewPhoto}>
      {imagePost ? (
        <Image
          source={{ uri: imagePost }}
          style={{ width: widthScreen, height: 200 }}
        />
      ) : (
          <Image
            source={require("../../../assets/img/Noimage.png")}
            style={{ width: widthScreen, height: 200 }}
          />
        )}
    </View>
  );
}
function UploadImage(props) {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const imagesSelect = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos. Si los denegaste, entra en ajustes y actívalo manualmente.",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galería sin seleccionar una imagen.",
          5000
        );
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = image => {
    const arrayImages = imagesSelected;

    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImagesSelected(
              arrayImages.filter(imageUrl => imageUrl !== image)
            )
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImage}>
      {imagesSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imagesSelect}
        />
      )}

      {imagesSelected.map(imagePost => (
        <Avatar
          key={imagePost}
          onPress={() => removeImage(imagePost)}
          style={styles.miniatureStyle}
          source={{ uri: imagePost }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 0
  },
  viewBtn: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 15
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    height: 70,
    width: 70,
    backgroundColor: "#d0d0d0"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
    marginBottom: 10
  },
  viewForm: {
    marginLeft: 5,
    marginRight: 5
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  },
  txtHeadline: {
    textAlign: "center",
    color: "#2BA418"
  },
  btnCreatePost: {
    backgroundColor: "#2BA418",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15
  },
  btnDate: {
    backgroundColor: "#b2b2b2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e7e7e7",
    marginBottom: 10
  }
});
