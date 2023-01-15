import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Switch,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProductShowcase from '../components/ProductShowcase';
import CategoryPage from './Category';
import ProductPage from './Product';

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

const CategoryItem = function ({name, color, id, navigation}) {
  return (
    <Pressable
      style={styles.item}
      onPress={() => {
        navigation.navigate('CategoryPage', {
          categoryId: id,
          name: name,
        });
      }}>
      <View style={[styles.iconContainer, {backgroundColor: color}]}>
        <Image style={styles.icon} source={categoriesIcons[id]} />
      </View>
      <Text style={{color: 'black'}}>{name}</Text>
    </Pressable>
  );
};

function HomePage({navigation, isConnected, setIsConnected}) {
  const renderCategoryItem = ({item}) => (
    <CategoryItem
      name={item.name}
      color={item.color}
      id={item.id}
      navigation={navigation}
    />
  );
  const renderFeaturedItem = ({item}) => (
    <ProductShowcase navigation={navigation} id={item.id} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <Switch
        style={styles.switch}
        thumbColor={isConnected ? 'green' : 'red'}
        onValueChange={() => setIsConnected(false)}
        value={isConnected}
      /> */}
      <LinearGradient
        colors={['#e6e6e6', '#ffffff']}
        style={styles.categoriesContainer}>
        <Pressable style={styles.categoriesButtonPressable}>
          <Text style={[styles.text, styles.categoryText]}>Catégories</Text>
          <Ionicons
            style={styles.chevronIcon}
            name="md-chevron-forward"
            size={25}
            color="black"
          />
        </Pressable>

        <FlatList
          style={styles.categoriesFlatList}
          data={productCategories}
          horizontal
          renderItem={renderCategoryItem}
        />
      </LinearGradient>

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

const Stack = createNativeStackNavigator();

function HomeStack({isConnected, setIsConnected}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" options={{headerShown: false}}>
        {props => (
          <HomePage
            isConnected={isConnected}
            setIsConnected={setIsConnected}
            {...props}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="CategoryPage" component={CategoryPage} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  categoriesContainer: {
    display: 'flex',
    backgroundColor: '#e6e6e6',
    height: '15%',
  },
  fetauredContainer: {
    display: 'flex',
    height: '85%',
    backgroundColor: 'white',
  },
  chevronIcon: {
    position: 'absolute',
    right: 0,
    marginTop: 5,
  },
  categoriesButtonPressable: {
    display: 'flex',
    flexDirection: 'row',
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
    marginHorizontal: 6,
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
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
  },
  switch: {
    position: 'absolute',
    top: -30,
    zIndex: 1,
  },
});

export default HomeStack;
