import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddPostForm from "../../components/Posts/AddPostForm";

export default function AddPost(props) {
  const { navigation } = props;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddPostForm
        navigation={navigation}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Creando Post" />
    </View>
  );
}
