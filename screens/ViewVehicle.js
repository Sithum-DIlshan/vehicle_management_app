import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Actionsheet, Box, Button, HStack, Image, Input, Text, useDisclose, VStack } from 'native-base';

export default function ViewVehicle() {
    return (
        <View style={styles.view}>

            <Image size={"xl"} resizeMode="cover" source={require('../assets/login-cover2.png')} alt={"Alternate Text "} />

        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff'
    }
})