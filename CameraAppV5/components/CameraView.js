// Built In Imports
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

// Camera View Imports
import { Camera, CameraType } from 'expo-camera';
import Slider from '@react-native-community/slider';
import * as MediaLibrary from 'expo-media-library';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

// Styling Imports
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';

// Custom Component Imports
import Gallery from './Gallery';

export default function App() {
  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [camZoom, setCamZoom] = useState(0);
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
        const manipResult = await manipulateAsync(
          result.localUri || result.uri,
          [ ],
          { compress: 1, format: SaveFormat.PNG }
        );
        MediaLibrary.saveToLibraryAsync(manipResult.uri);
        setUri(manipResult.uri);
      }
      setShutterView(true);
      Haptics.selectionAsync();
    });
  }

    function toggleCameraType() {
      Haptics.selectionAsync();
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const Shutter = () => {
      return (
      <View> 
        <Pressable style={styles.iconButton} onPress={takePicture} >
          <MaterialCommunityIcons
              name="camera-iris"
              size={60}
              color="white"
          />
        </Pressable>
      </View>
      );
  };
  
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
        <View style={styles.solidBottom} >
          <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={0.075}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFFAA"
              thumbTintColor="#FFFFFF"
              onValueChange={(value) => {setCamZoom(value)}}
            />
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
                    name="camera-reverse"
                    size={45}
                    color="white"
                />
            </Pressable>
              </View>
              <View style={{flex:1}}/>
            </View>
          </View>
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
      bottom: 100,
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
    solidBottom: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '14%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
  });



  