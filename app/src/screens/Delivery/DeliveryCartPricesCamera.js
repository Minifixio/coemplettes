import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';

function DeliveryCartPricesCameraPage({navigation}) {
  const [active, setActive] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const startCamera = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      console.log(cameraPermission);
      if (cameraPermission !== 'authorized') {
        const permission = await Camera.requestCameraPermission();
        console.log(permission);
        if (permission === 'authorized') {
          setActive(true);
        }
      } else {
        setActive(true);
      }
    };
    startCamera();
  }, [active]);

  if (!active || device == null) {
    return <View />;
  } else {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.preview}
          //style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
        <TouchableHighlight style={styles.actionButton} onPress={() => {}}>
          <Ionicons
            style={styles.statusItemIcon}
            name={'camera-outline'}
            size={40}
            color={'grey'}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  actionButton: {
    position: 'absolute',
    bottom: 25,
    padding: 16,
    right: 20,
    left: 20,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default DeliveryCartPricesCameraPage;
