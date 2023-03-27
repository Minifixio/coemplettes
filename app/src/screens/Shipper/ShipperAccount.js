import React, {useContext, useEffect, useState, useCallback} from 'react';
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
import DeliveryProposalsPage from '../Delivery/DeliveryProposals';
import DeliveryCartCompletion from '../Delivery/DeliveryCartCompletion';
import DeliveryProposalCarts from '../Delivery/DeliveryProposalCarts';
import DeliveryHistoryCarts from '../Delivery/DeliveryHistoryCarts';
import DeliveryHistoryPage from '../Delivery/DeliveryHistory';
import ShipperCharterPage from './ShipperCharter';
import DeliveryCartPricesPage from '../Delivery/DeliveryCartPrices';

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
  const {getShipperInfos} = useContext(UserContext);
  const [isShipper, setIsShipper] = useState(false);
  const [shipperInfos, setShipperInfos] = useState(false);

  /**
   * MOCKUP DATAS
   *
   * _shipper
   * _isShipper
   */

  const _isShipper = false;
  const _shipper = shippers[0];

  const fetchData = useCallback(async () => {
    await getShipperInfos().then(shipper => {
      setShipperInfos(shipper);
      console.log('[ShipperAccount] Shipper infos : ', shipper);
      if (shipper.user_id) {
        console.log('[ShipperAccount] He is a shipper !');
        setIsShipper(true);
      } else {
        console.log('[ShipperAccount] He is not a shipper !');
        setIsShipper(false);
      }
    });
    //await updateShipperProfile(shipper);
  }, [getShipperInfos]);

  useEffect(() => {
    fetchData().catch(e => console.log(e));
  }, [fetchData]);

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
            text="Historique des livraisons"
            icon="md-albums-outline"
            goTo={() => {
              navigation.push('DeliveryHistoryPage');
            }}
          />
          <MenuItem
            text="Livraison en cours"
            icon="cart-outline"
            goTo={() => {
              navigation.push('DeliveryTracking');
            }}
          />
          <MenuItem
            text="Propositions de livraison"
            icon="ios-basket-outline"
            goTo={() => {
              navigation.push('DeliveryProposalsPage');
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
              navigation.push('ShipperCharterPage');
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
        options={{title: 'Profil livreur', headerShown: false}}
        component={ShipperAccountPage}
      />
      <Stack.Screen
        name="ShipperCharterPage"
        options={{title: 'Charte de livreur'}}
        component={ShipperCharterPage}
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
        name="DeliveryProposalsPage"
        options={{title: 'Propositions de livraison'}}
        component={DeliveryProposalsPage}
      />
      <Stack.Screen
        name="DeliveryCartCompletion"
        options={{title: 'Achat en cours'}}
        component={DeliveryCartCompletion}
      />
      <Stack.Screen
        name="DeliveryCartPricesPage"
        options={{title: 'Remplir les prix'}}
        component={DeliveryCartPricesPage}
      />
      <Stack.Screen
        name="DeliveryHistoryPage"
        options={{title: 'Historique des livraisons'}}
        component={DeliveryHistoryPage}
      />
      <Stack.Screen
        name="DeliveryProposalCarts"
        options={{title: 'Aperçu de la commande'}}
        component={DeliveryProposalCarts}
      />
      <Stack.Screen
        name="DeliveryHistoryCarts"
        options={{title: 'Aperçu de la commande'}}
        component={DeliveryHistoryCarts}
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
