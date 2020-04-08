import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useDebouncedCallback } from "use-debounce";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function SearchPosts(props) {
    const { navigation } = props;
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        onSearch();
    }, [search]);

    const [onSearch] = useDebouncedCallback(() => {
        var busqueda = search.toLowerCase();
        if (search) {
            fireSQL
                .query(`SELECT * FROM posts WHERE name LIKE '${busqueda}%'`)
                .then(response => {
                    setPosts(response);
                });
        }
    }, 300);

    return (
        <View>
            <SearchBar
                placeholder="Busca tu post..."
                onChangeText={e => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
            />
            {posts.length === 0 ? (
                <NoFoundPosts />
            ) : (
                    <FlatList
                        data={posts}
                        renderItem={post => (
                            <Post post={post} navigation={navigation} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
        </View>
    );
}

function Post(props) {
    const { post, navigation } = props;
    const { name, images } = post.item;
    const [imagePost, setImagePost] = useState(null);

    useEffect(() => {
        const image = images[0];
        firebase
            .storage()
            .ref(`posts-images/${image}`)
            .getDownloadURL()
            .then(response => {
                setImagePost(response);
            });
    }, []);

    return (
        <ListItem
            title={name}
            leftAvatar={{ source: { uri: imagePost } }}
            rightIcon={<Icon type="material-community" name="chevron-right" />}
            onPress={() =>
                navigation.navigate("Post", { post: post.item })
            }
        />
    );
}

function NoFoundPosts() {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Image
                source={require("../../assets/img/no-result-found.png")}
                resizeMode="cover"
                style={styles.imageNotFound}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 0
    },
    imageNotFound: {
        width: 200,
        height: 200,
        margin: 20,
        tintColor: "#969696"
    }
});