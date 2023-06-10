import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MetaData from './MetaData';
import Shutter from './Shutter';
import ModeSelector from './ModeSelector';
import Gallery from './Gallery';

const App = () => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <MetaData />
      <View style={styles.tmpCamera}>
        <Text style={{fontSize:50}}>
          Insert Camera View Here
        </Text>
      </View>
      <View style={{flex:0.5, backgroundColor: 'lightgray'}}/>
      <View style={{flexDirection: 'row', backgroundColor: 'lightgray'}}>
        <View style={{flex:1}}/>
        <View style={{flex:1, justifyContent: 'space-evenly'}}>
          <Gallery />
        </View>
        <View style={{flex:1}}/>
        <View style={{flex:1}}>
          <Shutter />
        </View>
        <View style={{flex:1}}/>
        <View style={{flex:1, justifyContent: 'center'}}>
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
