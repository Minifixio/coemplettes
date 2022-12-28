import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function HomePage() {
  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;
