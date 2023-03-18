import React, {useEffect, useState} from 'react';
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

const cart_response =
  require('../assets/json/cart_response.json').cart_response;

const CartItem = function ({productData}) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(productData);
  }, [productData]);

  return (
    <View style={styles.cardShadow}>
      <LinearGradient
        colors={['#ffffff', '#e6e6e6']}
        style={styles.productCartItemContainer}>
        <Pressable style={styles.productCartItemPressable}>
          <TouchableOpacity
            style={styles.imageProductContainer}
            onPress={() => {}}>
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
function DeliveryCartCompletion() {
  /**
   * MOCKUP DATA
   *
   * _cartItems
   * */

  const [cartItems, setCartItems] = useState([]);

  const _cartItems = cart_response;

  useEffect(() => {
    setCartItems(_cartItems);
  }, [_cartItems]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f2f2f2']} style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={({item}) => <CartItem deliveryProposal={item} />}
          keyExtractor={item => item.id}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DeliveryCartCompletion;
