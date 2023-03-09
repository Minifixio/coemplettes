import React, {createContext, useState} from 'react';
import LandingPage from './src/screens/Landing';
import MainPage from './src/screens/Menu';
export const LoginContext = createContext();

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
