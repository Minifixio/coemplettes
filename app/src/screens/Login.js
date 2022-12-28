import * as React from 'react';
import {View, Text, StyleSheet, TextInput, ImageBackground} from 'react-native';
import BackgroundImage from '../assets/images/StudentShopping3.jpeg';
import BasicButton from '../components/BasicButton';

const Separator = () => <View style={styles.separator} />;

function LoginPage({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <Text style={[styles.text, styles.helloText]}>Se connecter</Text>
            <Text style={styles.text}>Content de vous revoir !</Text>
          </View>

          <TextInput
            textAlign={'left'}
            style={styles.textInput}
            placeholder="Email."
            placeholderTextColor="#003f5c"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Mot de passe."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
          />
          <Separator />

          <BasicButton
            onClick={() => navigation.navigate('LandingPage')}
            text="Se connecter"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    position: 'relative',
    padding: 8,
    margin: 3,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  inputContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    display: 'flex',
    paddingBottom: 10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    textAlign: 'left',
  },
  textInputContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: 10,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
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

export default LoginPage;
