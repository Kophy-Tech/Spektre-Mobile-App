import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, AspectRatio, Image, Center, Text } from "native-base";
const EmptyCardFile = () => {
  
    return (
        <Center>
            <Box w="95%" rounded="lg" my="1" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}

            >
                <Box w="100%" h="20">
                    <Box w="100%" alignItems="center" justifyContent="center">
                        <Image source={require('../images/empyfile.jpg')} alt="image" h="100%" w="100%" />

                    </Box>
           
                    <Center bg="blue.500" _dark={{
                        bg: "blue.400"
                    }} _text={{
                        color: "warmGray.50",
                        fontWeight: "400",
                        fontSize: 10
                    }} position="absolute" px="3" py="1.5">
                        <Text
                            color="#fff"
                            fontSize="xs"
                            _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400"
                        > Empty File</Text>
                    </Center>
                </Box>


            </Box>
        </Center>
    )
}

export default EmptyCardFile

const styles = StyleSheet.create({})