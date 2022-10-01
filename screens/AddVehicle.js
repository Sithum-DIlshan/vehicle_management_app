import { ImageBackground, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt'
import { faLock, faPhone, faUpload, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { normalize } from '../function/responsiveText';
import { Actionsheet, Box, Button, Divider, HStack, Image, Input, Text, useDisclose, VStack } from 'native-base';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Files from '../assets/files.png';
import Camera from '../assets/camera.png';


export default function AddVehicle() {
    const options = {
        includeBase64: true,
        mediaType: "photo",
        saveToPhotos: true,
        selectionLimit: 5,
        presentationStyle: 'pageSheet'
    }

    const [images, setImg] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);

    const openCamera = async () => {
        const result = await launchCamera(options);

        if(!result.didCancel){
            images.push(result.assets[0].base64)
            setImageLoad(true);
        }
        // setImg(result.assets[0].path)
    }

    const openGallery = async () => {
        const result = await launchImageLibrary(options);
       
        if(!result.didCancel){
            result.assets.map(rest => {
                images.push(rest.base64);
            })
            setImageLoad(true);
        }
        
    }

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();


    return (
        <View style={styles.view} justifyContent={'flex-start'} alignItems={'center'}>
            <VStack mt={3} space={'2'} justifyContent="flex-start" alignItems={'center'} style={styles.inputAreaInner}>
                <Text color={'#223555'} fontWeight={'bold'} fontSize={normalize(20)}>Add Vehicle</Text>
                <Input backgroundColor={'white'} InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faAt} style={styles.icon} />} style={styles.input} size={normalize(13)} variant="rounded" placeholder="Email ID" />
                <Input backgroundColor={'white'} InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faUserTie} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Full name" />
                <Input backgroundColor={'white'} InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faPhone} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Mobile" />
                <Input backgroundColor={'white'} type='password' InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faLock} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Password" />
                <Input backgroundColor={'white'} type='password' InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faLock} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Password" />
                <Button mt={3} bg={'#585e68'} startIcon={<FontAwesomeIcon size={normalize(13)} color='#f4f5f7' icon={faUpload} />} variant="outline" onPress={onOpen}><Text color={'#f4f5f7'}>Add Photos</Text></Button>

            </VStack>
            <HStack>
                {/* <Image size={"md"} resizeMode="contain" source={{uri:'data:image/png;base64,'}} alt={"Alternate Text "} /> */}
                {imageLoad && images.map(image => <Image key={image} size={"lg"} resizeMode="contain" source={{ uri: 'data:image/png;base64,' + image }} alt={"Alternate Text "} />)}
            </HStack>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item alignItems={'center'} startIcon={<Image size={normalize(27)} source={Camera} alt={""} />} onPress={openCamera}>Camera</Actionsheet.Item>
                    <Divider my={1} width={'70%'} />

                    <Actionsheet.Item alignItems={'center'} startIcon={<Image size={normalize(27)} source={Files} alt={""} />} onPress={openGallery}>Open</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff'
    },
    inputArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAreaInner: {
        flex: 0.8,
        width: '70%',
    },
    icon: {
        marginRight: 10,
        marginLeft: 20,
        borderRadius: 20
    },
})
