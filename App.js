import SplashScreen from 'react-native-splash-screen'
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NativeBaseProvider, Button } from 'native-base';
import Login from './screens/Login';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

library.add(fab, faSquareCheck, faMugSaucer)


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