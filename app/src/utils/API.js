const products = require('../assets/json/products.json').products;

function getProductsInCategory(categoryId) {
  let res = [];
  for (let product of products) {
    if (product.category_id === categoryId) {
      res.append(product);
    }
  }
  return res;
}

export default getProductsInCategory;
