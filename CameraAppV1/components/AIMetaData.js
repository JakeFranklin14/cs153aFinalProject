import React from 'react';
import { View, StyleSheet} from 'react-native';
import ExpandableValues from './ExpandableValues';

const metaData = () => {
  return (
    <View
      style={{flex:4,flexDirection: 'column'}}>
      <View style={{ flex: 0.2, backgroundColor: 'black' }} />
      <View style={{ flex: 2, backgroundColor: 'black'}}>
        <View
          style={styles.dataRow}>
          <View style={{ flex: 1 }}>
            <ExpandableValues name= 'Camera Type' />
          </View>
          <View style={{ flex: 1 }}>
            <ExpandableValues name= 'Weather' />
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
            <ExpandableValues name= 'Temperature' />
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
            <ExpandableValues name= 'Date' />
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
            <ExpandableValues name= 'Location' />
          </View>
          <View style={{ flex: 1 }}>
            <ExpandableValues name= 'Time' />
          </View>
        </View>
        <View style={{ flex: 2, alignItems: 'center'}}>
            <ExpandableValues name= 'AI' />
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
    color: 'white',
  },
});

export default metaData;