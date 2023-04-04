/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Switch} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CheckBox from '@react-native-community/checkbox';
import InputSpinner from 'react-native-input-spinner';
import BasicButton from '../../components/BasicButton';
import {AuthService} from '../../services/AuthService';
import {UserService} from '../../services/UserService';
import Toast from 'react-native-toast-message';
import {UserContext} from '../../utils/UserProvider';

function ShipperInformationPage({navigation}) {
  const {getShipperInfos, updateShipperProfile} = useContext(UserContext);
  const [priceMax, setPriceMax] = useState(50);
  const [capacity, setCapacity] = useState(2);
  const [disponibilities, setDisponibilities] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // Indiquent si le shipper peut aller au Drive / en magasin
  const [drive, setDrive] = useState(false);
  const [shop, setShop] = useState(false);

  const [hasCar, setHasCar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shipperInfos = await getShipperInfos();
        console.log('[ShipperInformations]', shipperInfos);
        setPriceMax(shipperInfos.price_max);
        setCapacity(shipperInfos.capacity);
        setDisponibilities(
          shipperInfos.disponibilities.split('').map(c => c === '1'),
        );
        setDrive(shipperInfos.drive);
        setShop(shipperInfos.shop);
        setHasCar(shipperInfos.has_car);
      } catch (e) {
        console.log('[ShipperInformations] Erreur :', e);
      }
    };
    fetchData();
  }, [getShipperInfos]);

  const updateProfile = async () => {
    try {
      const shipper = {
        capacity,
        price_max: priceMax,
        drive,
        has_car: hasCar,
        shop,
        disponibilities: disponibilities
          .map(valeur => (valeur ? '1' : '0'))
          .join(''),
      };
      await updateShipperProfile(shipper);
      Toast.show({
        type: 'success',
        text1: 'Profil livreur mis à jour',
      });
      navigation.navigate('ShipperAccountPage');
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Erreur lors de la mise à jour du profil livreur',
      });
    }
  };

  const vacationMode = async () => {
    try {
      const shipper = {
        capacity,
        price_max: priceMax,
        drive,
        has_car: hasCar,
        shop,
        disponibilities: '0000000',
      };
      await updateShipperProfile(shipper);
      Toast.show({
        type: 'success',
        text1: 'Profil livreur mis à jour, mode vacances activé',
      });
      navigation.navigate('ShipperAccountPage');
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Erreur lors de la mise à jour du profil livreur',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.mainTextView}>
        <Text style={styles.mainText}>Profil livreur</Text>
      </View> */}
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
      {/* <View style={styles.capacityView}>
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
      </View> */}
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
          <View style={styles.checkboxView}>
            <CheckBox
              disabled={false}
              value={disponibilities[0]}
              onValueChange={newValue => {
                setDisponibilities([newValue, ...disponibilities.slice(1)]);
              }}
            />
            <Text style={styles.checkboxText}>Lundi</Text>
          </View>

          <View style={styles.checkboxView}>
            <CheckBox
              disabled={false}
              value={disponibilities[1]}
              onValueChange={newValue => {
                setDisponibilities([
                  disponibilities[0],
                  newValue,
                  ...disponibilities.slice(2),
                ]);
              }}
            />
            <Text style={styles.checkboxText}>Mardi</Text>
          </View>

          <View style={styles.checkboxView}>
            <CheckBox
              disabled={false}
              value={disponibilities[2]}
              onValueChange={newValue => {
                setDisponibilities([
                  ...disponibilities.slice(0, 2),
                  newValue,
                  ...disponibilities.slice(3),
                ]);
              }}
            />
            <Text style={styles.checkboxText}>Mercredi</Text>
          </View>

          <View style={styles.checkboxView}>
            <CheckBox
              disabled={false}
              value={disponibilities[3]}
              onValueChange={newValue => {
                setDisponibilities([
                  ...disponibilities.slice(0, 3),
                  newValue,
                  ...disponibilities.slice(4),
                ]);
              }}
            />
            <Text style={styles.checkboxText}>Jeudi</Text>
          </View>

          <View style={styles.checkboxView}>
            <CheckBox
              disabled={false}
              value={disponibilities[4]}
              onValueChange={newValue => {
                setDisponibilities([
                  ...disponibilities.slice(0, 4),
                  newValue,
                  ...disponibilities.slice(5),
                ]);
              }}
            />
            <Text style={styles.checkboxText}>Vendredi</Text>
          </View>

          <View style={styles.checkboxView}>
            <CheckBox
              disabled={false}
              value={disponibilities[5]}
              onValueChange={newValue => {
                setDisponibilities([
                  ...disponibilities.slice(0, 5),
                  newValue,
                  disponibilities[6],
                ]);
                console.log(disponibilities);
              }}
            />
            <Text style={styles.checkboxText}>Samedi</Text>
          </View>

          <View style={styles.checkboxView}>
            <CheckBox
              disabled={false}
              value={disponibilities[6]}
              onValueChange={newValue => {
                setDisponibilities([...disponibilities.slice(0, 6), newValue]);
              }}
            />
            <Text style={styles.checkboxText}>Dimanche</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsView}>
        <View style={styles.buttonHolidayView}>
          <BasicButton
            style={styles.buttonHoliday}
            selected={false}
            height={50}
            onClick={() => {
              vacationMode();
            }}
            text="Passer en mode vacances"
          />
        </View>
        <View style={styles.buttonView}>
          <BasicButton
            style={styles.button}
            onClick={() => {
              updateProfile();
            }}
            text="Valider mon profil"
          />
        </View>
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
  checkboxView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: 'black',
    fontSize: 15,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHolidayView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default ShipperInformationPage;
