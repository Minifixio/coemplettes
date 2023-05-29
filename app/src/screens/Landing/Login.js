import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Button,
} from 'react-native';
import BackgroundImage from '../../assets/images/StudentShopping3.jpeg';
import BasicButton from '../../components/BasicButton';
import Toast from 'react-native-toast-message';
import {UserContext} from '../../utils/UserProvider';

const Separator = () => <View style={styles.separator} />;

function LoginPage({navigation, setIsConnected}) {
  const {login} = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async () => {
    try {
      await login(email, password);
      Toast.show({
        type: 'success',
        text1: 'Connexion effectué !',
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: e.error_message
          ? 'Erreur : ' + e.error_message
          : 'Erreur lors de la connexion',
      });
    }
  };

  const fillLogin = () => {
    setEmail('user0@telecom-paris.fr');
    setPassword('password');
  };

  return (
    <View style={styles.container}>
      <View style={styles.demoButtonContainer}>
        <Button
          title="démo"
          style={styles.demoButton}
          color="lightgrey"
          onPress={() => fillLogin()}
        />
      </View>
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
              userLogin();
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
  demoButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
  },
});

export default LoginPage;
