/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from './src/screens/LandingPage';
import RegisterPage from './src/screens/RegisterPage';
import LoginPage from './src/screens/LoginPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{title: 'Bienvenue'}}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{title: "S'enregsitrer"}}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{title: 'Se connecter'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
