import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, AspectRatio, Image, Center, Text } from "native-base";
const EmptyCardFile = () => {
  
    return (
        <Center>
            <Box w="95%"  rounded="lg" my="1" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}

            >
                <Box w="100%" h="20" justifyContent="center" alignItems='center'>
                  
           
                <Text
                            color="#000"
                            fontSize="lg"
                            _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400"
                        > Empty File</Text>
                </Box>


            </Box>
        </Center>
    )
}

export default EmptyCardFile

const styles = StyleSheet.create({})