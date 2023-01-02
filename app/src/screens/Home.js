import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar,
  Switch,
} from 'react-native';
import ProductShowcase from '../components/ProductShowcase';

const categoriesIcons = {
  0: require('../assets/icons/categories/fruit.png'),
  1: require('../assets/icons/categories/vegetable.png'),
  2: require('../assets/icons/categories/grocery.png'),
  3: require('../assets/icons/categories/care-products.png'),
  4: require('../assets/icons/categories/drink.png'),
  5: require('../assets/icons/categories/cereal.png'),
};

const productCategories = require('../assets/json/categories.json').categories;
const featuredProducts =
  require('../assets/json/featured_products.json').featured_products;
const products = require('../assets/json/products.json').products;

const Item = function ({name, color, id}) {
  return (
    <View style={styles.item}>
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        <Image style={styles.icon} source={categoriesIcons[id]} />
      </View>
      <Text style={{color: 'black'}}>{name}</Text>
    </View>
  );
};

function HomePage({isConnected, setIsConnected}) {
  const renderCategoryItem = ({item}) => (
    <Item name={item.name} color={item.color} id={item.id} />
  );
  const renderFeaturedItem = ({item}) => (
    <ProductShowcase
      name={item.name}
      price={item.average_price}
      id={item.id}
      image={item.icon_link}
      quantityType={item.quantity_type}
      onClick={() => {}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Switch
        style={styles.switch}
        thumbColor={isConnected ? 'green' : 'red'}
        onValueChange={() => setIsConnected(false)}
        value={isConnected}
      />
      <View style={styles.categoriesContainer}>
        <Text style={[styles.text, styles.categoryText]}>Catégories</Text>
        <FlatList
          style={styles.categoriesFlatList}
          data={productCategories}
          horizontal
          renderItem={renderCategoryItem}
        />
      </View>

      <View style={styles.fetauredContainer}>
        <Text style={[styles.text, styles.categoryText]}>
          Produits populaires
        </Text>
        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.fetauredColumnWrapperStyle}
          style={styles.featuredFlatList}
          data={featuredProducts}
          renderItem={renderFeaturedItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  categoriesContainer: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: '15%',
  },
  fetauredContainer: {
    display: 'flex',
    height: '85%',
  },
  productContainer: {
    display: 'flex',
  },
  categoriesFlatList: {
    height: '100%',
  },
  fetauredColumnWrapperStyle: {
    flex: 1,
    justifyContent: 'space-around',
  },
  featuredFlatList: {
    height: '100%',
  },
  item: {
    padding: 10,
    height: 60,
    marginVertical: 8,
    marginHorizontal: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  categoryText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  switch: {
    position: 'absolute',
    top: -30,
    zIndex: 1,
  },
});

export default HomePage;
