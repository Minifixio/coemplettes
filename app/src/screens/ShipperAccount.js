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
import ShipperInformationPage from './ShipperInformations';
import DeliveryTracking from './DeliveryTracking';
import BasicButton from '../components/BasicButton';

const shippers = require('../assets/json/shippers.json').shippers;
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

function ShipperAccountPage({navigation}) {
  /**
   * MOCKUP DATAS
   *
   * shipper
   * isShipper
   */

  const isShipper = false;
  const shipper = shippers[0];

  if (isShipper) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#ffffff', '#f2f2f2']}
          style={styles.photoView}>
          <Image style={styles.profileImage} source={profilePicture} />
        </LinearGradient>

        <View style={styles.menuView}>
          <MenuItem
            text="Informations livreur"
            icon="person-circle-outline"
            goTo={() => {}}
          />
          <MenuItem
            text="Mes livraisons"
            icon="cart-outline"
            goTo={() => {
              navigation.push('DeliveryTracking');
            }}
          />
          <MenuItem
            text="Mes disponibilités"
            icon="log-out-outline"
            goTo={() => {}}
          />
          <MenuItem
            text="Propositions de livraison"
            icon="ios-basket-outline"
            goTo={() => {}}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notShipperView}>
          <Text style={styles.noShippperMainText}>
            Vous n'êtes pas livreur... mais vous pouvez le devenir !
          </Text>
          <Text style={styles.noShippperSubText}>
            Allez chercher les courses d'autres étudiants et touchez une petite
            rémunération en conséquence
          </Text>
          <BasicButton
            style={styles.button}
            onClick={() => {
              navigation.push('ShipperInformationPage');
            }}
            text="Devenir livreur"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const Stack = createNativeStackNavigator();
function ShipperAccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShipperAccountPage"
        options={{headerShown: false}}
        component={ShipperAccountPage}
      />
      <Stack.Screen
        name="ShipperInformationPage"
        options={{headerShown: false}}
        component={ShipperInformationPage}
      />
      <Stack.Screen
        name="DeliveryTracking"
        options={{headerShown: false}}
        component={DeliveryTracking}
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
  notShipperView: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  noShippperMainText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  noShippperSubText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ShipperAccountStack;
