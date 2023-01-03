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

function MenuItem({name, icon, goTo}) {
  return (
    <Pressable>
      <View>
        <Ionicons name={icon} size={30} color="black" />
        <Text>{name}</Text>
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
      <View style={styles.menuView} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: 30,
    height: 30,
  },
});

export default AccountPage;
