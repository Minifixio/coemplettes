import * as React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProductShowcase from '../components/ProductShowcase';

function CategoryPage({id, name, products}) {
  const renderProductItem = ({item}) => (
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
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.productsColumnWrapperStyle}
        style={styles.productsFlatList}
        data={products}
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
  },
  productsFlatList: {
    height: '100%',
  },
});

export default CategoryPage;
