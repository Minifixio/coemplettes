import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CartProvider} from '../utils/CartProvider';

import HomeStack from './Home';
import AccountPage from './Account';
import FavoutritesPage from './Favourites';
import CartPage from './Cart';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainPage({isConnected, setIsConnected}) {
  return (
    <CartProvider>
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
              } else if (route.name === 'CartPage') {
                iconName = focused ? 'basket' : 'basket-outline';
                size = 35;
                color = 'white';
              }

              if (route.name === 'CartPage') {
                return (
                  <View style={styles.cartTabItem}>
                    <Ionicons name={iconName} size={size} color={color} />
                  </View>
                );
              } else {
                return <Ionicons name={iconName} size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'grey',
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
          <Tab.Screen
            name="CartPage"
            component={CartPage}
            options={{title: ''}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  cartTabItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 50,
    width: 70,
    height: 70,
    marginBottom: 20,
    marginRight: 10,
  },
});

export default MainPage;
