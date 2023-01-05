const products = require('../assets/json/products.json').products;

async function getProductsInCategory(categoryId) {
  let res = [];
  for (let product of products) {
    if (product.category_id === categoryId) {
      res.push(product);
    }
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(res);
    }, 1500);
  });
}

export default getProductsInCategory;
