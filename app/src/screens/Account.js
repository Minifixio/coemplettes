import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function AccountPage() {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AccountPage;
