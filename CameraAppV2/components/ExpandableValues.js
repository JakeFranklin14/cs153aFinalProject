import React, { useState } from 'react';
import { Pressable, Text, Alert, StyleSheet, View } from 'react-native';
import { getWeather, dailyForecast, showWeather, getLocation } from 'react-native-weather-api';
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

const Weather = () => {
    const [visible, setVisible] = useState(false);
    let temp;
    let wind;

    getWeather({
			
        key: "e0b4b0b0c0mshb0b0b0b0b0b0b0b0b0b0b0b0b0b0b0",
        city: "Newton",
        country: "USA"

    }).then(() => {
        let data = new showWeather();
        temp = data.temp;
        wind = data.wind;
        <Dialog.Container visible={visible}>
            <Dialog.Title>Weather</Dialog.Title>
            <Dialog.Description>
                <Text>Temperature: {temp}</Text>
                <Text>Wind: {wind}</Text>
            </Dialog.Description>
            <Dialog.Button label="OK" onPress={() => setVisible(false)} />
        </Dialog.Container>
    });
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