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

const categoriesIcons = {
  1: require('../assets/icons/fruit.png'),
  2: require('../assets/icons/vegetable.png'),
  3: require('../assets/icons/grocery.png'),
  4: require('../assets/icons/care-products.png'),
  5: require('../assets/icons/drink.png'),
  6: require('../assets/icons/cereal.png'),
};

const productCategories = require('../assets/json/categories.json').categories;

const Item = function ({name, color, id}) {
  return (
    <View style={styles.item}>
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        <Image style={styles.icon} source={categoriesIcons[id]} />
      </View>
      <Text>{name}</Text>
    </View>
  );
};

function HomePage({isConnected, setIsConnected}) {
  const renderItem = ({item}) => (
    <Item name={item.name} color={item.color} id={item.id} />
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
          renderItem={renderItem}
        />
      </View>
      {/* <FlatList numColumns={2}>

      </FlatList> */}
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
  productContainer: {
    display: 'flex',
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
  switch: {
    position: 'absolute',
    top: -30,
    zIndex: 1,
  },
});

export default HomePage;
