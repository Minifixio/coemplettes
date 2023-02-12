import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function CurrentCartOrder({navigation, route}) {
  // const {cart} = route.params;
  return (
    <View style={styles.container}>
      <Text>CurrentOrder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CurrentCartOrder;
