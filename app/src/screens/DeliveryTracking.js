import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import BasicButton from '../components/BasicButton';
const deliveries = require('../assets/json/deliveries.json').deliveries;

const StatusItem = ({
  iconName,
  title,
  subtitle,
  selected,
  buttonText,
  onPress,
}) => {
  return (
    <View style={styles.statusItemContainer}>
      <View
        style={[
          styles.statusItemIconView,
          selected
            ? styles.statusItemIconViewSelected
            : styles.statusItemIconViewUnselected,
        ]}>
        <Ionicons
          style={styles.statusItemIcon}
          name={iconName}
          size={40}
          color={selected ? '#159c00' : 'grey'}
        />
      </View>
      <View style={styles.statusItemTextView}>
        <Text style={styles.statusItemTitle}>{title}</Text>
        <Text style={styles.statusItemSubtitle}>{subtitle}</Text>

        {buttonText && selected && (
          <Button
            style={styles.cartInfoButton}
            title={buttonText}
            color="grey"
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
};

function DeliveryTracking() {
  /**
   * MOCKUP DATA
   *
   * status
   **/
  var [status, setStatus] = useState(deliveries[0].status);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={['#ffffff', '#f2f2f2']}
          style={styles.container}>
          <StatusItem
            title="Commande reçue"
            subtitle="11/03/2023"
            iconName="ios-cube-outline"
            selected={true}
            buttonText="Voir la commande"
            onPress={() => {
              setStatus(status + 1);
            }}
          />
          <StatusItem
            title="Commande acceptée"
            subtitle="13/03/2023"
            iconName="md-checkmark"
            selected={status >= 2}
          />
          <StatusItem
            title="Commande en attente d'achat"
            subtitle="13/03/2023"
            iconName="ios-time-outline"
            selected={status >= 3}
          />
          <StatusItem
            title="Commande en cours d'achat"
            subtitle="14/03/2023"
            iconName="ios-cart-outline"
            selected={status >= 4}
          />
          <StatusItem
            title="Commande déposée"
            subtitle="14/03/2023"
            iconName="ios-archive-outline"
            selected={status >= 6}
          />
        </LinearGradient>
      </ScrollView>
      {status === 1 && (
        <View style={styles.buttonView}>
          <BasicButton
            style={styles.button}
            onClick={() => {
              setStatus(3);
            }}
            text="Accepter la commande"
          />
        </View>
      )}
      {status === 3 && (
        <View style={styles.buttonView}>
          <BasicButton
            style={styles.button}
            onClick={() => {
              setStatus(4);
            }}
            text="Je débute l'achat"
          />
        </View>
      )}
      {status === 4 && (
        <View style={styles.buttonView}>
          <BasicButton
            style={styles.button}
            onClick={() => {
              setStatus(5);
            }}
            text="Compléter la liste de course"
          />
        </View>
      )}
      {status === 5 && (
        <View style={styles.buttonView}>
          <BasicButton
            style={styles.button}
            onClick={() => {
              setStatus(5);
            }}
            text="Recevoir le code Locker"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  scrollView: {
    height: '100%',
  },
  statusItemContainer: {
    margin: 10,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  statusItemTextView: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  statusItemTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
  statusItemSubtitle: {
    fontSize: 15,
    color: 'grey',
    marginBottom: 5,
  },
  statusItemIconView: {
    borderRadius: 40,
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusItemIconViewSelected: {
    backgroundColor: '#89f77e',
  },
  statusItemIconViewUnselected: {
    backgroundColor: '#dbdbdb',
  },
  statusItemIcon: {
    width: 40,
    height: 40,
  },
  buttonView: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    bottom: 10,
  },
});

export default DeliveryTracking;
