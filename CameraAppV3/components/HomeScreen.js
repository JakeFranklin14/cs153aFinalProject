import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import ManualMetaData from './ManualMetaData';
import AutoMetaData from './AutoMetaData';
import AIMetaData from './AIMetaData';
import Shutter from './Shutter';
import Gallery from './Gallery';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import CameraView from './CameraView';
import { useKey } from './Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Selector = () => {
  return (
    <ScrollPicker
      dataSource={['Manual Photo', 'Auto Photo', 'AI Photo']}
      selectedIndex={1}
      renderItem={(data) => {
        return (
          <View>
          <Text style={styles.smallText}>{data}</Text>
        </View>
      );
      }}
      onValueChange={(data) => {
       Mode(data);
        }}
      wrapperHeight={75}
      wrapperWidth={100}
      wrapperColor='black'
      itemHeight={30}
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

const App = () => {

  const {setCurrentKey} = useKey();

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
        setAIkey("");
        setWeatherKey("");
    }
    } catch (e) {
    console.log("error in getData ");
    // this shouldn't happen, but its good practice
    // to check for errors!
    console.dir(e);
    // error reading value
    }
};

  useEffect(() => {getData()},[])

  return (
    <SafeAreaView style={styles.safe}>
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <AutoMetaData />
      <CameraView />
      <View style={{flex:0.5, backgroundColor: 'black'}}/>
      <View style={{flexDirection: 'row', backgroundColor: 'black'}}>
        <View style={{flex:1}}/>
        <View style={{flex:2, justifyContent: 'space-evenly'}}>
          <Gallery />
        </View>
        <View style={{flex:1}}/>
        <View style={{flex:1}}>
          <Shutter />
        </View>
        <View style={{flex:1.2}}/>
        <View style={{flex:1.8, justifyContent: 'center'}}>
          <Selector />
        </View>
        <View style={{flex:1}}/>
      </View>
      <View style={{flex:0.5, backgroundColor: 'black'}}/>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 0,
    backgroundColor: 'black',
  },
  tmpCamera: {
    flex: 10, 
    backgroundColor: 'white', 
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  largeText: {
    fontSize: 16,
    color: 'white',
  },
  smallText: {
    fontSize: 12,
    color: 'white',
  },
  safe: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;