import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {DeliveryService} from '../../services/DeliveryService';

const carts_mockup =
  require('../../assets/json/cart_response.json').cart_response;

const Divider = () => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: 10,
        color: 'black',
        width: '90%',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};

function DeliveryProposalCarts({route, navigation}) {
  /**
   * MOCKUP DATA
   *
   * _carts
   * */

  const mockup = false;
  const [carts, setCarts] = useState([]);
  const {deliveryProposalId} = route.params;

  useEffect(() => {
    if (mockup) {
      setCarts(carts_mockup);
    } else {
      const fetchCart = async () => {
        try {
          const deliveryProposalsData =
            await DeliveryService.getDeliveryProposalsSummary(
              deliveryProposalId,
            );
          if (deliveryProposalsData.carts.length > 0) {
            console.log(
              '[DeliveryProposals] Des cart pour la delivery proposal de trouvées : ',
              deliveryProposalsData.carts,
            );
            setCarts(deliveryProposalsData.carts);
          } else {
            console.log(
              '[DeliveryProposals] Pas de carts pour la delivery proposal de trouvé !',
            );
            setCarts([]);
          }
        } catch (e) {
          console.log(
            '[DeliveryProposals] Erreur lors du chargement des cart pour la delivery proposals...',
            e,
          );
        }
      };
      fetchCart();
    }
  }, [deliveryProposalId, mockup]);

  const getTotalPrice = () => {
    let s = 0;
    carts.forEach(cart => {
      s += cart.average_price;
    });
    return s;
  };

  const CartItem = ({item}) => {
    return (
      <View style={styles.cardShadow}>
        <LinearGradient
          colors={['#ffffff', '#e6e6e6']}
          style={styles.productCartItemContainer}>
          <Pressable style={styles.productCartItemPressable}>
            <TouchableOpacity
              style={styles.imageProductContainer}
              onPress={() => {}}>
              <Image
                style={styles.icon}
                source={{uri: item.product.icon_link}}
              />
            </TouchableOpacity>
            <View style={styles.nameQuantityView}>
              <Text style={styles.productNameText}>{item.product.name}</Text>
              <Text style={styles.productQuantityText}>x{item.quantity}</Text>
              <Text style={styles.productQuantityTypeText}>
                {item.product.quantity_type}
              </Text>
            </View>
            <Text style={styles.productPriceText}>
              &#126;{item.product.average_price}€
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    );
  };

  const CartItemsList = ({cartItems, ownerName}) => {
    return (
      <View style={styles.cartItemsListView}>
        <View style={styles.ownerNameView}>
          <Text style={styles.ownerNameText}>{ownerName}</Text>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: 10,
              color: 'black',
              width: '90%',
              marginLeft: 5,
              borderBottomColor: 'black',
              borderBottomWidth: 3,
            }}
          />
        </View>
        <FlatList
          style={styles.cartItemsList}
          data={cartItems}
          renderItem={({item}) => <CartItem item={item} />}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f2f2f2']} style={styles.container}>
        <FlatList
          data={carts}
          renderItem={({item}) => (
            <CartItemsList
              cartItems={item.items}
              ownerName={item.owner.first_name + ' ' + item.owner.last_name}
            />
          )}
          keyExtractor={item => item.id}
        />
        <View style={styles.bottomCard}>
          <View style={styles.totalTextView}>
            <Text style={styles.subtotalText}>Sous-total</Text>
            <Text style={styles.subtotalText}>
              {Math.round(getTotalPrice() * 100) / 100}€
            </Text>
          </View>
          <View style={styles.totalTextView}>
            <Text style={styles.subtotalText}>Pour le livreur</Text>
            <Text style={styles.subtotalText}>
              {Math.round(getTotalPrice() * 0.1 * 100) / 100}€
            </Text>
          </View>

          <Divider />

          <View style={styles.totalTextView}>
            <Text style={styles.totalText}>Total des items</Text>
            <Text style={styles.totalText}>
              {Math.round(getTotalPrice() * 100) / 100}€
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  ownerNameView: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerNameText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '800',
  },
  cartItemsList: {
    padding: 2,
  },
  cartItemsListView: {
    marginBottom: 40,
    marginTop: 10,
  },
  imageProductContainer: {
    display: 'flex',
    width: 100,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  productNameText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  productQuantityText: {
    fontSize: 25,
    color: 'black',
    fontWeight: '900',
  },
  productQuantityTypeText: {
    fontSize: 15,
    color: 'black',
  },
  productCartItemPressable: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameQuantityView: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  productCartItemContainer: {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: 16,
    height: '100%',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardShadow: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    height: 100,
    padding: 5,
    marginTop: 2,
  },
  totalTextView: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: 3,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtotalText: {
    color: 'black',
    fontSize: 20,
  },
  totalText: {
    color: 'black',
    fontSize: 30,
  },
  productPriceText: {
    fontSize: 30,
    color: 'green',
    position: 'absolute',
    fontWeight: '800',
    right: 10,
  },
  bottomCard: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 24,
    paddingBottom: 30,
  },
});

export default DeliveryProposalCarts;
