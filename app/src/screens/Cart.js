import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import {CartContext} from '../utils/CartProvider';
import LinearGradient from 'react-native-linear-gradient';

const ProductCartItem = function ({name, price, quantity, iconLink}) {
  return (
    <View style={styles.cardShadow}>
      <LinearGradient
        colors={['#ffffff', '#e6e6e6']}
        style={styles.productCartItemContainer}>
        <Pressable style={styles.productCartItemPressable}>
          <View style={styles.imageProductContainer}>
            <Image style={styles.icon} source={{uri: iconLink}} />
          </View>
          <View style={styles.nameQuantityView}>
            <Text style={styles.productNameText}>{name}</Text>
            <Text style={styles.productQuantityText}>x{quantity}</Text>
          </View>
          <Text style={styles.productPriceText}>{price}€</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

function CartPage() {
  const {addToCart, items} = useContext(CartContext);
  console.log(items);

  const renderProductItem = ({item}) => (
    <ProductCartItem
      name={item.product.name}
      price={item.totalPrice}
      quantity={item.quantity}
      iconLink={item.product.icon_link}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.featuredFlatList}
        data={items}
        renderItem={renderProductItem}
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
});

export default CartPage;
