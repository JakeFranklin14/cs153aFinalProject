import React, { useState, useEffect } from 'react';
import { Pressable, Text, Alert, StyleSheet, View } from 'react-native';

import Dialog from "react-native-dialog";
import { manufacturer, modelName } from 'expo-device';
import moment from 'moment';

import { useValue } from "./CameraAppContext";
import Settings from './Settings';

const ExpandableValues = ({name}) => {
    return (
    <View> 
        <Pressable style={styles.metadata} onPress={() => Alert.alert('More ' + name + ' info')}>
            <Text style={styles.text}>{name}: N/A </Text>
        </Pressable>
    </View>
    );
};


const SettingsScreen = () => {
    return (
    <View> 
        <Pressable style={styles.metadata} onPress={() => {

            {GoSettings}
            console.log("GoSettings");
            }}>
            <Text style={styles.text}>Settings</Text>
        </Pressable>
    </View>
    );
};

function GoSettings () {
    return (
        <Settings/>
    );
};


const CameraDevice = () => {
    const [dialogVisible, setDialogVisible] = useState(false);


    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleOK = () => {
        setDialogVisible(false);
    };

    const correctGrammar = () => {
        if (modelName.charAt(0) === "a" ||
            modelName.charAt(0) === "e" || 
            modelName.charAt(0) === "i" || 
            modelName.charAt(0) === "o" || 
            modelName.charAt(0) === "u" ||
            modelName.charAt(0) === "A" ||
            modelName.charAt(0) === "E" ||
            modelName.charAt(0) === "I" ||
            modelName.charAt(0) === "O" ||
            modelName.charAt(0) === "U" ) {
            return "an " + modelName;
        } else {
            return "a " + modelName;
        }
    };

    return (
        <View>
            <Pressable style={styles.metadata} onPress={showDialog}>
                <Text style={styles.text}>Camera Type: {manufacturer} </Text>
            </Pressable>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Camera Info</Dialog.Title>
                <Dialog.Description>
                    You are using {correctGrammar()}.
                </Dialog.Description>
                <Dialog.Button label="OK" onPress={handleOK} />
            </Dialog.Container>
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

    const { currentValue } = useValue();

    const [regionName, setRegionName] = useState(null);

    useEffect(() => {
        setRegionName(currentValue.RegionContext);
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
                <Text style={styles.text}>Location: {regionName} </Text>
            </Pressable>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Location</Dialog.Title>
                <Dialog.Description>
                    Your location is {currentValue.latitudeContext} latitude and {currentValue.longitudeContext} longitude.
                </Dialog.Description>
                <Dialog.Button label="OK" onPress={handleOK} />
            </Dialog.Container>
        </View>
    );
};


const Temperature = () => {

    const [temp,setTemp] = useState([]);
    const [loading,setLoading] = useState(true); 
    const { currentValue } = useValue();

        const getTemperature = async () => {
        try {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + currentValue.latitudeContext + '&lon=' + currentValue.longitudeContext + '&appid=' + currentValue.WeatherContext + '&units=Imperial');
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

const Time = () => {
    const [time, setTime] = useState(moment().format('h:mm:ss a'));

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(moment().format('h:mm:ss a'));
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
    return (
        <View>
            <Pressable style={styles.metadata} onPress={() => Alert.alert('More Time info')}>
                <Text style={styles.text}>Time: {time} </Text>
            </Pressable>
        </View>
    );
};

const Date = () => {
    const date = moment().format('MM/DD/YY');
    return (
        <View>
            <Pressable style={styles.metadata} onPress={() => Alert.alert('More Date info')}>
                <Text style={styles.text}>Date: {date} </Text>
            </Pressable>
        </View>
    );
};




export { Temperature, Location, Weather, CameraDevice, AI, Time, Date, SettingsScreen };
export default ExpandableValues;

const styles = StyleSheet.create({
    metadata: {
        color: 'white',
        alignSelf: 'center',
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