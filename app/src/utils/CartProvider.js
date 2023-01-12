import React, {createContext, useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Toast from 'react-native-toast-message';
import {getProduct} from '../services/ProductService';
export const CartContext = createContext();

export function CartProvider(props) {
  // on stocke les items de la Cart dans la variable "items"
  const [items, setItems] = useState([]);

  function addToCart(id, quantity) {
    const product = getProduct(id);

    Toast.show({
      type: 'success',
      text1: `${quantity} ${product.quantity_type} de ${product.name} ajoutés au panier!`,
    });

    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (!item) {
        return [
          ...prevItems,
          {
            id,
            quantity: quantity,
            product,
            totalPrice: product.price,
          },
        ];
      } else {
        return prevItems.map(item => {
          if (item.id === id) {
            item.quantity += quantity;
            item.totalPrice += product.price;
          }
          return item;
        });
      }
    });
  }

  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  return (
    <CartContext.Provider
      value={{items, setItems, getItemsCount, addToCart, getTotalPrice}}>
      {props.children}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.modal}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.bottomView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {lastItemAdded.quantity} de {lastItemAdded.name} ajoutés au panier
            </Text>
          </View>
        </View>
      </Modal> */}
      <Toast />
    </CartContext.Provider>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    height: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
});
