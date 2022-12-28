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
      <FlatList data={productCategories} horizontal renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
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
});

export default HomePage;
