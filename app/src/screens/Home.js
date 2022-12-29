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

const productCategories = [
  {
    name: 'Fruits',
    icon: require('../assets/icons/fruit.png'),
    color: '#FF7D5A',
  },
  {
    name: 'Legumes',
    icon: require('../assets/icons/vegetable.png'),
    color: '#0AD300',
  },
  {
    name: 'Epicerie',
    icon: require('../assets/icons/grocery.png'),
    color: '#FFFF5A',
  },
  {
    name: 'Soins',
    icon: require('../assets/icons/care-products.png'),
    color: '#FF80F7',
  },
  {
    name: 'Boisons',
    icon: require('../assets/icons/drink.png'),
    color: '#2EE5FE',
  },
  {
    name: 'Céréales',
    icon: require('../assets/icons/cereal.png'),
    color: '#F1B600',
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

function HomePage({isConnected, setIsConnected}) {
  const renderItem = ({item}) => (
    <Item name={item.name} icon={item.icon} color={item.color} />
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
  switch: {
    position: 'absolute',
    top: -30,
    zIndex: 1,
  },
});

export default HomePage;
