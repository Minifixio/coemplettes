import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BasicButton from '../components/BasicButton';
import {CartService} from '../services/CartService';
import Ionicons from 'react-native-vector-icons/Ionicons';

const carts = require('../assets/json/carts.json').carts;

function CurrentCartOrder({navigation, route}) {
  /**
   * MOCKUP DATAS
   * cart
   * delivery
   * status
   *
   * l'idée c'est d'ensuite les passer en paramètre de route
   */

  const mockup = true;

  const [cart, setCart] = useState({});

  useEffect(() => {
    if (mockup) {
      setCart(carts[0]);
    } else {
      const fetchCart = async () => {
        try {
          const currentCart = await CartService.getCurrentCart();
          if (currentCart !== []) {
            setCart(currentCart);
          } else {
            setCart({});
          }
        } catch (e) {
          console.log(
            '[CurrentCartOrder] Erreur lors du chargement des carts...',
            e,
          );
        }
      };
      fetchCart();
    }
  }, [mockup, setCart]);

  return (
    <View style={styles.container}>
      {cart === {} && (
        <View style={styles.emptyTextView}>
          <Text style={styles.emptyText}>Ton panier est vide !</Text>
          <Ionicons name="sad" size={40} color="black" />
        </View>
      )}

      {cart !== {} && (
        <View style={styles.subContainer}>
          <View style={styles.progressView}>
            <View style={styles.progressCircleView}>
              <View
                style={[
                  styles.progressCircle,
                  cart.status === 1 || cart.status === 2 || cart.status === 3
                    ? styles.progressCircleSelected
                    : styles.progressCircleUnselected,
                ]}>
                <Text style={styles.progressCircleInnerText}>1</Text>
              </View>
            </View>

            <View
              style={[
                styles.progressLine,
                cart.status >= 2
                  ? styles.progressLineSelected
                  : styles.progressLineUnselected,
              ]}
            />

            <View style={styles.progressCircleView}>
              <View
                style={[
                  styles.progressCircle,
                  cart.status >= 2
                    ? styles.progressCircleSelected
                    : styles.progressCircleUnselected,
                ]}>
                <Text style={styles.progressCircleInnerText}>2</Text>
              </View>
            </View>

            <View
              style={[
                styles.progressLine,
                cart.status === 3
                  ? styles.progressLineSelected
                  : styles.progressLineUnselected,
              ]}
            />

            <View style={styles.progressCircleView}>
              <View
                style={[
                  styles.progressCircle,
                  cart.status === 3
                    ? styles.progressCircleSelected
                    : styles.progressCircleUnselected,
                ]}>
                <Text style={styles.progressCircleInnerText}>3</Text>
              </View>
            </View>
          </View>

          <View style={styles.progressTextView}>
            <Text style={styles.progressCircleLabel}>Liste placée</Text>
            <Text style={styles.progressCircleLabel}>Commande</Text>
            <Text style={styles.progressCircleLabel}>Récupération</Text>
          </View>

          <View style={styles.infoView}>
            {cart.status === 1 && (
              <View style={styles.infoSubView}>
                <Text style={styles.infoText}>
                  Votre date limite : &nbsp;
                  {new Intl.DateTimeFormat('en-US').format(
                    new Date(cart.deadline),
                  )}
                </Text>
                <Text style={styles.infoText}>
                  Prochaine génération de commande :
                </Text>
                <Text style={styles.infoTextLight}>
                  Il y actuellement 4 propositions de livreurs en cours
                </Text>
              </View>
            )}

            {cart.status === 2 && (
              <View style={styles.infoSubView}>
                <Text style={styles.infoText}>
                  Votre date limite : &nbsp;
                  {new Intl.DateTimeFormat('en-US').format(
                    new Date(cart.deadline),
                  )}
                </Text>
                <View style={styles.infoShipper}>
                  <Text style={styles.infoText}>
                    Livreur proposé : Carla George
                  </Text>
                </View>

                <Text style={styles.infoTextLight}>
                  Date de livraison prévue : 10/11/2023
                </Text>
                <View style={styles.estimatedPriceView}>
                  <Text style={styles.infoText}>Prix estimé :</Text>
                  <Text
                    style={[
                      styles.estimatedPriceText,
                      styles.estimatedPriceTextMin,
                    ]}>
                    45.10€
                  </Text>
                  <Text style={styles.infoText}> - </Text>
                  <Text
                    style={[
                      styles.estimatedPriceText,
                      styles.estimatedPriceTextMax,
                    ]}>
                    50.30€
                  </Text>
                </View>
              </View>
            )}

            {cart.status === 3 && (
              <View style={styles.infoSubView}>
                <Text style={styles.infoText}>
                  Commande livrée le 04/11/2022
                </Text>
                <Text style={styles.infoText}>
                  A récupérer avant le 07/11/2022
                </Text>
              </View>
            )}
          </View>

          <View style={styles.buttonView}>
            {cart.status === 1 && (
              <BasicButton
                style={styles.button}
                valid={false}
                onClick={() => {
                  cart.status++;
                }}
                text="Annuler la liste"
              />
            )}
            {cart.status === 2 && (
              <BasicButton
                style={styles.button}
                onClick={() => {
                  cart.status++;
                }}
                text="Valider et payer la caution"
              />
            )}
            {cart.status === 3 && (
              <BasicButton
                style={styles.button}
                onClick={() => {
                  cart.status = 1;
                }}
                text="Récupérer mon code Locker"
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    paddingTop: 20,
  },
  subContainer: {
    display: 'flex',
    height: '100%',
  },
  progressView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleView: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleSelected: {
    backgroundColor: 'green',
  },
  progressCircleUnselected: {
    backgroundColor: 'grey',
  },
  progressCircleInnerText: {
    color: 'white',
  },
  progressTextView: {
    display: 'flex',
    flexDirection: 'row',
    height: '5%',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
  },
  progressCircleLabel: {
    color: 'grey',
  },
  infoView: {
    display: 'flex',
    height: '70%',
    padding: 10,
  },
  infoSubView: {
    display: 'flex',
  },
  infoText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
  infoTextLight: {
    fontSize: 15,
    color: 'grey',
    fontWeight: '400',
  },
  infoShipper: {
    display: 'flex',
  },
  estimatedPriceView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  estimatedPriceText: {
    fontSize: 25,
    fontWeight: '500',
  },
  estimatedPriceTextMin: {
    color: 'green',
  },
  estimatedPriceTextMax: {
    color: 'red',
  },
  buttonView: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    bottom: 30,
  },
  progressLine: {
    display: 'flex',
    width: 100,
    height: 5,
  },
  progressLineSelected: {
    backgroundColor: 'green',
  },
  progressLineUnselected: {
    backgroundColor: 'grey',
  },
});

export default CurrentCartOrder;
