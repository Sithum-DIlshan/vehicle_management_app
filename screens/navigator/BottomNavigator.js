
import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddVehicle from '../AddVehicle';
import ViewVehicle from '../ViewVehicle';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="AddVehicle" component={AddVehicle} />
            <Tab.Screen name="View" component={ViewVehicle} />
        </Tab.Navigator>
    )
}