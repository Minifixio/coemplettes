import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
  Button,
} from 'react-native';
import BasicButton from '../../components/BasicButton';
import {CartService} from '../../services/CartService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

const carts = require('../../assets/json/carts.json').carts;

function CurrentCartOrderPage({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * MOCKUP DATAS
   * cart
   * delivery
   * status
   */

  const mockup = false;

  const [cart, setCart] = useState({});

  useEffect(() => {
    setLoading(true);
    if (mockup) {
      setCart(carts[0]);
      setLoading(false);
    } else {
      const fetchCart = async () => {
        try {
          const currentCart = await CartService.getCurrentCart();
          if (currentCart.id !== undefined) {
            console.log(
              '[CurrentCartOrder] Une cart de trouvé : ',
              currentCart,
            );
            setCart(currentCart);
          } else {
            console.log('[CurrentCartOrder] Pas de cart de trouvé !');
            setCart({});
          }
          setLoading(false);
        } catch (e) {
          console.log(
            '[CurrentCartOrder] Erreur lors du chargement des carts...',
            e,
          );
          setLoading(false);
        }
      };
      fetchCart();
    }
  }, [mockup, setCart]);

  const cancelCart = async () => {
    try {
      await CartService.cancelCart(cart.id);
      Toast.show({
        type: 'success',
        text1: 'Commande annulée !',
      });
      setCart({});
    } catch (e) {
      console.log("[CurrentCartOrder] Impossible d'annuler la commande : ", e);
      Toast.show({
        type: 'error',
        text1: "Impossible d'annuler la commande !",
      });
    }
  };

  const openLocker = async () => {
    try {
      await CartService.openLocker(cart.locker_id);
      Toast.show({
        type: 'success',
        text1: 'Locker ouvert !',
      });
      let newCart = cart;
      newCart.status = 4;
      setCart(newCart);
      navigation.navigate('CartFinishPage', {cartData: cart});
    } catch (e) {
      console.log("[CurrentCartOrder] Impossible d'ouvrir le Locker : ", e);
      Toast.show({
        type: 'error',
        text1: "Impossible d'ouvrir le locker !",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Assurez-vous d'être devant le Locker
            </Text>
            <View style={styles.modalPressableView}>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  openLocker();
                }}>
                <Text style={styles.textStyle}>Ouvrir</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Annuler</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      {(cart.id === undefined || cart.status >= 3) && !loading && (
        <View style={styles.emptyTextView}>
          <Text style={styles.emptyText}>
            Aucune commande en cours... Créez un panier pour commencer !
          </Text>
          <Ionicons name="sad" size={40} color="black" />
        </View>
      )}

      {cart.id !== undefined && cart.status < 3 && !loading && (
        <View style={styles.subContainer}>
          <View style={styles.progressView}>
            <View style={styles.progressCircleView}>
              <View
                style={[
                  styles.progressCircle,
                  cart.status === 0 || cart.status === 1 || cart.status === 2
                    ? styles.progressCircleSelected
                    : styles.progressCircleUnselected,
                ]}>
                <Text style={styles.progressCircleInnerText}>1</Text>
              </View>
            </View>

            <View
              style={[
                styles.progressLine,
                cart.status >= 1
                  ? styles.progressLineSelected
                  : styles.progressLineUnselected,
              ]}
            />

            <View style={styles.progressCircleView}>
              <View
                style={[
                  styles.progressCircle,
                  cart.status >= 1
                    ? styles.progressCircleSelected
                    : styles.progressCircleUnselected,
                ]}>
                <Text style={styles.progressCircleInnerText}>2</Text>
              </View>
            </View>

            <View
              style={[
                styles.progressLine,
                cart.status === 2
                  ? styles.progressLineSelected
                  : styles.progressLineUnselected,
              ]}
            />

            <View style={styles.progressCircleView}>
              <View
                style={[
                  styles.progressCircle,
                  cart.status === 2
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
            {cart.status === 0 && (
              <View style={styles.infoSubView}>
                <Text style={styles.infoText}>Votre date limite : &nbsp;</Text>
                <Text style={styles.infoTimeText}>
                  {new Intl.DateTimeFormat('en-US').format(
                    new Date(cart.deadline),
                  )}
                </Text>
                <Text style={styles.infoText}>
                  Cycle d'affectation de livreur dans :
                </Text>
                <Text style={styles.infoTimeText}>
                  {24 - new Date().getHours()} h
                </Text>
              </View>
            )}
            {cart.status === 0 && cart.delivery_proposal_id !== null && (
              <View style={styles.infoSubView}>
                <View>
                  <Ionicons name="push-outline" size={40} color="black" />
                </View>
                <View>
                  <Text style={styles.infoText}>
                    Votre commande a été proposée à un livreur.
                  </Text>
                  <Text style={styles.infoTextLight}>
                    Il a {24 - new Date().getHours()} h pour l'accepter ou pas{' '}
                  </Text>
                </View>
              </View>
            )}

            {cart.status === 1 && (
              <View style={styles.container}>
                <View style={styles.infoSubView}>
                  <Text style={styles.infoText}>
                    Votre date limite : &nbsp;
                    {new Intl.DateTimeFormat('en-US').format(
                      new Date(cart.deadline),
                    )}
                  </Text>
                  <View style={styles.infoShipper}>
                    <Text style={styles.infoText}>
                      Livreur :{' '}
                      {cart.delivery.shipper.user
                        ? cart.delivery.shipper.user.first_name +
                          ' ' +
                          cart.delivery.shipper.user.last_name
                        : 'Carla George'}
                    </Text>
                  </View>

                  {/* <Text style={styles.infoTextLight}>
                    En attente du début de la course...
                  </Text> */}
                  <View style={styles.estimatedPriceView}>
                    <Text style={styles.infoText}>Prix estimé :</Text>
                    <Text
                      style={[
                        styles.estimatedPriceText,
                        styles.estimatedPriceTextMin,
                      ]}>
                      {cart.average_price}€
                    </Text>
                    {/* <Text style={styles.infoText}> - </Text>
                  <Text
                    style={[
                      styles.estimatedPriceText,
                      styles.estimatedPriceTextMax,
                    ]}>
                    50.30€
                  </Text> */}
                  </View>
                </View>
                {cart.delivery.status === 0 && (
                  <View style={styles.infoSubView}>
                    <View>
                      <Ionicons name="time-outline" size={40} color="black" />
                    </View>
                    <View>
                      <Text style={styles.infoText}>En attente d'achat...</Text>
                    </View>
                  </View>
                )}
                {cart.delivery.status === 1 && (
                  <View style={styles.infoSubView}>
                    <View>
                      <Ionicons name="cart-outline" size={40} color="black" />
                    </View>
                    <View>
                      <Text style={styles.infoText}>En cours d'achat...</Text>
                    </View>
                  </View>
                )}
                {cart.delivery.status === 2 && (
                  <View style={styles.infoSubView}>
                    <View>
                      <Ionicons
                        name="archive-outline"
                        size={40}
                        color="black"
                      />
                    </View>
                    <View>
                      <Text style={styles.infoText}>
                        En attente de dépôt...
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}

            {cart.status === 2 && (
              <View style={styles.infoSubView}>
                <Text style={styles.infoText}>Commande livrée le</Text>
                <Text style={styles.infoTextBold}>
                  {new Date(cart.delivery.deposit_date).toLocaleDateString(
                    'fr-FR',
                  )}
                </Text>
              </View>
            )}
            {cart.status === 2 && (
              <View style={styles.infoSubView}>
                <Text style={styles.infoText}>A récupérer avant le</Text>
                <Text style={styles.infoTextBold}>
                  {new Date(
                    new Date(cart.delivery.deposit_date).setTime(
                      new Date(cart.delivery.deposit_date).getTime() +
                        172800000,
                    ),
                  ).toLocaleDateString('fr-FR')}
                </Text>
              </View>
            )}
            {cart.status === 2 && (
              <View style={styles.infoSubView}>
                <Text style={styles.infoText}>Prix final :</Text>
                <Text style={styles.infoTextBold}>{cart.price_to_pay}€</Text>
                <Button
                  style={styles.cartInfoButton}
                  title="Voir la commande"
                  color="grey"
                  onPress={() => {
                    navigation.push('CartCompletionPage', {
                      cartData: cart,
                    });
                  }}
                />
              </View>
            )}
          </View>

          <View style={styles.buttonView}>
            {cart.status === 0 && (
              <BasicButton
                style={styles.button}
                valid={false}
                onClick={() => {
                  cancelCart();
                }}
                text="Annuler la commande"
              />
            )}
            {/* {cart.status === 1 && (
              <BasicButton
                style={styles.button}
                onClick={() => {
                  cart.status++;
                }}
                text="Voir votre commande"
              />
            )} */}
            {cart.status === 2 && (
              <BasicButton
                style={styles.button}
                onClick={() => {
                  setModalVisible(true);
                }}
                text="Payer et ouvrir le Locker"
              />
            )}
          </View>
        </View>
      )}
      <Toast />
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
    textAlign: 'center',
  },
  infoSubView: {
    display: 'flex',
    backgroundColor: 'white',
    margin: 10,
    elevation: 10,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    margin: 5,
    textAlign: 'center',
  },
  infoTimeText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  infoTextLight: {
    fontSize: 15,
    color: 'grey',
    fontWeight: '400',
    textAlign: 'center',
  },
  infoTextBold: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
  },
  infoShipper: {
    display: 'flex',
  },
  estimatedPriceView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  estimatedPriceText: {
    fontSize: 25,
    fontWeight: '500',
    marginLeft: 10,
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
  modalView: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 250,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  buttonConfirm: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  modalPressableView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default CurrentCartOrderPage;
