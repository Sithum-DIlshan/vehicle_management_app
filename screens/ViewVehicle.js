import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Actionsheet, Button, Box, FlatList, HStack, Image, Input, ScrollView, Text, useDisclose, VStack } from 'native-base';
import { Avatar,  Card, Title, Paragraph } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { normalize } from '../function/responsiveText';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

import Swiper from 'react-native-swiper'


export default function ViewVehicle() {
    const extractKey = ({ images }) => images

    const [data, setData] = useState([])

    const [vehicles, setVehicles] = useState([])

    const loadData = () => {

        const URL = 'http://192.168.8.100:8080/user/vehicles?' + new URLSearchParams({ emailId: 'sithum@gmail.com' }).toString();
        fetch(URL)
            .then((response) => response.json())
            .then((response) => setVehicles(response))
        // .then(() => console.log(vehicles))

    }

    function deleteVehicle(chassi) {
        fetch('http://192.168.8.100:8080/user/vehicles', {
            method: 'DELETE',
            body: JSON.stringify({
                email:'sithum@gmail.com',
                chassiNo:chassi,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    useEffect(() => {
        loadData()

    })
    const LeftContent = props => <Avatar.Icon {...props} icon={<FontAwesomeIcon size={normalize(13)} color='#acb4c0' icon={faPhone} />} />


    renderItem = ({ item }) => {
        let images = [];
        if (item.images) {

            // console.log(item.images)
            images = item.images.map(image => {
                let path = image.path.toString();
                path = path.slice(7)
                // console.log(path) 
                return <Card.Cover key={image.path} source={{ uri: 'http://192.168.8.100:8080/' + path }} />
               
            })

        }

        return (
            <Card height={normalize(300)}>
                <Card.Title title={item.ownerName} subtitle={item.ownerAdrress} left={LeftContent} />
                <Card.Content>
                    <Paragraph>Contact - {item.ownerContact}</Paragraph>
                    <Paragraph>Registration No - {item.vehicleRegistrationNumber}</Paragraph>
                    <Paragraph>Chassi No - {item.vehicleChassiNumber}</Paragraph>
                </Card.Content>
                <Swiper height={normalize(400)} style={styles.wrapper} showsButtons={true}>

                    {/* <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
                                <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
                                <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} /> */}
                    {images}
                </Swiper>
                <Card.Actions>
                    <Button  variant='solid' borderRadius={15} colorScheme="secondary" onPress={()=>deleteVehicle(item.vehicleChassiNumber)} >Delete</Button>
                    {/* <Button>Ok</Button> */}
                </Card.Actions>

            </Card>
        )
    }

    return (
        <SafeAreaView  >
            {/* <ScrollView> */}
            <FlatList
                data={vehicles}
                renderItem={renderItem}
                keyExtractor={extractKey}

            //     <Card height={normalize(300)}>
            //         <Card.Title title={item.ownerName} subtitle={item.ownerAdrress} left={LeftContent} />
            //         <Card.Content>
            //             <Paragraph>Contact - {item.ownerContact}</Paragraph>
            //             <Paragraph>Registration No - {item.vehicleRegistrationNumber}</Paragraph>
            //             <Paragraph>Chassi No - {item.vehicleChassiNumber}</Paragraph>
            //         </Card.Content>
            //         <Swiper height={normalize(400)} style={styles.wrapper} showsButtons={true}>

            //             <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
            //             <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
            //             <Card.Cover source={{ uri: 'http://192.168.8.102:8080/uploads/82781ac5a19d3a320dac1cbc79046171' }} />
            //         </Swiper>
            //         <Card.Actions>
            //             <Button >Cancel</Button>
            //             <Button>Ok</Button>
            //         </Card.Actions>

            //     </Card>
            // }
            />

            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
        wrapper: {
            height: '30%'
        },
        slide1: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#9DD6EB'
        },
        slide2: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#97CAE5'
        },
        slide3: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#92BBD9'
        },
        text: {
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold'
        }
    }
})