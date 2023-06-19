import React, {createContext, useContext, useState} from 'react';
import {UserContext} from './utils/UserProvider';
import {NavigationContainer} from '@react-navigation/native';
import LandingPage from './screens/Landing/Landing';
import MainPage from './screens/Main/Menu';
import Loading from './screens/Loading';

const Router = () => {
  const {isLoggedIn, isLoading} = useContext(UserContext);

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
