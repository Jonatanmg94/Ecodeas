import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useDebouncedCallback } from "use-debounce";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
    const { navigation } = props;
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        onSearch();
    }, [search]);

    const [onSearch] = useDebouncedCallback(() => {

        if (search) {
            var busqueda = search.toLowerCase();
            fireSQL
                .query(`SELECT * FROM events WHERE name LIKE '${busqueda}%'`)
                .then(response => {
                    setEvents(response);
                });
        }
    }, 300);

    return (
        <View>
            <SearchBar
                placeholder="Busca tu evento..."
                onChangeText={e => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
            />
            {events.length === 0 ? (
                <NoFoundEvents />
            ) : (
                    <FlatList
                        data={events}
                        renderItem={event => (
                            <Event event={event} navigation={navigation} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
        </View>
    );
}

function Event(props) {
    const { event, navigation } = props;
    const { name, images } = event.item;
    const [imageEvent, setImageEvent] = useState(null);

    useEffect(() => {
        const image = images[0];
        firebase
            .storage()
            .ref(`events-images/${image}`)
            .getDownloadURL()
            .then(response => {
                setImageEvent(response);
            });
    }, []);

    return (
        <ListItem
            title={name}
            leftAvatar={{ source: { uri: imageEvent } }}
            rightIcon={<Icon type="material-community" name="chevron-right" />}
            onPress={() =>
                navigation.navigate("Event", { event: event.item })
            }
        />
    );
}

function NoFoundEvents() {
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