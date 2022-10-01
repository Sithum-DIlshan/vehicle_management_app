
import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddVehicle from '../AddVehicle';
import ViewVehicle from '../ViewVehicle';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen options={{ headerShown: false }}  name="AddVehicle" component={AddVehicle} />
            <Tab.Screen options={{ headerShown: false }}  name="View" component={ViewVehicle} />
        </Tab.Navigator>
    )
}