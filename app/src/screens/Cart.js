import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

function CartPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>CartPage</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CartPage;
