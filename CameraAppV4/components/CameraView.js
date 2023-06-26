import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, Alert, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from "@expo/vector-icons";
import Slider from '@react-native-community/slider';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as MediaLibrary from 'expo-media-library';
import { LinearGradient } from 'expo-linear-gradient';
import { easeGradient } from 'react-native-easing-gradient';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

const Gallery = () => {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  };
    return (
    <View> 
        <Pressable style={styles.gallery} onPress={pickImage}>
        <FontAwesome
            name="picture-o"
            size={18}
            color="white"
        />
            <Text style={styles.mediumText}>Gallery</Text>
        </Pressable>
    </View>
    );
};

const Selector = () => {
  return (
    <ScrollPicker
      dataSource={['Manual', 'Auto', 'AI']}
      selectedIndex={1}
      renderItem={(data) => {
        return (
          <View>
          <Text style={styles.mediumText}>{data}</Text>
        </View>
      );
      }}
      onValueChange={(data) => {
       Mode(data);
        }}
      wrapperHeight={72}
      wrapperWidth={30}
      wrapperColor='transparent'
      itemHeight={20}
      highlightColor='white'
      highlightBorderWidth={2}
    />
  );
};

export function Mode (cameraMode) {
  if (cameraMode == 'Auto Photo') {
    return (
    Alert.alert('Auto Photo Mode Selected')
    );
  } else if (cameraMode == 'Manual Photo') {
    return (
      Alert.alert('Manual Photo Mode Selected')
    );
  } else if (cameraMode == 'AI Photo') {
    return (
      Alert.alert('AI Photo Mode Selected')
    );
  }
}


export default function App() {
  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [camZoom, setCamZoom] = useState(0);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const takePicture= async () => {
    cameraRef.current.takePictureAsync({exif: true, quality: 1}).then(async (result) => {
      if (type == CameraType.front) {
        const manipResult = await manipulateAsync(
          result.localUri || result.uri,
          [ { flip: FlipType.Horizontal }],
          { compress: 1, format: SaveFormat.PNG }
        );
        MediaLibrary.saveToLibraryAsync(manipResult.uri);
      } else {
      MediaLibrary.saveToLibraryAsync(result.uri);
      }
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
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

    function toggleCameraType() {
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
  

    return (
      <View style={styles.container}>
        <Camera style={styles.camera} ref={cameraRef} type={type} zoom = {camZoom} >
        <LinearGradient 
          colors={colors} 
          locations= {locations}
          style={styles.gradientTopDown}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          />
          <LinearGradient
          colors={colors}
          locations= {locations}
          style={styles.gradientLeft}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          />
          <LinearGradient
          colors={colors}
          locations= {locations}
          style={styles.gradientRight}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          />
        <LinearGradient 
          colors={colors} 
          locations= {locations}
          style={styles.gradientBottomUp}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.70 }}
          >
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={0.075}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFFFFFAA"
                thumbTintColor="#FFFFFF"
                onValueChange={(value) => {setCamZoom(value)}}
            />
            <Pressable style={styles.iconButton} onPress={toggleCameraType} >
                <Ionicons
                    name="camera-reverse-outline"
                    size={40}
                    color="white"
                />
            </Pressable>
            <View style={styles.buttonRow}>
              <View style={{flex:1}}/>
              <View style={{flex:1, justifyContent: 'center'}}>
                <Gallery />
              </View>
              <View style={{flex:1}}/>
              <View style={{flex:1, justifyContent: 'center'}}>
                <Shutter />
              </View>
              <View style={{flex:1}}/>
              <View style={{flex:1, justifyContent: 'center'}}>
                <Selector />
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
        position: 'absolute',
        bottom: 90,
        right: 20,
    },
    slider: {
      position: 'absolute',
      bottom: 90,
      width: 200,
      height: 40,
    },
    gallery: {
      width: 55,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 5,
      borderColor: 'white',
      borderWidth: 2,
      backgroundColor: 'transparent',
      marginBottom: 15,
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
      marginBottom: 15,
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



  