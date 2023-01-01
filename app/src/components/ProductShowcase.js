import * as React from 'react';
import {Text, Pressable, StyleSheet, View, Image} from 'react-native';

const ProductShowcase = ({id, name, price, image, onClick}) => {
  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Text style={styles.priceText}>{price}</Text>
        <Image style={styles.image} source={image} />
        <Text style={styles.titleText}>{name}</Text>

        <Pressable style={styles.addPressable} onPress={onClick}>
          <Text style={styles.addText}>Ajouter au panier</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    width: '60%',
  },
  container: {
    width: '90%',
    marginBottom: 5,
    borderRadius: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 70,
    textAlign: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
  addPressable: {
    flex: 1,
  },
  addText: {
    fontSize: 14,
  },
  priceText: {
    fontSize: 10,
    color: 'green',
  },
});

export default ProductShowcase;
