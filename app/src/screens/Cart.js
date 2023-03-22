import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CartContext} from '../utils/CartProvider';
import LinearGradient from 'react-native-linear-gradient';
import SwipeableFlatList from 'react-native-swipeable-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BasicButton from '../components/BasicButton';
import DatePicker from 'react-native-date-picker';
import {CartService} from '../services/CartService';
import Toast from 'react-native-toast-message';

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

const ProductCartItem = function ({
  productData,
  quantity,
  totalPrice,
  navigation,
}) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(productData);
  }, [productData]);

  function onClick() {
    navigation.navigate('ProductPage', {id: product.id, productData});
  }

  return (
    <View style={styles.cardShadow}>
      <LinearGradient
        colors={['#ffffff', '#e6e6e6']}
        style={styles.productCartItemContainer}>
        <Pressable style={styles.productCartItemPressable}>
          <TouchableOpacity
            style={styles.imageProductContainer}
            onPress={onClick}>
            <Image style={styles.icon} source={{uri: product.icon_link}} />
          </TouchableOpacity>
          <View style={styles.nameQuantityView}>
            <Text style={styles.productNameText}>{product.name}</Text>
            <Text style={styles.productQuantityText}>
              x{quantity} {product.quantity_type}
            </Text>
          </View>
          <Text style={styles.productPriceText}>
            {Math.round(totalPrice * 100) / 100}€
          </Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

function CartPage({navigation}) {
  const {getTotalPrice, removeFromCart, items, eraseCart} =
    useContext(CartContext);
  const [deadline, setDeadline] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  function remove(id) {
    removeFromCart(id);
  }

  function selectDeadline() {
    setOpenDatePicker(true);
  }

  async function confirmDeadline() {
    try {
      setOpenDatePicker(false);
      await CartService.addCart(deadline.getTime(), items);
      Toast.show({
        type: 'success',
        text1: 'Carte validée !',
      });
      setTimeout(() => {
        eraseCart();
        navigation.navigate('CurrentCartOrderPage', {screen: 'Account'});
      }, 2000);
    } catch (e) {
      console.log("Erreur lors de l'ajout de carte : ", e);
      Toast.show({
        type: 'error',
        text1: "Erreur lors de l'ajout de carte!",
      });
    }
  }

  const quickActions = (index, qaItem) => {
    return (
      <View style={styles.deleteButtonContainer}>
        <View style={styles.deleteButton}>
          <Pressable onPress={() => remove(qaItem.id)}>
            <Ionicons name="trash" size={40} color="black" />
          </Pressable>
        </View>
      </View>
    );
  };

  const renderProductItem = ({item}) => (
    <ProductCartItem
      id={item.id}
      navigation={navigation}
      quantity={item.quantity}
      totalPrice={item.totalPrice}
      productData={item.product}
    />
  );

  const extractItemKey = item => {
    return item.id.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Si la cart est vide on affiche ce message */}
      {items.length === 0 && (
        <View style={styles.emptyTextView}>
          <Text style={styles.emptyText}>Ton panier est vide !</Text>
          <Ionicons name="sad" size={40} color="black" />
        </View>
      )}

      {/* Liste des items dans le panier */}
      <SwipeableFlatList
        style={styles.featuredFlatList}
        data={items}
        renderItem={renderProductItem}
        keyExtractor={extractItemKey}
        maxSwipeDistance={70}
        renderQuickActions={({index, item}) => quickActions(index, item)}
      />

      {/* Carton avec le total estimé et le bouton de validation */}
      {items.length > 0 && (
        <View style={styles.bottomCard}>
          <View style={styles.totalTextView}>
            <Text style={styles.subtotalText}>Sous-total</Text>
            <Text style={styles.subtotalText}>
              {Math.round(getTotalPrice() * 100) / 100}€
            </Text>
          </View>
          <View style={styles.totalTextView}>
            <Text style={styles.subtotalText}>Pour le livreur</Text>
            <Text style={styles.subtotalText}>1.5€</Text>
          </View>

          <Divider />

          <View style={styles.totalTextView}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
              {Math.round((getTotalPrice() + 1.5) * 100) / 100}€
            </Text>
          </View>

          <BasicButton
            style={styles.validationButton}
            onClick={() => {
              selectDeadline();
              //navigation.navigate('CurrentCartOrderPage', {screen: 'Account'});
            }}
            text="Passer la commande"
          />
          <DatePicker
            modal
            title="Sélectionner une date limite"
            confirmText="Valider ma commande"
            cancelText="Annuler"
            locale="fr"
            open={openDatePicker}
            date={deadline}
            onConfirm={date => {
              confirmDeadline();
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
          />
        </View>
      )}
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  featuredFlatList: {
    padding: 2,
    paddingLeft: 10,
    paddingRight: 0,
  },
  container: {
    height: '100%',
  },
  totalTextView: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtotalText: {
    color: 'black',
    fontSize: 15,
  },
  totalText: {
    color: 'black',
    fontSize: 30,
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
  },
  validationButton: {
    size: '90%',
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
    width: 80,
    height: 80,
    borderRadius: 70,
  },
  productNameText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  productPriceText: {
    fontSize: 30,
    color: 'green',
    position: 'absolute',
    fontWeight: '800',
    right: 10,
  },
  productQuantityText: {
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
  deleteButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButtonText: {
    color: 'black',
  },
  deleteButton: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '400',
  },
  emptyTextView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default CartPage;
