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
const delivery_proposals =
  require('../../assets/json/delivery_proposals.json').delivery_proposals;

const StatusItem = ({deliveryProposal, navigation}) => {
  const selected = deliveryProposal.status === 0 ? true : false;
  const iconName = selected ? 'cube-outline' : 'ios-close-circle-outline';
  const title = selected ? 'Commande reçue' : 'Commande refusée';
  const deadline = new Date(deliveryProposal.deadline).toLocaleDateString('fr');
  const creationDate = new Date(
    deliveryProposal.creation_date,
  ).toLocaleDateString('fr');

  const acceptDeliveyProposal = async () => {
    try {
      await DeliveryService.acceptDeliveryProposal(deliveryProposal.id);
      console.log(
        '[DeliveryProposals] Delivery proposal acceptée avec succès !',
      );
      navigation.navigate('DeliveryTracking');
    } catch (e) {
      console.log(
        "[DeliveryProposals] Erreur lors de l'acceptation de la delivery proposal...",
        e,
      );
    }
  };

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
          Proposée le : {creationDate}
        </Text>
        <Text style={styles.statusItemSubtitle}>Deadline : {deadline}</Text>

        {selected && (
          <Button
            style={styles.cartInfoButton}
            title="Voir la commande"
            color="grey"
            onPress={() => {
              navigation.push('DeliveryProposalCarts', {
                deliveryProposalId: deliveryProposal.id,
              });
            }}
          />
        )}
        {selected && (
          <Pressable
            style={styles.acceptButton}
            onPress={() => {
              acceptDeliveyProposal();
            }}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.5, y: 1.0}}
              colors={['#a1f542', '#539903']}
              style={styles.linearGradientAcceptButton}>
              <Text style={styles.acceptButtonText}>Accepter la commande</Text>
            </LinearGradient>
          </Pressable>
        )}
        <View style={styles.suggestedSupermarketView}>
          <Text style={styles.suggestedSupermarketText}>
            Supermarché suggéré :{' '}
            <Text style={styles.suggestedSupermarketTextBold}>Auchan</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

function DeliveryProposalsPage({navigation}) {
  /**
   * MOCKUP DATA
   *
   * _deliveryProposals
   **/
  const [deliveryProposals, setDeliveryProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockup = false;

  var _deliveryProposals = delivery_proposals;

  useEffect(() => {
    setLoading(true);
    setDeliveryProposals(_deliveryProposals);
    if (mockup) {
      setDeliveryProposals(_deliveryProposals);
      setLoading(false);
    } else {
      const fetchDeliveryProposals = async () => {
        try {
          const deliveryProposalsData =
            await DeliveryService.getDeliveryProposals();
          if (deliveryProposalsData.length > 0) {
            console.log(
              '[DeliveryProposals] Des delivery proposals de trouvé : ',
              deliveryProposalsData,
            );
            setDeliveryProposals(deliveryProposalsData);
          } else {
            console.log(
              '[DeliveryProposals] Pas de delivery proposals de trouvé !',
            );
            setDeliveryProposals([]);
          }
          setLoading(false);
        } catch (e) {
          console.log(
            '[DeliveryProposals] Erreur lors du chargement des delivery proposals...',
            e,
          );
          setLoading(false);
        }
      };
      fetchDeliveryProposals();
    }
  }, [_deliveryProposals, mockup]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      {deliveryProposals.length === 0 && !loading && (
        <View style={styles.emptyTextView}>
          <Text style={styles.emptyText}>Pas de propositions reçues...</Text>
          <Ionicons name="sad" size={40} color="black" />
        </View>
      )}

      {deliveryProposals.length > 0 && !loading && (
        <SafeAreaView style={styles.container}>
          <LinearGradient
            colors={['#ffffff', '#f2f2f2']}
            style={styles.container}>
            <FlatList
              data={deliveryProposals}
              renderItem={({item}) => (
                <StatusItem deliveryProposal={item} navigation={navigation} />
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
  suggestedSupermarketView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  suggestedSupermarketText: {
    color: 'black',
    fontSize: 15,
  },
  suggestedSupermarketTextBold: {
    fontWeight: 'bold',
  },
});

export default DeliveryProposalsPage;
