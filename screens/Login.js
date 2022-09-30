import { Input, Text, View, Box, VStack, Icon, Link, Button } from 'native-base'
import React, { useState } from 'react'
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt'
import { faLock, faPhone, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { normalize } from '../function/responsiveText';



export default function Login() {

    const [bottomHide, setBottomHide] = useState('flex');

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.imageArea}>
                <ImageBackground source={require('../assets/business-deal.png')} resizeMode={'center'} style={styles.image}>
                </ImageBackground>
            </View>
            <View style={styles.inputArea}>
                <VStack space={'2'} style={styles.inputAreaInner}>
                    <Text color={'#223555'} fontWeight={'bold'} fontSize={normalize(20)}>Sign up</Text>
                    <Input InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faAt} style={styles.icon} />} style={styles.input} size={normalize(13)} variant="rounded" placeholder="Email ID" onFocus={(e)=>setBottomHide('none')} />
                    <Input InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faUserTie} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Full name" />
                    <Input InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faPhone} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Mobile" />
                    <Input type='password' InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faLock} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Password" />
                </VStack>
                <Text color={'#71747a'} display={bottomHide} fontSize={normalize(10)}>By signing up, you're agree to the <Link href="https://nativebase.io" ><Text fontSize={normalize(10)} color="blue.400">
                    Terms & Condition

                </Text>
                </Link>  and <Link href="https://nativebase.io">
                    <Text fontSize={normalize(10)} color="blue.400">
                            Privacy Policy

                        </Text>

                    </Link></Text>
            </View>
            <View style={styles.footer} display={bottomHide}>
                <VStack alignItems={'center'} style={styles.footerInner}>
                    <Button style={styles.button} size="md" variant="solid" bg={'#0065ff'}>
                        CONTINUE
                    </Button>
                    <Text color={'#96a0af'} fontSize={normalize(12)} style={styles.loginText}>Joined us before? <Link onPress={() => alert('login')} isExternal _text={{
                        color: "blue.400"
                    }} mt={-0.5} _web={{
                        mb: -2
                    }}>
                        <Text fontSize={normalize(12)} color={'#0065ff'}>Login</Text>
                    </Link></Text>
                </VStack>

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
        width: '70%',
    },
    footer: {
        flex: 1.2,
    },
    image: {
        flex: 1
    },
    icon: {
        marginRight: 10,
        marginLeft:20,
        borderRadius: 20
    },
    footerInner: {
        flex: 1,
        paddingTop: 15
    },
    button: {
        width: '70%'
    },
    loginText: {
        position: 'absolute',
        bottom:0
    }
});

