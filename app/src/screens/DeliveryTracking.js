import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
const deliveries = require('../assets/json/deliveries.json').deliveries;

const StatusItem = ({iconName, title, subtitle, selected}) => {
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
  const status = deliveries[0].status;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f2f2f2']} style={styles.container}>
        <View style={styles.statusItemContainer}>
          <View
            style={[
              styles.statusItemIconView,
              status === 1
                ? styles.statusItemIconViewSelected
                : styles.statusItemIconViewUnselected,
            ]}>
            <Ionicons
              style={styles.statusItemIcon}
              name="ios-cube-outline"
              size={40}
              color={status === 1 ? '#159c00' : 'grey'}
            />
          </View>
          <View style={styles.statusItemTextView}>
            <Text style={styles.statusItemTitle}>Commande placée</Text>
            <Text style={styles.statusItemSubtitle}>11/03/2023</Text>
            <Button
              style={styles.cartInfoButton}
              title="Voir la commande"
              color="grey"
              onPress={() => {}}
            />
          </View>
        </View>
        <StatusItem
          title="Commande acceptée"
          subtitle="13/03/2023"
          iconName="md-checkmark"
          selected={false}
        />
        <StatusItem
          title="Commande en attente d'achat"
          subtitle="13/03/2023"
          iconName="ios-time-outline"
          selected={false}
        />
        <StatusItem
          title="Commande en cours d'achat"
          subtitle="14/03/2023"
          iconName="ios-cart-outline"
          selected={false}
        />
        <StatusItem
          title="Commande déposée"
          subtitle="14/03/2023"
          iconName="ios-archive-outline"
          selected={false}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
});

export default DeliveryTracking;
