import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Switch,
  Pressable,
} from 'react-native';

function ShipperCharterPage() {
  const [acceptCharter, setAcceptCharter] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.text, styles.header]}>Charte du livreur</Text>

        <Text style={[styles.text, styles.subHeader]}>
          What is Lorem Ipsum?
        </Text>
        <Text style={[styles.text]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>

        <Text style={[styles.text, styles.subHeader]}>
          Where does it come from?
        </Text>
        <Text style={[styles.text]}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </Text>

        <Text style={[styles.text, styles.subHeader]}>Why do we use it?</Text>
        <Text style={[styles.text]}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </Text>

        <View style={styles.switchView}>
          <Switch
            trackColor={{false: 'red', true: 'green'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setAcceptCharter(!acceptCharter);
            }}
            value={acceptCharter}
          />
          <Text style={styles.switchText}>J'accepte les conditions</Text>
        </View>
      </ScrollView>

      <View style={styles.acceptButtonView}>
        {/* <Button
          title="Créer son profil livreur"
          disabled={!acceptCharter}
          color="green"
          style={styles.acceptButton}
          onPress={() => {}}
        /> */}
        <Pressable
          style={[
            !acceptCharter
              ? styles.acceptButtonValid
              : styles.acceptButtonDisabled,
            styles.acceptButton,
          ]}
          onPress={() => {}}>
          <Text style={styles.buttonText}>Créer son profil livreur</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  acceptButtonView: {
    marginBottom: 10,
  },
  acceptButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  acceptButtonValid: {
    backgroundColor: 'green',
  },
  acceptButtonDisabled: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
  },
  header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subHeader: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
  },
  switchView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'black',
    padding: 10,
  },
  switchText: {
    color: 'black',
    fontSize: 20,
  },
});

export default ShipperCharterPage;
