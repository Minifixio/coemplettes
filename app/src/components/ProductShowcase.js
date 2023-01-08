import React, {useState, useEffect} from 'react';
import {Text, Pressable, StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputSpinner from 'react-native-input-spinner';

const ProductShowcase = ({
  navigation,
  id,
  name,
  price,
  image,
  quantityType,
  onClick,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [quantitySelected, setQuantitySelected] = useState(0);
  const pressableCliked = () => {
    setQuantitySelected(!quantitySelected);
  };

  return (
    <LinearGradient colors={['#ffffff', '#e6e6e6']} style={styles.container}>
      <View style={styles.productContainer}>
        <Pressable style={styles.pressableProduct} onPress={onClick}>
          <Image style={styles.image} source={{uri: image}} />
          <Text style={styles.priceText}>
            {price}€ / {quantityType}
          </Text>

          <Text style={styles.titleText}>{name}</Text>
        </Pressable>

        <Pressable style={styles.addPressable} onPress={pressableCliked}>
          {/* Si le produit n'est séléctionné on montre le boutton "Add to basket" */}
          {!isSelected && (
            <View style={styles.pressableView}>
              <Ionicons
                style={styles.addBasketIcon}
                name="basket"
                size={25}
                color="black"
              />
              {/* <Image style={styles.icon} source={addBasketIcon} /> */}
              <Text style={styles.addText}>Ajouter au panier</Text>
            </View>
          )}
          {isSelected && (
            <View style={styles.inputSpinnerView}>
              <InputSpinner
                style={styles.inputSpinner}
                skin="square"
                colorLeft="#539903"
                colorRight="#539903"
                height={40}
                max={100}
                min={0}
                step={1}
                colorMax={'#f04048'}
                colorMin={'#40c5f4'}
                value={quantitySelected}
              />
            </View>
          )}
        </Pressable>
      </View>
    </LinearGradient>
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
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
  },
  pressableProduct: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 80,
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
    height: 40,
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
  addBasketIcon: {
    marginRight: 5,
  },
  inputSpinnerView: {
    height: 40,
    display: 'flex',
  },
});

export default ProductShowcase;
