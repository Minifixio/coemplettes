import * as React from 'react';
import {
  View,
  Button,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from 'react-native';
import BackgroundImage from '../assets/images/StudentShopping1.png';

const Separator = () => <View style={styles.separator} />;

export default function LandingPage({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.buttonsContainer}>
          <Text style={styles.text}>Bienvenue sur CoEmplettes</Text>

          <Separator />

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.buttonText}>S'enregistrer</Text>
          </Pressable>

          <Separator />

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'green',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
