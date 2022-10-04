import { ImageBackground, Keyboard, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons/faAt'
import { faCar, faLocation, faLock, faPhone, faRegistered, faUpload, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { normalize } from '../function/responsiveText';
import { Actionsheet, Badge, Box, Button, Divider, HStack, Image, Input, Text, useDisclose, VStack } from 'native-base';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Files from '../assets/files.png';
import Camera from '../assets/camera.png';


export default function AddVehicle({ user }) {
    // console.log(user);
    const options = {
        includeBase64: true,
        mediaType: "photo",
        saveToPhotos: true,
        selectionLimit: 5,
        presentationStyle: 'pageSheet'
    }

    const [images, setImg] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);
    const [bottomHide, setBottomHide] = useState('flex');
    const [ownerName, setOwnerName] = useState('')
    const [ownerContact, setOwnerContact] = useState('')
    const [ownerAddress, setOwnerAddress] = useState('')
    const [chassiNO, setChassiNO] = useState('')
    const [registrationNO, setRegistrationNO] = useState('')
    const [imagesToUpload, setImagesToUpload] = useState([])



    const createFormData = (photos, body = {}) => {
        const data = new FormData();

        photos.map(photo => {
            data.append('photos', {
                name: photo.fileName,
                type: photo.type,
                uri: photo.uri,
            });
        })



        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });

        return data;
    };



    const openCamera = async () => {
        const result = await launchCamera(options);

        if (!result.didCancel) {
            // console.log(result.assets[0])
            imagesToUpload.push(result.assets[0]);
            images.push(result.assets[0].base64)
            setImageLoad(true);
        }
        // setImg(result.assets[0].path)
    }

    const openGallery = async () => {
        const result = await launchImageLibrary(options);

        if (!result.didCancel) {
            setImagesToUpload(result.assets)
            result.assets.map(rest => {
                imagesToUpload.push(rest)
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

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setBottomHide('none'); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setBottomHide('flex'); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };

    }, [])

    const saveVehicle = async () => {
        fetch('http://192.168.8.100:8080/user/vehicle', {
            method: 'POST',
            body: createFormData(imagesToUpload, {
                name: ownerName,
                contact: ownerContact,
                address: ownerAddress,
                chassi: chassiNO,
                registration: registrationNO,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log('response', response);
                setImagesToUpload([])
            })
            .catch((error) => {
                console.log('error', error);
            });

    }
    return (
        <View style={styles.view} justifyContent={'flex-start'} alignItems={'center'}>
            {/* <Badge colorScheme={"success"} alignSelf="center" variant={"subtle"}>{user.User.emailId}</Badge> */}
            <VStack mt={3} space={'2'} justifyContent="flex-start" alignItems={'center'} style={styles.inputAreaInner}>
                <Text color={'#223555'} fontWeight={'bold'} fontSize={normalize(20)}>Add Vehicle</Text>
                <Input onChangeText={(e) => setOwnerName(e)} value={ownerName} backgroundColor={'white'} InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faUser} style={styles.icon} />} style={styles.input} size={normalize(13)} variant="rounded" placeholder="Owner Name" />
                <Input onChangeText={(e) => setOwnerContact(e)} value={ownerContact} backgroundColor={'white'} InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faPhone} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Owner Contact" />
                <Input onChangeText={(e) => setOwnerAddress(e)} value={ownerAddress} backgroundColor={'white'} InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faLocation} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Owner Address" />
                <Input onChangeText={(e) => setChassiNO(e)} value={chassiNO} backgroundColor={'white'} InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faCar} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Vehicle Chassi-No" />
                <Input onChangeText={(e) => setRegistrationNO(e)} value={registrationNO} backgroundColor={'white'} InputLeftElement={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faRegistered} style={styles.icon} />} size={normalize(13)} variant="rounded" placeholder="Vehicle Registration-No" />
                <Button mt={3} borderRadius={10} bg={'#585e68'} startIcon={<FontAwesomeIcon size={normalize(13)} color='#f4f5f7' icon={faUpload} />} variant="outline" onPress={onOpen}><Text color={'#f4f5f7'}>Add Photos</Text></Button>

            </VStack>
            <VStack display={bottomHide} mt={normalize(25)} space={5}>
                <HStack height={normalize(60)} >
                    {/* <Image size={"md"} resizeMode="contain" source={{uri:'data:image/png;base64,'}} alt={"Alternate Text "} /> */}

                    {imageLoad && images.map(image => <Image key={image} size={normalize(60)} resizeMode="contain" source={{ uri: 'data:image/png;base64,' + image }} alt={"Alternate Text "} />)}
                </HStack>
                <Button onPress={saveVehicle} borderRadius={10} variant="solid" ><Text color={'#f4f5f7'}>Save Vehicle</Text></Button>

            </VStack>
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
