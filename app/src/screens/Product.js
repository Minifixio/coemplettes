import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import InputSpinner from 'react-native-input-spinner';
import BasicButton from '../components/BasicButton';
import LinearGradient from 'react-native-linear-gradient';

import {CartContext} from '../utils/CartProvider';

function ProductPage({navigation, route}) {
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState({});
  const {addToCart} = useContext(CartContext);
  const {productData, id} = route.params;

  useEffect(() => {
    navigation.setOptions({title: ''});
    //ProductService.getProduct(id).then(res => setProduct(res));
    setProduct(productData);
  }, [navigation, productData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: product.icon_link}} />
      </View>
      <LinearGradient
        colors={['#ffffff', '#e6e6e6']}
        style={styles.infoContainer}>
        <Text style={[styles.text, styles.priceText]}>
          {product.average_price}€
        </Text>
        <Text style={[styles.text, styles.nameText]}>{product.name}</Text>
        <Text style={[styles.text, styles.quantityText]}>
          {product.quantity_type}
        </Text>
        <View style={styles.buttonsContainer}>
          <InputSpinner
            style={styles.inputSpinner}
            skin="square"
            colorLeft="#539903"
            colorRight="#539903"
            max={100}
            min={0}
            step={1}
            colorMax={'#f04048'}
            colorMin={'#40c5f4'}
            value={quantity}
            onChange={num => {
              setQuantity(num);
            }}
          />
          <BasicButton
            style={styles.button}
            onClick={() => addToCart(id, quantity)}
            text="Ajouter au panier"
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    padding: 10,
  },
  inputSpinner: {
    marginBottom: 20,
    marginTop: 20,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 25,
    fontWeight: '700',
    color: 'green',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ProductPage;
