import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomePage from './Home';
import AccountPage from './Account';
import FavoutritesPage from './Favourites';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainPage({isConnected, setIsConnected}) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'HomePage') {
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
        <Tab.Screen name="HomePage" options={{headerShown: false}}>
          {props => (
            <HomePage
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
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="HomePage">
    //     <Stack.Screen name="HomePage" options={{headerShown: false}}>
    //       {props => (
    //         <HomePage
    //           isConnected={isConnected}
    //           setIsConnected={setIsConnected}
    //           {...props}
    //         />
    //       )}
    //     </Stack.Screen>
    //     <Stack.Screen
    //       name="AccountPage"
    //       component={AccountPage}
    //       options={{title: 'Compte'}}
    //     />
    //     <Stack.Screen
    //       name="FavoutritesPage"
    //       component={FavoutritesPage}
    //       options={{title: 'Favorits'}}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default MainPage;
