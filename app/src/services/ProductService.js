const products = require('../assets/json/products.json').products;

export async function getProductsInCategory(categoryId) {
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

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find(product => product.id === id);
}
