import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';

const productCategories = [
  {
    name: 'Fruits',
    icon: require('../assets/icons/fruit.png'),
    color: 'red',
  },
  {
    name: 'Legumes',
    icon: require('../assets/icons/vegetable.png'),
    color: 'green',
  },
  {
    name: 'Epicerie',
    icon: require('../assets/icons/grocery.png'),
    color: 'yellow',
  },
  {
    name: 'Soins',
    icon: require('../assets/icons/care-products.png'),
    color: 'pink',
  },
  {
    name: 'Boisons',
    icon: require('../assets/icons/drink.png'),
    color: 'blue',
  },
  {
    name: 'Céréales',
    icon: require('../assets/icons/cereal.png'),
    color: 'orange',
  },
];

const Item = ({name, icon, color}) => (
  <View style={styles.item}>
    <View style={[styles.iconContainer, {backgroundColor: color}]}>
      <Image style={styles.icon} source={icon} />
    </View>
    <Text>{name}</Text>
  </View>
);

function HomePage() {
  const renderItem = ({item}) => (
    <Item name={item.name} icon={item.icon} color={item.color} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoriesContainer}>
        <Text style={[styles.text, styles.categoryText]}>Catégories</Text>
        <FlatList
          style={styles.categoriesFlatList}
          data={productCategories}
          horizontal
          renderItem={renderItem}
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
    height: 120,
  },
  categoriesFlatList: {
    height: 70,
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
    fontSize: 20,
  },
  categoryText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default HomePage;
