import React from 'react';
import { View, StyleSheet} from 'react-native';
import ExpandableValues, { Temperature, Location, Weather, CameraDevice, AI, Time, Date } from './ExpandableValues';

const AutoMetaData = () => {
  return (
    <View
      style={{flex:2.5,flexDirection: 'column'}}>
      <View style={{ flex: 0.2, backgroundColor: 'black'}}/>
      <View style={{ flex: 2, backgroundColor: 'black'}}>
        <View
          style={styles.dataRow}>
          <View style={{ flex: 1 }}>
            <CameraDevice />
          </View>
          <View style={{ flex: 1 }}>
            <Weather />
          </View>
          <View style={{ flex: 1 }}>
            <ExpandableValues name= 'Scene Type' />
          </View>
        </View>
        <View
          style={styles.dataRow}>
          <View style={{ flex: 1 }}>
            <ExpandableValues name= 'ISO'/>
          </View>
          <View style={{ flex: 1 }}>
            <Temperature/>
          </View>
          <View style={{ flex: 1 }}>
            <ExpandableValues name= 'White Balance' />
          </View>
        </View>
        <View
          style={styles.dataRow}>
          <View style={{ flex: 1 }}>
            <ExpandableValues name= 'Exposure' />
          </View>
          <View style={{ flex: 1 }}>
            <Date/>
          </View>
          <View style={{ flex: 1 }}>
            <ExpandableValues name= 'Resolution' />
          </View>
        </View>
        <View
          style={styles.dataRow}>
          <View style={{ flex: 1 }}>
            <ExpandableValues name= 'Shutter Speed' />
          </View>
          <View style={{ flex: 1 }}>
            <Location/>
          </View>
          <View style={{ flex: 1 }}>
            <Time/>
          </View>
        </View>
        <View style={{ flex: 2, alignItems: 'center'}}>
            <AI/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataRow: {
    flex: 2,
    flexDirection: 'row',
  },
  text: {
    fontSize: 10,
    color: 'black',
  },
});

export default AutoMetaData;