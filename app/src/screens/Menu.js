import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStack from './Home';
import AccountPage from './Account';
import FavoutritesPage from './Favourites';
import CategoryPage from './Category';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainPage({isConnected, setIsConnected}) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'md-home' : 'md-home-outline';
            } else if (route.name === 'AccountPage') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            } else if (route.name === 'FavoutritesPage') {
              iconName = focused ? 'star' : 'star-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" options={{headerShown: false}}>
          {props => (
            <HomeStack
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              {...props}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AccountPage"
          component={AccountPage}
          options={{title: 'Compte'}}
        />
        <Tab.Screen
          name="FavoutritesPage"
          component={FavoutritesPage}
          options={{title: 'Favorits'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainPage;
