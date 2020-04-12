import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Card, Image } from "react-native-elements";

export default function Information() {
  return (
    <View>
      <ScrollView>
        <View style={styles.viewLogo}>
          <Image
            source={require("../../assets/img/ecodeas-logo-login.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Card>
          <Text style={styles.txtHeadline} h4>
            ¿Qué es Ecodeas?
          </Text>
          <Text>
            Ecodeas pretende cubrir la necesidad de compartir información
            medioambiental útil entre los ciudadanos del mundo que están
            comprometidos con frenar el cambio climático.{"\n"} {"\n"}El
            objetivo final de la app es centralizar distintos tipos de
            información medioambiental en un mismo lugar. Reciclar materiales,
            eventos cerca de tu ubicación, puntos de reciclaje, etc. En
            definitiva es intentar crear una comunidad con la que cambiar
            nuestro entorno más cercano.
          </Text>
        </Card>
        <Card>
          <Text style={styles.txtHeadline} h4>
            Futuras actualizaciones
          </Text>
          <Text>
            - Sistema de puntos con los que premiaremos al usuario que publica o
            añade eventos / posts o que recicle su basura. Permitiéndoles
            canjear sus puntos por premios o donarlos para causas benéficas.
            {"\n"}
            {"\n"}- Crear perfiles de usuario empresariales para que estas
            participen en la comunidad.{"\n"}
            {"\n"}- Añadir un apartado de puntos de reciclaje cercanos al
            usuario.{"\n"}
            {"\n"}- Un apartado público dónde canjear los puntos por plantación
            de árboles.{"\n"}
            {"\n"}- Una sección de noticias / novedades de los medios digitales
            que hablen sobre el medioambiente y estudios científicos
            relacionados con el cambio climático.
          </Text>
          <Text style={styles.txtHeadline} h5>
            Pronto más novedades...
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  txtHeadline: {
    textAlign: "center",
    color: "#2BA418",
    marginBottom: 10,
  },
  logo: {
    width: "100%",
    height: 150,
  },
  viewLogo: {
    marginTop: 30,
    marginBottom: 20,
  },
});
