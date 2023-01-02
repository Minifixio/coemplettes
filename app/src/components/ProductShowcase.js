import * as React from 'react';
import {Text, Pressable, StyleSheet, View, Image} from 'react-native';

const ProductShowcase = ({id, name, price, image, quantityType, onClick}) => {
  const addBasketIcon = require('../assets/icons/misc/add_basket.png');
  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Image style={styles.image} source={{uri: image}} />
        <Text style={styles.priceText}>
          {price}€ / {quantityType}
        </Text>

        <Text style={styles.titleText}>{name}</Text>

        <Pressable style={styles.addPressable} onPress={onClick}>
          <View style={styles.pressableView}>
            <Image style={styles.icon} source={addBasketIcon} />
            <Text style={styles.addText}>Ajouter au panier</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  container: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  titleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
  pressableView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPressable: {
    borderColor: 'black',
    borderTopWidth: 2,
    marginTop: 5,
    width: '100%',
    height: 30,
    display: 'flex',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'grey',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'green',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default ProductShowcase;
