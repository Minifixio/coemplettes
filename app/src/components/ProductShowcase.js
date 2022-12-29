import * as React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

const ProductShowcase = ({title, price, icon, onClick}) => {
  return (
    <Pressable style={styles.productPressable} onPress={onClick}>
      <Text style={styles.productTitle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
