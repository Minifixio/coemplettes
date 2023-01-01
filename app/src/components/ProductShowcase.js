import * as React from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';

const ProductShowcase = ({title, price, icon, onClick}) => {
  return (
    <Pressable style={styles.productPressable} onPress={onClick}>
      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    width: '60%',
  },
  productPressable: {
    width: '90%',
    marginBottom: 5,
    borderRadius: 10,
  },
  productTitle: {
    color: 'white',
    fontSize: 20,
    lineHeight: 70,
    textAlign: 'center',
  },
});

export default ProductShowcase;
