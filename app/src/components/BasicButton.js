import * as React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BasicButton = props => {
  const valid = props.valid === undefined ? true : props.valid;
  const selected = props.selected === undefined ? true : props.selected;
  const height = props.height === undefined ? 70 : props.height;

  const styles = StyleSheet.create({
    linearGradient: {
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      width: '100%',
      height: '100%',
    },
    textView: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    button: {
      backgroundColor:
        'linear-gradient(61deg, rgba(205,239,137,1) 35%, rgba(88,156,0,1) 100%)',
      width: '90%',
      height: height,
      marginBottom: 5,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
    },
  });

  return (
    <Pressable style={styles.button} onPress={props.onClick}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={
          selected
            ? valid
              ? ['#a1f542', '#539903']
              : ['#FF1500', '#B80F00']
            : ['#e0e0e0', '#b3b3b3']
        }
        style={styles.linearGradient}>
        <View style={styles.textView}>
          <Text style={styles.buttonText}>{props.text}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default BasicButton;
