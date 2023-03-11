import {APIService} from './APIService';

const products = require('../assets/json/products.json').products;

export class ProductService {
  static async _getProductsInCategory(categoryId) {
    let res = [];
    for (let product of products) {
      if (product.category_id === categoryId) {
        res.push(product);
      }
    }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  }

  static _getProducts() {
    return products;
  }

  static _getProduct(id) {
    return products.find(product => product.id === id);
  }

  static async getProduct(id) {
    console.log('[ProductService] GET : product ' + id);
    try {
      const res = await APIService.get('product', id);
      return res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async getProductInCategory(category_id) {
    console.log(
      '[ProductService] GET : get product in category ' + category_id,
    );
    try {
      const res = await APIService.get('products', category_id);
      return res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async getFeaturedProducts() {
    return new Promise(async (resolve, reject) => {
      console.log('[ProductService] GET : featured products');
      try {
        const res = await APIService.get('featured_products');
        resolve(res.json());
      } catch (e) {
        console.error(e);
        reject();
      }
    });
  }

  static async getCategories() {
    return new Promise(async (resolve, reject) => {
      console.log('[ProductService] GET : categories');
      try {
        const res = await APIService.get('categories');
        resolve(res.json());
      } catch (e) {
        console.error(e);
        reject();
      }
    });
  }
}
