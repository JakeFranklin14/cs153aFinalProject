import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from "@expo/vector-icons";
import Slider from '@react-native-community/slider';


export default function App() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camZoom, setCamZoom] = useState(0);
  
    if (!permission) {
      // Camera permissions are still loading
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraType() {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
  
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} zoom = {camZoom}>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={0.2}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => {setCamZoom(value)}}
            />
            <Pressable style={styles.iconButton} onPress={toggleCameraType} >
                <Ionicons
                    name="camera-reverse-outline"
                    size={40}
                    color="white"
                />
            </Pressable>
        </Camera>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: 'center',
    },
    camera: {
        flex: 10, 
        overflow: 'hidden',
        backgroundColor: 'white', 
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconButton: {
        position: 'absolute',
        bottom: 4,
        right: 10,
    },
    slider: {

        position: 'absolute',
        right: -70,
        width: 200,
        height: 40,
    }
  });
  