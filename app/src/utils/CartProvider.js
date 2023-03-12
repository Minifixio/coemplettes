import React, {createContext, useState} from 'react';
import Toast from 'react-native-toast-message';
export const CartContext = createContext();

export function CartProvider(props) {
  // on stocke les items de la Cart dans la variable "items"
  const [items, setItems] = useState([]);

  function addToCart(product, quantity) {
    Toast.show({
      type: 'success',
      text1: `${quantity} ${product.quantity_type} de ${product.name} ajoutés au panier!`,
    });

    setItems(prevItems => {
      const item = prevItems.find(item => item.id === product.id);
      if (!item) {
        return [
          ...prevItems,
          {
            id: product.id,
            quantity: quantity,
            product,
            totalPrice:
              Math.round(quantity * product.average_price * 100) / 100,
          },
        ];
      } else {
        return prevItems.map(item => {
          if (item.id === product.id) {
            item.quantity += quantity;
            item.totalPrice +=
              Math.round(quantity * product.average_price * 100) / 100;
          }
          return item;
        });
      }
    });
  }

  function removeFromCart(id) {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  }

  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  function eraseCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        getItemsCount,
        addToCart,
        getTotalPrice,
        removeFromCart,
      }}>
      {props.children}
      <Toast />
    </CartContext.Provider>
  );
}
