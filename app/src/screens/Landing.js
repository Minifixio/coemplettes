import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RegisterPage from './RegisterPage';
import LoginPage from './Login';

import BackgroundImage from '../assets/images/StudentShopping3.jpeg';
import Logo from '../assets/images/Logo.png';
import BasicButton from '../components/BasicButton';

const WelcomePage = ({navigation, isConnected, setIsConnected}) => {
  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        thumbColor={isConnected ? 'green' : 'red'}
        onValueChange={() => setIsConnected(true)}
        value={isConnected}
      />
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
            onClick={() => navigation.navigate('RegisterPage')}
            text="S'enregistrer"
          />

          <BasicButton
            onClick={() => navigation.navigate('LoginPage')}
            text="Se connecter"
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const Stack = createNativeStackNavigator();

function LandingPage({isConnected, setIsConnected}) {
  return (
    <Stack.Navigator initialRouteName="WelcomePage">
      <Stack.Screen
        name="WelcomePage"
        options={{title: 'Bienvenue', headerShown: false}}>
        {props => (
          <WelcomePage
            isConnected={isConnected}
            setIsConnected={setIsConnected}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{title: "S'enregistrer"}}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        setIsConnected={setIsConnected}
        options={{title: 'Se connecter'}}
      />
    </Stack.Navigator>
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
  switch: {
    position: 'absolute',
    top: 10,
    zIndex: 1,
  },
});

export default LandingPage;
