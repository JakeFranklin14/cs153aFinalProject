// Built In Imports
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, Button } from 'react-native';

// Camera View Imports
import { Camera, CameraType } from 'expo-camera';
import Slider from '@react-native-community/slider';
import * as MediaLibrary from 'expo-media-library';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

// Styling Imports
import { LinearGradient } from 'expo-linear-gradient';
import { easeGradient } from 'react-native-easing-gradient';
import { Ionicons } from "@expo/vector-icons";

import * as Haptics from 'expo-haptics';

// Custom Component Imports
import Selector from './ModeSelector';
import Gallery from './Gallery';

export default function App() {
  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [camZoom, setCamZoom] = useState(0);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [uri, setUri] = useState(null);
  const [shutterView, setShutterView] = useState(true);
  

  const takePicture= async () => {
    Haptics.selectionAsync();
    setShutterView(false);
    cameraRef.current.takePictureAsync({exif: true, quality: 1}).then(async (result) => {
      if (type == CameraType.front) {
        const manipResult = await manipulateAsync(
          result.localUri || result.uri,
          [ { flip: FlipType.Horizontal }],
          { compress: 1, format: SaveFormat.PNG }
        );
        MediaLibrary.saveToLibraryAsync(manipResult.uri);
        setUri(manipResult.uri);
      } else {
      MediaLibrary.saveToLibraryAsync(result.uri);
      setUri(result.uri);
      }
      setShutterView(true);
      Haptics.selectionAsync();
    });
  }

  
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }


  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: 'white' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

    function toggleCameraType() {
      Haptics.selectionAsync();
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const Shutter = () => {
      return (
      <View> 
          <Pressable style={styles.shutterButton} onPress={takePicture}>
              <Text style={styles.largeText}> Shutter </Text>
          </Pressable>
      </View>
      );
  };

  const { colors, locations } = easeGradient({
    colorStops: {
      0: {
        color: 'transparent',
      },
      1: {
        color: 'black',
      },
    },
  })
  
  const showShutter = () => {
    if (shutterView == false) {
      return (
        <View style={{flex:1, justifyContent: 'center'}}/>
      );
    } else if (shutterView == true) {
      return (
        <View style={{flex:1, justifyContent: 'center'}}>
          <Shutter />
        </View>
      );
    }
  }


    return (
      <View style={styles.container}>
        <Camera style={styles.camera} ref={cameraRef} type={type} zoom = {camZoom} >
        <LinearGradient colors={colors} locations= {locations} style={styles.gradientTopDown} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}/>
        <LinearGradient colors={colors} locations= {locations} style={styles.gradientLeft} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} />
        <LinearGradient colors={colors} locations= {locations} style={styles.gradientRight} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
        <LinearGradient colors={colors} locations= {locations} style={styles.gradientBottomUp} start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.70 }} >
          <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={0.075}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFFAA"
              thumbTintColor="#FFFFFF"
              onValueChange={(value) => {setCamZoom(value)}}
            />
            {/* <Pressable style={styles.iconButton} onPress={toggleCameraType} >
                <Ionicons
                    name="camera-reverse-outline"
                    size={40}
                    color="white"
                />
            </Pressable> */}
            <View style={styles.buttonRow}>
              <View style={{flex:1}}/>
              <View style={{flex:1, justifyContent: 'center'}}>
                <Gallery />
              </View>
              <View style={{flex:1}}/>
              {showShutter()}
              <View style={{flex:1}}/>
              <View style={{flex:1, justifyContent: 'center'}}>
              <Pressable style={styles.iconButton} onPress={toggleCameraType} >
                <Ionicons
                    name="camera-reverse-outline"
                    size={40}
                    color="white"
                />
            </Pressable>
              </View>
              <View style={{flex:1}}/>
            </View>
          </LinearGradient>
        </Camera>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: 'center',
    },
    buttonRow: {
      flexDirection: 'row', 
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    camera: {
        flex: 10, 
        overflow: 'hidden',
        backgroundColor: 'transparent', 
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconButton: {
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'transparent',

    },
    slider: {
      position: 'absolute',
      bottom: 90,
      width: 200,
      height: 40,
    },
    shutterButton: {
      width: 70,
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 50,
      backgroundColor: 'transparent',
    },
    smallText: {
      fontSize: 12,
      color: 'white',
    },
    mediumText: {
      fontSize: 14,
      color: 'white',
    },
    largeText: {
      fontSize: 16,
      color: 'white',
    },
    gradientBottomUp: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '35%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradientTopDown: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '5%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradientLeft: {
      position: 'absolute',
      left: 0,
      width: '5%',
      height: '100%',
    },
    gradientRight: {
      position: 'absolute',
      right: 0,
      width: '5%',
      height: '100%',
    },
  });



  