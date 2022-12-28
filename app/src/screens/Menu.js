import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from './Home';
import AccountPage from './Account';
import FavoutritesPage from './Favourites';

const Stack = createNativeStackNavigator();

function MainPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountPage"
          component={AccountPage}
          options={{title: 'Compte'}}
        />
        <Stack.Screen
          name="FavoutritesPage"
          component={FavoutritesPage}
          options={{title: 'Favorits'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainPage;
