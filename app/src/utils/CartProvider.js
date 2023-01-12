import React, {createContext, useState} from 'react';
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
            totalPrice:
              Math.round(quantity * product.average_price * 100) / 100,
          },
        ];
      } else {
        return prevItems.map(item => {
          if (item.id === id) {
            item.quantity += quantity;
            item.totalPrice +=
              Math.round(quantity * product.average_price * 100) / 100;
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
      <Toast />
    </CartContext.Provider>
  );
}
