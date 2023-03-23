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
import ShipperInformationPage from './ShipperInformations';
import DeliveryTracking from '../Delivery/DeliveryTracking';
import BasicButton from '../../components/BasicButton';
import {UserContext} from '../../utils/UserProvider';
import DeliveryProposals from '../Delivery/DeliveryProposals';
import DeliveryCartCompletion from '../Delivery/DeliveryCartCompletion';
import DeliveryProposalCarts from '../Delivery/DeliveryProposalCarts';

const shippers = require('../../assets/json/shippers.json').shippers;
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

function ShipperAccountPage({navigation}) {
  const {shipperInfos} = useContext(UserContext);
  const [isShipper, setIsShipper] = useState(false);

  /**
   * MOCKUP DATAS
   *
   * _shipper
   * _isShipper
   */

  const _isShipper = false;
  const _shipper = shippers[0];

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
            goTo={() => {
              navigation.push('ShipperInformationPage');
            }}
          />
          <MenuItem
            text="Livraisons"
            icon="cart-outline"
            goTo={() => {
              navigation.push('DeliveryTracking');
            }}
          />
          <MenuItem
            text="Propositions de livraison"
            icon="ios-basket-outline"
            goTo={() => {
              navigation.push('DeliveryProposals');
            }}
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
        options={{title: 'Profil livreur'}}
        component={ShipperAccountPage}
      />
      <Stack.Screen
        name="ShipperInformationPage"
        options={{title: 'Informations livreur'}}
        component={ShipperInformationPage}
      />
      <Stack.Screen
        name="DeliveryTracking"
        options={{title: 'Livraison en cours'}}
        component={DeliveryTracking}
      />
      <Stack.Screen
        name="DeliveryProposals"
        options={{title: 'Propositions de livraison'}}
        component={DeliveryProposals}
      />
      <Stack.Screen
        name="DeliveryCartCompletion"
        options={{title: 'Achat en cours'}}
        component={DeliveryCartCompletion}
      />
      <Stack.Screen
        name="DeliveryProposalCarts"
        options={{title: 'Aperçu de la commande'}}
        component={DeliveryProposalCarts}
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
