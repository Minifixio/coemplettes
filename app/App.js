import React, {createContext, useContext, useState} from 'react';
import LandingPage from './src/screens/Landing';
import MainPage from './src/screens/Menu';
import {AuthProvider, AuthContext} from './src/utils/AuthProvider';
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
  // const {isLoggedIn} = useContext(AuthContext);
  // return (
  //   <AuthProvider>
  //     {isLoggedIn ? <MainPage> : <LandingPage/>}
  //   </AuthProvider>
  // );
};

export default App;
