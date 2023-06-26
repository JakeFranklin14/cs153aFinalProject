import React, { useState, useEffect } from 'react';
import {Pressable, Text, Alert, StyleSheet, View } from 'react-native';


export default function AdjustableValues ({name}) {

    return (
    <View> 
        <Pressable style={styles.metadata} onPress={() => {Alert.alert('Adjustable ' + name + ' Pressed!')}}>
            <Text style={styles.text}>{name}:</Text>
        </Pressable>
    </View>
    );
};

const styles = StyleSheet.create({
    metadata: {
        color: 'white',
        alignSelf: 'left',
    },
    text: {
        fontSize: 10,
        color: 'black',
    },
  });

