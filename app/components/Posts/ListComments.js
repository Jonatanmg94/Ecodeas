import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Avatar, Rating, Card } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ListComments(props) {
    const { navigation, idPost, setRating } = props;
    const [reviews, setReviews] = useState([]);
    const [reviewsReload, setReviewsReload] = useState(false);
    const [userLogged, setUserLogged] = useState(false);

    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false);
    });

    useEffect(() => {
        (async () => {
            const resultReviews = [];
            const arrayRating = [];

            db.collection("posts-reviews")
                .where("idPost", "==", idPost)
                .get()
                .then(response => {
                    response.forEach(doc => {
                        const review = doc.data();
                        resultReviews.push(doc.data());
                        arrayRating.push(doc.data().rating);
                    });

                    let numSum = 0;
                    arrayRating.map(value => {
                        numSum = numSum + value;
                    });
                    const countRating = arrayRating.length;
                    const resultRating = numSum / countRating;
                    const resulRatingFinish = resultRating ? resultRating : 0;

                    setReviews(resultReviews);
                    setRating(resulRatingFinish);
                });

            setReviewsReload(false);
        })();
    }, [reviewsReload]);

    return (
        <View>
            {userLogged ? (
                <Button
                    buttonStyle={styles.btnAddReview}
                    titleStyle={styles.btnTitleAddReview}
                    title="Escribir una opinión"
                    icon={{
                        type: "material-community",
                        name: "square-edit-outline",
                        color: "#00a680"
                    }}
                    onPress={() =>
                        navigation.navigate("AddReviewPost", {
                            idPost: idPost,
                            setReviewsReload: setReviewsReload
                        })
                    }
                />
            ) : (
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{ textAlign: "center", color: "#2BA418", padding: 10 }}
                            onPress={() => navigation.navigate("Login")}
                        >
                            Para escribir un comentario es necesario estar logeado
          </Text>
                        <Text
                            style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "#2BA418",
                                paddingBottom: 10
                            }}
                            onPress={() => navigation.navigate("Login")}
                        >
                            pulsa AQUI para iniciar sesión
          </Text>
                    </View>
                )}

            <FlatList
                data={reviews}
                renderItem={review => <Review review={review} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

function Review(props) {
    const { title, review, rating, createAt, avatarUser } = props.review.item;
    const createDateReview = new Date(createAt.seconds * 1000);
    console.log(createDateReview);
    return (
        <View style={styles.viewReview}>
            <View style={styles.viewImageAvatar}>
                <Avatar
                    size={"large"}
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={{
                        uri: avatarUser
                            ? avatarUser
                            : "https://firebasestorage.googleapis.com/v0/b/ecodeas-5142d.appspot.com/o/UsersAvatars%2FDefaultAvatar%2Favatar.png?alt=media&token=5dbc8a9b-6ffe-4856-935e-03b774c383cf"
                    }}
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Rating imageSize={15} startingValue={rating} readonly />
                <Text style={styles.reviewDate}>
                    {createDateReview.getDate()}/{createDateReview.getMonth() + 1}/
          {createDateReview.getFullYear()} - {createDateReview.getHours()}:
          {createDateReview.getMinutes() < 10 ? "0" : ""}
                    {createDateReview.getMinutes()}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent",
        paddingTop: 15,
        paddingBottom: 15
    },
    btnTitleAddReview: {
        color: "#00a680"
    },
    viewReview: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    viewImageAvatar: {
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10
    },
    reviewTitle: {
        fontWeight: "bold"
    },
    reviewText: {
        paddingTop: 2,
        color: "grey",
        marginBottom: 5
    },
    reviewDate: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 10,
        bottom: 10
    }
});
