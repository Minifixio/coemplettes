import * as React from 'react';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import BackgroundImage from '../assets/images/StudentShopping3.jpeg';
import Logo from '../assets/images/Logo.png';
import BasicButton from '../components/BasicButton';

const Separator = () => <View style={styles.separator} />;

export default function LandingPage({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={Logo} />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.textButtonsContainer}>
            <Text style={[styles.text, styles.helloText]}>Bonjour</Text>
            <Text style={styles.text}>Bienvenue sur CoEmplettes</Text>
          </View>

          <BasicButton
            navigation={navigation}
            screenName="RegisterPage"
            text="S'enregistrer"
          />

          <BasicButton
            navigation={navigation}
            screenName="LoginPage"
            text="Se connecter"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  logoContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    top: '30%',
  },
  buttonsContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    display: 'flex',
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
  },
  textButtonsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: 40,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
  },
  helloText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
