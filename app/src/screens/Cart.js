import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function CartPage() {
  return (
    <View style={styles.container}>
      <Text>CartPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CartPage;
