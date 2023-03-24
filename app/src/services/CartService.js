import {APIService} from './APIService';
import {AuthService} from './AuthService';

export class CartService {
  static async addCart(deadline, items) {
    return new Promise(async (resolve, reject) => {
      try {
        const userId = await AuthService.getUserId();

        console.log(items);
        let averageCartPrice = 0;
        for (let item of items) {
          averageCartPrice += item.totalPrice;
        }

        const cart = {
          owner_id: userId,
          delivery_id: null,
          deadline: deadline,
          status: 0,
          average_price: Math.round(averageCartPrice * 100) / 100,
        };

        const cartItems = items.map(item => {
          return {product_id: item.product.id, quantity: item.quantity};
        });

        console.log("[CartService] Ajout d'une nouvelle cart :");
        console.log(cart, cartItems);
        console.log('\n');

        const res = await APIService.post('cart', {
          cart: cart,
          cart_items: cartItems,
        });

        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  static async getCurrentCart() {
    return new Promise(async (resolve, reject) => {
      try {
        const userId = await AuthService.getUserId();
        console.log("[CartService] Récupération des carts de l'utilisateur");
        const res = await APIService.get('current_cart', userId);
        const cart = await res.json();

        resolve(cart);
      } catch (e) {
        reject(e);
      }
    });
  }

  static async cancelCart(cartId) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("[CartService] Récupération des carts de l'utilisateur");
        await APIService.post('cart_cancel', {cart_id: cartId});
        resolve(cart);
      } catch (e) {
        reject(e);
      }
    });
  }

  static async openLocker(lockerId) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("[CartService] Récupération des carts de l'utilisateur");
        await APIService.post('open_locker', lockerId);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
