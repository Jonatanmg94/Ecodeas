import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AirbnbRating, Button, Input, Card } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function AddReviewPost(props) {
    const { navigation } = props;
    const { idPost, setReviewsReload } = navigation.state.params;
    const [rating, setRating] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();

    const addReview = () => {
        if (rating == null) {
            toastRef.current.show("No has dado ninguna puntuación");
        } else if (!title) {
            toastRef.current.show("El titulo es obligatorio");
        } else if (!review) {
            toastRef.current.show("El comentario es obligatorio");
        } else {
            setIsLoading(true);
            const user = firebase.auth().currentUser;
            console.log(user);
            const payLoad = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idPost: idPost,
                title: title,
                review: review,
                rating: rating,
                createAt: new Date()
            };
            db.collection("posts-reviews")
                .add(payLoad)
                .then(() => {
                    updatePost();
                })
                .catch(() => {
                    toastRef.current.show(
                        "Error al enviar la review, intentelo más tarde"
                    );
                    setIsLoading(false);
                });
        }
    };

    const updatePost = () => {
        const postRef = db.collection("posts").doc(idPost);
        postRef.get().then(response => {
            const postData = response.data();
            const ratingTotal = postData.ratingTotal + rating;
            const quantityVoting = postData.quantityVoting + 1;
            const ratingResult = ratingTotal / quantityVoting;

            postRef
                .update({ rating: ratingResult, ratingTotal, quantityVoting })
                .then(() => {
                    setReviewsReload(true);
                    setIsLoading(false);
                    navigation.goBack();
                });
        });
    };

    return (
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Pésimo", "Deficiente", "Normal", "Muy bueno", "Excelente"]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={value => setRating(value)}
                />
            </View>
            <View style={styles.formReview}>
                <View style={styles.formCard}>
                    <Input
                        placeholder="Título"
                        inputContainerStyle={styles.textTitle}
                        onChange={e => setTitle(e.nativeEvent.text)}
                    />
                    <Input
                        placeholder="Comentario..."
                        multiline={true}
                        inputContainerStyle={styles.textArea}
                        onChange={e => setReview(e.nativeEvent.text)}
                    />
                </View>

                <Button
                    title="Publicar valoración"
                    onPress={addReview}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.5} />
            <Loading isVisible={isLoading} text="Enviando valoración" />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    viewRating: {
        height: 110,
        backgroundColor: "#f2f2f2"
    },
    formReview: {
        margin: 10,
        marginTop: 20,
        flex: 1,
        alignItems: "center"
    },
    input: {
        marginBottom: 5
    },
    textArea: {
        height: 200,
        width: "100%",
        padding: 10,
        margin: 0
    },
    textTitle: {
        height: 60,
        width: "100%",
        padding: 10,
        margin: 0
    },
    btnContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btn: {
        backgroundColor: "#2BA418"
    },
    formCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        paddingBottom: 20
    }
});
