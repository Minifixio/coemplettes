/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import LandingPage from './src/screens/Landing';
import MainPage from './src/screens/Menu';

const isConnected = false;

const App = () => {
  if (!isConnected) {
    return <LandingPage />;
  } else {
    return <MainPage />;
  }
};

export default App;
