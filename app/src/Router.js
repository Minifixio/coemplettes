import React, {createContext, useContext, useState} from 'react';
import {AuthContext} from './utils/AuthProvider';
import {NavigationContainer} from '@react-navigation/native';
import LandingPage from './screens/Landing';
import MainPage from './screens/Menu';
import Loading from './screens/Loading';

const Router = () => {
  const {isLoggedIn, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainPage /> : <LandingPage />}
    </NavigationContainer>
  );
};

export default Router;
