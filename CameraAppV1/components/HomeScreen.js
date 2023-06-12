import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import ManualMetaData from './ManualMetaData';
import AutoMetaData from './AutoMetaData';
import AIMetaData from './AIMetaData';
import Shutter from './Shutter';
import ModeSelector from './ModeSelector';
import Gallery from './Gallery';

export function Mode (props) {
  if (props == 'Auto Photo') {
    return (
    Alert.alert('Auto Photo Mode Selected'),
    MetaData = <AutoMetaData/>
    );
  } else if (props == 'Manual Photo') {
    return (
      Alert.alert('Manual Photo Mode Selected'),
      MetaData = <ManualMetaData/>
    );
  } else if (props == 'AI Photo') {
    return (
      Alert.alert('AI Photo Mode Selected'),
      MetaData = <AIMetaData/>
    );
  }
}


const App = () => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <ManualMetaData/>
      <View style={styles.tmpCamera}>
        <Text style={{fontSize:50}}>
          Insert Camera View Here
        </Text>
      </View>
      <View style={{flex:0.5, backgroundColor: 'lightgray'}}/>
      <View style={{flexDirection: 'row', backgroundColor: 'lightgray'}}>
        <View style={{flex:1}}/>
        <View style={{flex:2, justifyContent: 'space-evenly'}}>
          <Gallery />
        </View>
        <View style={{flex:1}}/>
        <View style={{flex:1}}>
          <Shutter />
        </View>
        <View style={{flex:1}}/>
        <View style={{flex:2, justifyContent: 'center'}}>
          <ModeSelector />
        </View>
        <View style={{flex:1}}/>
      </View>
      <View style={{flex:0.5, backgroundColor: 'lightgray'}}/>
    </View>
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
    borderWidth: 10, 
    borderColor: 'blue', 
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default App;
