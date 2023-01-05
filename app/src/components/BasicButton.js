import * as React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BasicButton = props => {
  return (
    <Pressable style={styles.button} onPress={props.onClick}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={['#a1f542', '#539903']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor:
      'linear-gradient(61deg, rgba(205,239,137,1) 35%, rgba(88,156,0,1) 100%)',
    width: '90%',
    height: 70,
    marginBottom: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 70,
    textAlign: 'center',
  },
});

export default BasicButton;
