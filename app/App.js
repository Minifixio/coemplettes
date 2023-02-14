/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import LandingPage from './src/screens/Landing';
import MainPage from './src/screens/Menu';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  if (!isConnected) {
    return (
      <LandingPage isConnected={isConnected} setIsConnected={setIsConnected} />
    );
  } else {
    return (
      <MainPage isConnected={isConnected} setIsConnected={setIsConnected} />
    );
  }
};

export default App;
