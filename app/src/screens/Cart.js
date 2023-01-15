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
import {getProduct} from '../services/ProductService';
import {CartContext} from '../utils/CartProvider';
import LinearGradient from 'react-native-linear-gradient';
import SwipeableFlatList from 'react-native-swipeable-list';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductCartItem = function ({id, quantity, totalPrice, navigation}) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(getProduct(id));
  }, [navigation, id]);

  function onClick() {
    navigation.navigate('ProductPage', {id});
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
          <Text style={styles.productPriceText}>{totalPrice}€</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

function CartPage({navigation}) {
  const {addToCart, removeFromCart, items} = useContext(CartContext);
  console.log(items);

  function remove(id) {
    removeFromCart(id);
  }

  const quickActions = (index, qaItem) => {
    return (
      <View style={styles.deleteButtonContainer}>
        <View style={styles.deleteButton}>
          <Pressable onPress={() => remove(qaItem)}>
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

      <SwipeableFlatList
        style={styles.featuredFlatList}
        data={items}
        renderItem={renderProductItem}
        keyExtractor={extractItemKey}
        maxSwipeDistance={70}
        renderQuickActions={({index, item}) => quickActions(index, item)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  featuredFlatList: {
    padding: 2,
    paddingLeft: 10,
    paddingRight: 0,
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
    fontSize: 24,
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
