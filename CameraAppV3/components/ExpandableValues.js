import React, { useState, useEffect } from 'react';
import { Pressable, Text, Alert, StyleSheet, View, TextInput } from 'react-native';
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


const Temperature = () => {

        const [temp,setTemp] = useState([]);
        const [lat,setLat] = useState([]);
        const [lon,setLon] = useState([]);
        const [loading,setLoading] = useState(true); 
        // const [town,setTown] = useState();
        // const [userState,setUserState] = useState();
        // const [country,setCountry] = useState();

        // const [locationVisible, setLocationVisible] = useState(false);

        // const handleOKDone = () => {
        //     setLocationVisible(false);
        // };
    
        // const getCoords = async () => {

        //     try {
        //       const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q='+town+','+userState+','+country+'&limit=5&appid=3de1557d927fe1ec9d0fe673f3654579');
        //       const json = await response.json();
        //       setLat(json.lat);
        //       setLon(json.lon);
        //     } catch (error) {
        //       console.error(error);
        //     } finally {
        //         getWeather();
        //     }
        //   };

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



export { Temperature };
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