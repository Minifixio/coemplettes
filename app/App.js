import React from 'react';
import Router from './src/Router';
import {UserProvider} from './src/utils/UserProvider';

const App = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};

export default App;
