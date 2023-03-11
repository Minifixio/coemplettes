import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../utils/AuthProvider';
import CurrentCartOrder from './CurrentCartOrder';
import ShipperAccountStack from './ShipperAccount';

const users = require('../assets/json/users.json').users;

const profilePicture = require('../assets/icons/misc/profile_picture.png');

function MenuItem({text, icon, goTo}) {
  return (
    <Pressable style={styles.menuItemPressable} onPress={goTo}>
      <View style={styles.menuItemView}>
        <Ionicons name={icon} size={30} color="green" />
        <Text style={styles.menuItemText}>{text}</Text>
        <Ionicons
          style={styles.chevronIcon}
          name="md-chevron-forward"
          size={30}
          color="grey"
        />
      </View>
    </Pressable>
  );
}

function AccountPage({navigation}) {
  const {logout} = useContext(AuthContext);

  /**
   * MOCKUP DATAS
   *
   * user
   * isShipper
   */

  const user = users[0];
  const isShipper = true;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f2f2f2']} style={styles.photoView}>
        <Image style={styles.profileImage} source={profilePicture} />
      </LinearGradient>

      <View style={styles.menuView}>
        <MenuItem
          text="Informations personnelles"
          icon="person-circle-outline"
          goTo={() => {}}
        />
        <MenuItem
          text="Mes commandes"
          icon="cart-outline"
          goTo={() => {
            navigation.push('CurrentCartOrderPage');
          }}
        />
        <MenuItem text="Mes favorits" icon="heart-outline" goTo={() => {}} />
        {isShipper && (
          <MenuItem
            text="Profil livreur"
            icon="ios-people-outline"
            goTo={() => {
              navigation.push('ShipperAccountStack');
            }}
          />
        )}
        {!isShipper && (
          <MenuItem
            text="Devenir livreur"
            icon="ios-car-outline"
            goTo={() => {}}
          />
        )}
        <MenuItem
          text="Moyens de paiement"
          icon="wallet-outline"
          goTo={() => {}}
        />
        <MenuItem
          text="Déconnexion"
          icon="log-out-outline"
          goTo={() => {
            logout();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountPage"
        options={{headerShown: false}}
        component={AccountPage}
      />
      <Stack.Screen
        name="CurrentCartOrderPage"
        options={{title: 'Ma commande'}}
        component={CurrentCartOrder}
      />
      <Stack.Screen
        name="ShipperAccountStack"
        options={{title: 'Profil livreur'}}
        component={ShipperAccountStack}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItemPressable: {
    display: 'flex',
  },
  photoView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  menuItemView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderBottomStartRadius: 20,
    borderTopLeftRadius: 20,
  },
  menuItemText: {
    color: 'black',
    fontSize: 20,
    marginLeft: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'grey',
  },
  chevronIcon: {
    position: 'absolute',
    right: 0,
  },
});

export default AccountStack;
