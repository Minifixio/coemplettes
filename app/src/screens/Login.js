import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ImageBackground} from 'react-native';
import {userLogin} from '../services/UserService';
import BackgroundImage from '../assets/images/StudentShopping3.jpeg';
import BasicButton from '../components/BasicButton';
import Toast from 'react-native-toast-message';
import {AuthService} from '../services/AuthService';

const Separator = () => <View style={styles.separator} />;

function LoginPage({navigation, setIsConnected}) {
  const [email, setEmail] = useState('lolo@telecom-paris.fr');
  const [password, setPassword] = useState('haha');

  const login = async () => {
    try {
      await AuthService.login(email, password);
      console.log('[Login] Connexion avec succès! \n');
      Toast.show({
        type: 'success',
        text1: 'Connexion effectué !',
      });
    } catch (e) {
      console.log('[Login] Erreur : \n', e);

      Toast.show({
        type: 'error',
        text1: e.error_message
          ? 'Erreur : ' + e.error_message
          : 'Erreur lors de la connexion',
      });
    }
  };

  const _login = async () => {
    try {
      const loginValid = await userLogin(email, password, true);
      if (loginValid) {
        setIsConnected(true);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Le mot de passe ou email est incorrect',
        });
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Le mot de passe ou email est incorrect',
      });
    }
  };

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
            placeholderTextColor="black"
            onChangeText={val => setEmail(val)}
            defaultValue={email}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Mot de passe."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={val => setPassword(val)}
            defaultValue={password}
          />
          <Separator />

          <BasicButton
            onClick={() => {
              login();
            }}
            text="Se connecter"
          />
        </View>
      </ImageBackground>
      <Toast />
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
    width: '100%',
    color: 'black',
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
