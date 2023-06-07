import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProductShowcase from '../../components/ProductShowcase';

import {ProductService} from '../../services/ProductService';

function CategoryPage({navigation, route}) {
  const {categoryId, name} = route.params;

  const [products, setProducts] = useState([]);
  const [shownProducts, setShownProducts] = useState([]);
  const [nutriscores, setNutriscores] = useState(['A', 'B', 'C', 'D', 'E']);

  useEffect(() => {
    ProductService.getProductInCategory(categoryId).then(res => {
      console.log('[CategoryPage] Products : ');
      console.log(res);
      setProducts(res);
      setShownProducts(res);
    });
    navigation.setOptions({title: name});
  }, [navigation, categoryId, name]);

  const changeNutriscore = nutriscore => {
    if (nutriscores.includes(nutriscore)) {
      var newNutriscores = nutriscores.filter(n => n !== nutriscore);
      setNutriscores(newNutriscores);
    } else {
      var newNutriscores = [...nutriscores, nutriscore];
      setNutriscores(newNutriscores);
    }

    if (newNutriscores.length === 5) {
      setShownProducts(products);
      return;
    }

    const productWithNutriscore = products.filter(p =>
      newNutriscores.includes(p.nutriscore),
    );

    setShownProducts(productWithNutriscore);
  };

  const renderProductItem = ({item}) => (
    <ProductShowcase
      navigation={navigation}
      productData={item}
      id={item.id}
      onClick={() => {
        navigation.navigate('ProductPage', {
          id: item.id,
          productData: item,
        });
      }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.nutriscoreTitle}>Nutriscore</Text>
      <View style={styles.nutriscoreSelectView}>
        <TouchableOpacity
          style={[
            styles.nutriscoreSelectButton,
            nutriscores.includes('A')
              ? {backgroundColor: '#068242'}
              : {backgroundColor: 'lightgrey'},
          ]}
          onPress={() => changeNutriscore('A')}>
          <Text style={styles.nutriscoreSelectText}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nutriscoreSelectButton,
            nutriscores.includes('B')
              ? {backgroundColor: '#88BD30'}
              : {backgroundColor: 'lightgrey'},
          ]}
          onPress={() => changeNutriscore('B')}>
          <Text style={styles.nutriscoreSelectText}>B</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nutriscoreSelectButton,
            nutriscores.includes('C')
              ? {backgroundColor: '#FECE0B'}
              : {backgroundColor: 'lightgrey'},
          ]}
          onPress={() => changeNutriscore('C')}>
          <Text style={styles.nutriscoreSelectText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nutriscoreSelectButton,
            nutriscores.includes('D')
              ? {backgroundColor: '#EF8200'}
              : {backgroundColor: 'lightgrey'},
          ]}
          onPress={() => changeNutriscore('D')}>
          <Text style={styles.nutriscoreSelectText}>D</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nutriscoreSelectButton,
            nutriscores.includes('E')
              ? {backgroundColor: '#E63B08'}
              : {backgroundColor: 'lightgrey'},
          ]}
          onPress={() => changeNutriscore('E')}>
          <Text style={styles.nutriscoreSelectText}>E</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.productsColumnWrapperStyle}
        style={styles.productsFlatList}
        data={shownProducts}
        renderItem={renderProductItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsColumnWrapperStyle: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  productsFlatList: {
    marginTop: 10,
    paddingTop: 10,
    height: '100%',
  },
  nutriscoreSelectView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 5,
  },
  nutriscoreSelectButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'green',
    marginRight: 5,
    marginLeft: 5,
  },
  nutriscoreSelectText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nutriscoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
  },
});

export default CategoryPage;
