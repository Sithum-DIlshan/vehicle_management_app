import SplashScreen from 'react-native-splash-screen'
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NativeBaseProvider, Button } from 'native-base';
import Login from './screens/Login';

export default function App() {

  useEffect(()=>{
    SplashScreen.hide();
  });

  return (
    <NativeBaseProvider>
          <Login/>
    </NativeBaseProvider>
  )
}