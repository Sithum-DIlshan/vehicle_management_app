import { Input, Text, View, Box, VStack } from 'native-base'
import React from 'react'
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';


export default function Login() {
    const image = { uri: "" };


    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.imageArea}>
                <ImageBackground source={require('../assets/business-deal.png')} resizeMode={'contain'} style={styles.image}>
                </ImageBackground>
            </View>
            <View style={styles.inputArea}>
                <VStack space={29} style={styles.inputAreaInner}>
                    <Text color={'#223555'} fontWeight={'bold'} fontSize="5xl">Sign up</Text>
                    <Input size={'2xl'} variant="underlined" placeholder="Round" />
                    <Input size={'2xl'} variant="underlined" placeholder="Round" />
                    <Input size={'2xl'} variant="underlined" placeholder="Round" />
                </VStack>
            </View>
            <View style={styles.footer}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    imageArea: {
        flex: 2.8,
    },
    inputArea: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAreaInner: {
        flex: 1,
        width: '90%',
    },
    footer: {
        flex: 1.2,
        backgroundColor: 'blue'
    },
    image: {
        flex: 1
    }
});

