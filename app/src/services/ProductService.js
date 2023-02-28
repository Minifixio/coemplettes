import {API} from './APIService';

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
    console.log('GET : product ' + id);
    try {
      const res = await API.get('product', id);
      return res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async getProductInCategory(category_id) {
    console.log('GET : get product in category ' + category_id);
    try {
      const res = await API.get('products', category_id);
      return res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async getFeaturedProducts() {
    console.log('GET : featured products');
    try {
      const res = await API.get('featured_products');
      return res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async getCategories() {
    console.log('GET : categories');
    try {
      const res = await API.get('categories');
      return res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
