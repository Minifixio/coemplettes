import React, {createContext, useContext, useState} from 'react';
import {AuthContext} from './utils/AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import LandingPage from './screens/Landing';
import MainPage from './screens/Menu';

const Router = () => {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainPage /> : <LandingPage />}
    </NavigationContainer>
  );
};

export default Router;
