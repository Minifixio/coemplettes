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

const ProductCartItem = function ({name, price, quantity, imageUri}) {
  return (
    <Pressable style={styles.productCartItemPressable}>
      <View style={styles.imageProductContainer}>
        <Image style={styles.icon} source={{uri: imageUri}} />
      </View>
      <Text style={{color: 'black'}}>{name}</Text>
    </Pressable>
  );
};

function CartPage() {
  const {addToCart, items} = useContext(CartContext);

  const renderProductItem = ({item}) => (
    <ProductCartItem
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      imageUri={item.icon_link}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.fetauredColumnWrapperStyle}
        style={styles.featuredFlatList}
        data={items}
        renderItem={renderProductItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CartPage;
