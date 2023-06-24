import React, { useState, useEffect } from 'react';
import TabSelector from './TabSelector';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Keys from './Keys';


export default function App() {
  const [camPermission, requestCamPermission] = Camera.useCameraPermissions();
  const [location, setLocation] = useState(null);

  const keyData = { AIContext: '', WeatherContext:  ''};

  const getData = async () => {
    try {
    // the '@profile_info' can be any string
    const jsonValue = await AsyncStorage.getItem("APIkey");
    let data = null;
    if (jsonValue != null) {
        data = JSON.parse(jsonValue);
        setCurrentKey({ AIContext: data.AIKey, WeatherContext: data.WeatherKey });
        console.log("just set APIkey");
    } else {
        console.log("just read a null value from Storage");
        // this happens the first time the app is loaded
        // as there is nothing in storage...
        setCurrentKey({ AIContext: "", WeatherContext: "" })
    }
    } catch (e) {
    console.log("error in getData ");
    // this shouldn't happen, but its good practice
    // to check for errors!
    console.dir(e);
    // error reading value
    }
};


  useEffect(() => {
    (async () => {

      if (!camPermission) {
        return <View />;
      }
    
      if (!camPermission.granted) {
        return (
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestCamPermission} title="grant permission" />
          </View>
        );
      }
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      getData();

    })();
  }, []);
  
  return (
    <Keys value={keyData}>
        <TabSelector/>
    </Keys>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
  },
});
