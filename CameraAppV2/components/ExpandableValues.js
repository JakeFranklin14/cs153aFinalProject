import React, { useState } from 'react';
import { Pressable, Text, Alert, StyleSheet, View } from 'react-native';
import Dialog from "react-native-dialog";

const ExpandableValues = ({name}) => {
    return (
    <View> 
        <Pressable style={styles.metadata} onPress={() => Alert.alert('More ' + name + ' info')}>
            <Text style={styles.text}>{name}:</Text>
        </Pressable>
    </View>
    );
};



export default ExpandableValues;

const styles = StyleSheet.create({
    metadata: {
        color: 'white',
        alignSelf: 'left',
    },
    text: {
        fontSize: 10,
        color: 'white',
    },
  });