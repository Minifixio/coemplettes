import * as React from 'react';
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
import CurrentCartOrder from './CurrentCartOrder';

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
        <MenuItem
          text="Mes disponibilités"
          icon="md-calendar-outline"
          goTo={() => {}}
        />
        <MenuItem
          text="Moyens de paiement"
          icon="wallet-outline"
          goTo={() => {}}
        />
        <MenuItem text="Déconnexion" icon="log-out-outline" goTo={() => {}} />
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
