import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import ManualMetaData from './ManualMetaData';
import AutoMetaData from './AutoMetaData';
import AIMetaData from './AIMetaData';
import CameraView from './CameraView';

const App = () => {
  return (
    <SafeAreaView style={styles.safe}>
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <View style={{ flex: 2, backgroundColor: 'black' }}>
        <AutoMetaData />
      </View>
      <CameraView />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;