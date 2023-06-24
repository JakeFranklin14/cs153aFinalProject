import React, { useState, useEffect } from 'react';
import { Pressable, Text, Alert, StyleSheet, View } from 'react-native';
import Dialog from "react-native-dialog";
import { getCurrentPositionAsync } from 'expo-location';
import * as Device from 'expo-device';

const ExpandableValues = ({name}) => {
    return (
    <View> 
        <Pressable style={styles.metadata} onPress={() => Alert.alert('More ' + name + ' info')}>
            <Text style={styles.text}>{name}:</Text>
        </Pressable>
    </View>
    );
};

const CameraDevice = () => {
    return (
        <View>
            <Pressable style={styles.metadata} onPress={() => Alert.alert('More Camera Type info')}>
                <Text style={styles.text}>Camera Type: {Device.manufacturer}</Text>
            </Pressable>
        </View>
    );
};

const AI = () => {
    return (
        <View>
            <Pressable style={styles.metadata} onPress={() => Alert.alert('More AI info')}>
                <Text style={styles.text}>AI: </Text>
            </Pressable>
        </View>
    );
};


const Location = () => {

    const [regionName, setRegionName] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        (async () => {
            let getLocation = await getCurrentPositionAsync({});
            setLatitude(getLocation.coords.latitude);
            setLongitude(getLocation.coords.longitude);
            getCity();
        })();
    }, []);
    
    const getCity = async () => {
        let response = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + latitude + '&longitude=' + longitude + '&localityLanguage=en');
        let json = await response.json();
        setRegionName(json.locality);
    };


    const [dialogVisible, setDialogVisible] = useState(false);


    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleOK = () => {
        setDialogVisible(false);
    };

    return (
        <View>
            <Pressable style={styles.metadata} onPress={showDialog}>
                <Text style={styles.text}>Location: {regionName} </Text>
            </Pressable>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Location</Dialog.Title>
                <Dialog.Description>
                    Your location is {latitude} latitude and {longitude} longitude.
                </Dialog.Description>
                <Dialog.Button label="OK" onPress={handleOK} />
            </Dialog.Container>
        </View>
    );
};


const Temperature = () => {

    const [temp,setTemp] = useState([]);
    const [loading,setLoading] = useState(true); 

        const getTemperature = async () => {
        try {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=42.3&lon=-71.2&appid=3de1557d927fe1ec9d0fe673f3654579&units=Imperial');
            const json = await response.json();
            setTemp(json.main.temp);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        useEffect(() => {
        getTemperature();
        }, []);


    const [dialogVisible, setDialogVisible] = useState(false);


    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleOK = () => {
        setDialogVisible(false);
    };

    return (
        <View>
            <Pressable style={styles.metadata} onPress={showDialog}>
                <Text style={styles.text}>Temperature: {temp} °F</Text>
            </Pressable>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Temperature</Dialog.Title>
                <Dialog.Description>
                    It is {temp} degrees Fahrenheit.
                </Dialog.Description>
                <Dialog.Button label="OK" onPress={handleOK} />
            </Dialog.Container>
        </View>
    );
};

const Weather = () => {

    const [weather,setWeather] = useState([]);
    const [loading,setLoading] = useState(true); 

      const getWeather = async () => {
        try {
          const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=42.3&lon=-71.2&appid=3de1557d927fe1ec9d0fe673f3654579&units=Imperial');
          const json = await response.json();
          setWeather(json.weather[0]);

        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
      };

      useEffect(() => {
        getWeather();
        }, []);


const [dialogVisible, setDialogVisible] = useState(false);


const showDialog = () => {
    setDialogVisible(true);
};

const handleOK = () => {
    setDialogVisible(false);
};

return (
    <View>
        <Pressable style={styles.metadata} onPress={showDialog}>
            <Text style={styles.text}>Weather: {weather.main}</Text>
        </Pressable>
        <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>Weather</Dialog.Title>
            <Dialog.Description>
                The weather description is {weather.description}.
            </Dialog.Description>
            <Dialog.Button label="OK" onPress={handleOK} />
        </Dialog.Container>
    </View>
);
};



export { Temperature, Location, Weather, CameraDevice, AI };
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
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 20,
    },
  });