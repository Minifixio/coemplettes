import React from 'react';
import Router from './src/Router';
import {AuthProvider} from './src/utils/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
