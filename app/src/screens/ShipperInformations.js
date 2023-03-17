/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Switch} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import InputSpinner from 'react-native-input-spinner';
import BasicButton from '../components/BasicButton';
import {AuthService} from '../services/AuthService';
import {UserService} from '../services/UserService';
import Toast from 'react-native-toast-message';

function ShipperInformationPage({navigation}) {
  const [priceMax, setPriceMax] = useState(50);
  const [capacity, setCapacity] = useState(2);
  const [disponibilities, setDisponibilities] = useState([0, 0, 0, 0, 0, 0, 0]);

  // Indiquent si le shipper peut aller au Drive / en magasin
  const [drive, setDrive] = useState(false);
  const [shop, setShop] = useState(false);

  const [hasCar, setHasCar] = useState(false);

  const createProfile = async () => {
    try {
      const shipperInfos = {
        capacity,
        price_max: priceMax,
        drive,
        has_car: hasCar,
        shop,
        disponibilities: disponibilities.join(''),
      };
      await UserService.createShipperProfile(shipperInfos);
      Toast.show({
        type: 'success',
        text1: 'Tu es désormais livreur !',
      });
      navigation.navigate('ShipperAccountPage');
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Erreur lors de la création du profil livreur',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainTextView}>
        <Text style={styles.mainText}>Profil livreur</Text>
      </View>
      <View style={styles.priceMaxView}>
        <Text style={styles.priceMaxText}>Prix maximum d'une commande</Text>
        <InputSpinner
          skin="square"
          colorLeft="#539903"
          colorRight="#539903"
          height={40}
          max={100}
          min={0}
          step={1}
          colorMax={'#f04048'}
          colorMin={'#40c5f4'}
          value={priceMax}
          onChange={num => {
            setPriceMax(num);
          }}
        />
      </View>
      <View style={styles.capacityView}>
        <Text style={styles.capacityText}>Capacité maximale (en sacs)</Text>
        <InputSpinner
          skin="square"
          colorLeft="#539903"
          colorRight="#539903"
          height={40}
          max={100}
          min={0}
          step={1}
          colorMax={'#f04048'}
          colorMin={'#40c5f4'}
          value={capacity}
          onChange={num => {
            setCapacity(num);
          }}
        />
      </View>
      <View style={styles.switchesView}>
        <View style={styles.switchCaseView}>
          <Text style={styles.switchText}>Voiture ?</Text>
          <Switch
            trackColor={{false: 'red', true: 'green'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setHasCar(!hasCar);
            }}
            value={hasCar}
          />
        </View>
        <View style={styles.switchCaseView}>
          <Text style={styles.switchText}>Achat drive ?</Text>
          <Switch
            trackColor={{false: 'red', true: 'green'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setDrive(!drive);
            }}
            value={drive}
          />
        </View>
        <View style={styles.switchCaseView}>
          <Text style={styles.switchText}>Achat magasin ?</Text>
          <Switch
            trackColor={{false: 'red', true: 'green'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setShop(!shop);
            }}
            value={shop}
          />
        </View>
      </View>
      <View style={styles.disponibilitiesView}>
        <Text style={styles.disponibilitiesText}>Disponibilités </Text>
        <View style={styles.checkboxesView}>
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              textDecorationLine: 'none',
            }}
            size={25}
            fillColor="green"
            unfillColor="#FFFFFF"
            text="Lundi"
            iconStyle={{borderColor: 'green'}}
            innerIconStyle={{borderWidth: 2}}
            onPress={isChecked => {
              const d = disponibilities;
              d[0] = isChecked ? 1 : 0;
              setDisponibilities(d);
            }}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              textDecorationLine: 'none',
            }}
            size={25}
            fillColor="green"
            unfillColor="#FFFFFF"
            text="Mardi"
            iconStyle={{borderColor: 'green'}}
            innerIconStyle={{borderWidth: 2}}
            onPress={isChecked => {
              const d = disponibilities;
              d[1] = isChecked ? 1 : 0;
              setDisponibilities(d);
            }}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              textDecorationLine: 'none',
            }}
            size={25}
            fillColor="green"
            unfillColor="#FFFFFF"
            text="Mercredi"
            iconStyle={{borderColor: 'green'}}
            innerIconStyle={{borderWidth: 2}}
            onPress={isChecked => {
              const d = disponibilities;
              d[2] = isChecked ? 1 : 0;
              setDisponibilities(d);
            }}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              textDecorationLine: 'none',
            }}
            size={25}
            fillColor="green"
            unfillColor="#FFFFFF"
            text="Jeudi"
            iconStyle={{borderColor: 'green'}}
            innerIconStyle={{borderWidth: 2}}
            onPress={isChecked => {
              const d = disponibilities;
              d[3] = isChecked ? 1 : 0;
              setDisponibilities(d);
            }}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              textDecorationLine: 'none',
            }}
            size={25}
            fillColor="green"
            unfillColor="#FFFFFF"
            text="Vendredi"
            iconStyle={{borderColor: 'green'}}
            innerIconStyle={{borderWidth: 2}}
            onPress={isChecked => {
              const d = disponibilities;
              d[4] = isChecked ? 1 : 0;
              setDisponibilities(d);
            }}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              textDecorationLine: 'none',
            }}
            size={25}
            fillColor="green"
            unfillColor="#FFFFFF"
            text="Samedi"
            iconStyle={{borderColor: 'green'}}
            innerIconStyle={{borderWidth: 2}}
            onPress={isChecked => {
              const d = disponibilities;
              d[5] = isChecked ? 1 : 0;
              setDisponibilities(d);
            }}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              textDecorationLine: 'none',
            }}
            size={25}
            fillColor="green"
            unfillColor="#FFFFFF"
            text="Dimanche"
            iconStyle={{borderColor: 'green'}}
            innerIconStyle={{borderWidth: 2}}
            onPress={isChecked => {
              const d = disponibilities;
              d[6] = isChecked ? 1 : 0;
              setDisponibilities(d);
            }}
          />
        </View>
      </View>
      <View style={styles.buttonView}>
        <BasicButton
          style={styles.button}
          onClick={() => {
            createProfile();
          }}
          text="Valider mon profil"
        />
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTextView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: 'black',
    fontSize: 40,
    fontWeight: '800',
  },
  priceMaxView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 10,
  },
  priceMaxText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '800',
  },
  capacityView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  capacityText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '800',
  },
  switchesView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  switchCaseView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '800',
  },
  disponibilitiesView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  disponibilitiesText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
  },
  checkbox: {
    margin: 5,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShipperInformationPage;
