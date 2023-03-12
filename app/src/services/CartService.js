import {APIService} from './APIService';
import {AuthService} from './AuthService';

export class CartService {
  static async addCart(deadline, items) {
    return new Promise(async (resolve, reject) => {
      try {
        const userId = await AuthService.getUserId();
        const cart = {
          owner_id: userId,
          delivery_id: null,
          deadline: deadline,
          status: 0,
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
}
