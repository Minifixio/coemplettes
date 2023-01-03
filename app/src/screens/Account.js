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

const profilePicture = require('../assets/icons/misc/profile_picture.png');

function MenuItem({text, icon, goTo}) {
  return (
    <Pressable>
      <View style={styles.menuItemView}>
        <Ionicons name={icon} size={30} color="black" />
        <Text style={styles.menuItemText}>{text}</Text>
      </View>
    </Pressable>
  );
}

function AccountPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.photoView}>
        <Image style={styles.profileImage} source={profilePicture} />
      </View>

      <View style={styles.menuView}>
        <MenuItem text="Informations personnelles" icon="person-circle-sharp" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItemView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
});

export default AccountPage;
