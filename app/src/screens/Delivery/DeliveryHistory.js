import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {DeliveryService} from '../../services/DeliveryService';
const deliveriesMockup =
  require('../../assets/json/deliveries.json').deliveries;

const StatusItem = ({delivery, navigation}) => {
  const selected = delivery.status === 0 ? true : false;
  const iconName = selected ? 'cube-outline' : 'ios-close-circle-outline';
  const title = selected ? 'Commande reçue' : 'Commande refusée';
  const deadline = new Date(delivery.deadline).toLocaleDateString('fr');
  const depositDate = new Date(delivery.deposit_date).toLocaleDateString('fr');

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
        <Text style={styles.statusItemSubtitle}>
          Déposée le : {depositDate}
        </Text>
        <Text style={styles.statusItemSubtitle}>Deadline : {deadline}</Text>

        <Button
          style={styles.cartInfoButton}
          title="Voir la commande"
          color="grey"
          onPress={() => {
            navigation.push('DeliveryHistoryCarts', {
              deliveryId: delivery.id,
            });
          }}
        />
      </View>
    </View>
  );
};

function DeliveryHistoryPage({navigation}) {
  /**
   * MOCKUP DATA
   *
   * _deliveryProposals
   **/
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockup = false;

  useEffect(() => {
    setLoading(true);
    if (mockup) {
      setDeliveries(deliveriesMockup);
      setLoading(false);
    } else {
      const fetchDeliveries = async () => {
        try {
          const deliveriesData = await DeliveryService.getDeliveries();
          if (deliveriesData.length > 0) {
            console.log(
              '[DeliveryHistoryPage] Des deliveries de trouvé : ',
              deliveriesData,
            );
            setDeliveries(deliveriesData);
          } else {
            console.log(
              '[DeliveryHistoryPage] Pas de deliveries de trouvées !',
            );
            setDeliveries([]);
          }
          setLoading(false);
        } catch (e) {
          console.log(
            '[DeliveryHistoryPage] Erreur lors du chargement des deliveries...',
            e,
          );
          setLoading(false);
        }
      };
      fetchDeliveries();
    }
  }, [mockup, setDeliveries]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      {deliveries.length === 0 && !loading && (
        <View style={styles.emptyTextView}>
          <Text style={styles.emptyText}>Historique de commandes vide</Text>
          <Ionicons name="sad" size={40} color="black" />
        </View>
      )}

      {deliveries.length > 0 && !loading && (
        <SafeAreaView style={styles.container}>
          <LinearGradient
            colors={['#ffffff', '#f2f2f2']}
            style={styles.container}>
            <FlatList
              data={deliveries}
              renderItem={({item}) => (
                <StatusItem delivery={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id}
            />
          </LinearGradient>
        </SafeAreaView>
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
  emptyText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },
  emptyTextView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor:
      'linear-gradient(61deg, rgba(205,239,137,1) 35%, rgba(88,156,0,1) 100%)',
    width: '100%',
    marginTop: 10,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  linearGradientAcceptButton: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    padding: 10,
    borderRadius: 5,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default DeliveryHistoryPage;
