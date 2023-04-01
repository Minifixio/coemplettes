import React, {useContext, useEffect, useState} from 'react';
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
import {UserContext} from '../../utils/UserProvider';
import CurrentCartOrderPage from '../Cart/CurrentCartOrder';
import ShipperAccountStack from '../Shipper/ShipperAccount';
import CartFinishPage from '../Cart/CartFinish';
import CartFinishCameraPage from '../Cart/CartFinishCamera';
import CartCompletionPage from '../Cart/CartCompletion';
import AccountInformationsPage from './AccountInformations';

const users = require('../../assets/json/users.json').users;

const profilePicture = require('../../assets/icons/misc/profile_picture.png');

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
  const {logout, shipperInfos} = useContext(UserContext);
  const [isShipper, setIsShipper] = useState(false);

  /**
   * MOCKUP DATAS
   *
   * _user
   * _isShipper
   */

  const _user = users[0];
  const _isShipper = true;

  useEffect(() => {
    console.log('[ShipperAccount] Shipper infos : ', shipperInfos);
    if (shipperInfos.user_id) {
      console.log('[ShipperAccount] He is a shipper !');
      setIsShipper(true);
    } else {
      console.log('[ShipperAccount] He is not a shipper !');
      setIsShipper(false);
    }
  }, [shipperInfos, isShipper, setIsShipper]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f2f2f2']} style={styles.photoView}>
        <Image style={styles.profileImage} source={profilePicture} />
      </LinearGradient>

      <View style={styles.menuView}>
        <MenuItem
          text="Informations personnelles"
          icon="person-circle-outline"
          goTo={() => {
            navigation.push('AccountInformationsPage');
          }}
        />
        <MenuItem
          text="Mes commandes"
          icon="cart-outline"
          goTo={() => {
            navigation.push('CurrentCartOrderPage');
          }}
        />
        {/* <MenuItem text="Mes favorits" icon="heart-outline" goTo={() => {}} /> */}
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
            goTo={() => {
              navigation.push('ShipperAccountStack');
            }}
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
        name="AccountInformationsPage"
        options={{title: ''}}
        component={AccountInformationsPage}
      />
      <Stack.Screen
        name="CurrentCartOrderPage"
        options={{title: 'Ma commande'}}
        component={CurrentCartOrderPage}
      />
      <Stack.Screen
        name="ShipperAccountStack"
        options={{headerShown: false}}
        component={ShipperAccountStack}
      />
      <Stack.Screen
        name="CartFinishPage"
        options={{headerShown: false}}
        component={CartFinishPage}
      />
      <Stack.Screen
        name="CartFinishCameraPage"
        options={{headerShown: false}}
        component={CartFinishCameraPage}
      />
      <Stack.Screen
        name="CartCompletionPage"
        options={{title: "Résumé de l'achat"}}
        component={CartCompletionPage}
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
