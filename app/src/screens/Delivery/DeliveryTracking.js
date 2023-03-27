import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import BasicButton from '../../components/BasicButton';
import {DeliveryService} from '../../services/DeliveryService';
const deliveries = require('../../assets/json/deliveries.json').deliveries;

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

function DeliveryTracking({navigation}) {
  /**
   * MOCKUP DATA
   *
   * status
   **/
  const mockup = false;
  const [delivery, setDelivery] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (mockup) {
      setDelivery(deliveries[0]);
      setLoading(false);
    } else {
      const fetchCurrentDelivery = async () => {
        try {
          const currentDelivery = await DeliveryService.getCurrentDelivery();
          if (currentDelivery.id !== undefined) {
            console.log(
              '[DeliveryTracking] Une delivery courante de trouvée : ',
              currentDelivery,
            );
            setDelivery(currentDelivery);
          } else {
            console.log('[DeliveryTracking] Pas delivery courante de trouvé !');
            setDelivery({});
          }
          setLoading(false);
        } catch (e) {
          console.log(
            '[DeliveryTracking] Erreur lors de la delivery courante...',
            e,
          );
          setLoading(false);
        }
      };
      fetchCurrentDelivery();

      const unsubscribe = navigation.addListener('focus', () => {
        fetchCurrentDelivery();
      });
      return unsubscribe;
    }
  }, [mockup, navigation, setDelivery]);

  const startDeliveryShopping = async () => {
    console.log("[DeliveryTracking] Début de l'achat !");
    try {
      await DeliveryService.deliveryStartShopping(delivery.id);
      setDelivery({...delivery, status: 1});
    } catch (e) {
      console.log("[DeliveryTracking] Erreur lors du début de l'achat...", e);
    }
  };

  const completeCarts = async () => {
    console.log('[DeliveryTracking] Début de la complétion des carts !');
    navigation.navigate('DeliveryCartCompletion', {cartsData: delivery.carts});
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      {delivery.id === undefined && !loading && (
        <View style={styles.emptyTextView}>
          <Text style={styles.emptyText}>
            Aucune livraisons en cours... Créez un panier pour commencer !
          </Text>
          <Text style={styles.infoText}>
            Prochain cycle d'affectation de commandes dans :
            {24 - new Date().getHours()} h
          </Text>
          <Ionicons name="sad" size={40} color="black" />
        </View>
      )}

      {delivery.id !== undefined && !loading && (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <LinearGradient
              colors={['#ffffff', '#f2f2f2']}
              style={styles.container}>
              <StatusItem
                title="Commande acceptée"
                subtitle="13/03/2023"
                iconName="md-checkmark"
                selected={delivery.status >= 0}
              />
              <StatusItem
                title="Commande en cours d'achat"
                subtitle="14/03/2023"
                iconName="ios-cart-outline"
                selected={delivery.status >= 1}
              />
              <StatusItem
                title="Commande déposée"
                subtitle="14/03/2023"
                iconName="ios-archive-outline"
                selected={delivery.status >= 2}
              />
            </LinearGradient>
          </ScrollView>
          {delivery.status === 0 && (
            <View style={styles.buttonView}>
              <BasicButton
                style={styles.button}
                onClick={() => {
                  startDeliveryShopping();
                }}
                text="Je débute l'achat"
              />
            </View>
          )}
          {delivery.status === 1 && (
            <View style={styles.buttonView}>
              <BasicButton
                style={styles.button}
                onClick={() => {
                  //setStatus(3);
                  completeCarts();
                }}
                text="Compléter la liste de course"
              />
            </View>
          )}
          {delivery.status === 2 && (
            <View style={styles.buttonView}>
              <BasicButton
                style={styles.button}
                onClick={() => {}}
                text="Recevoir le code Locker"
              />
            </View>
          )}
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
  infoText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    margin: 5,
    textAlign: 'center',
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default DeliveryTracking;
