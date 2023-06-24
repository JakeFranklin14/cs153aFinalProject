import React, { useState, useEffect } from 'react';
import TabSelector from './components/TabSelector';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';


export default function App() {
  const [camPermission, requestCamPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

const getPermissions = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  setLocation(location);

  let { status2 } = await Camera.requestCameraPermissionsAsync();
  if (status2 !== 'granted') {
    setErrorMsg('Permission to access camera was denied');
    return;
  }

  let camera = await Camera.getCameraPermissionsAsync();
  requestCamPermission(camera);
};


  // useEffect(() => {
  //   (async () => {
      
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);

  //     let { status2 } = await Camera.requestCameraPermissionsAsync();
  //     if (status2 !== 'granted') {
  //       setErrorMsg('Permission to access camera was denied');
  //       return;
  //     }

  //     let camera = await Camera.getCameraPermissionsAsync();
  //     requestCamPermission(camera);
  //   })();
  // }, []);
  
  return (
    getPermissions(),
      <TabSelector/>
  );
}



