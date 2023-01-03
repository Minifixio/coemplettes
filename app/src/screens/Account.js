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

const profilePicture = require('../assets/icons/misc/profile_picture.png');

function MenuItem({text, icon, goTo}) {
  return (
    <Pressable>
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

function AccountPage() {
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
        <MenuItem text="Mes commandes" icon="cart-outline" goTo={() => {}} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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

export default AccountPage;
