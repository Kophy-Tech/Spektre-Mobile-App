import { StyleSheet, Linking, Alert, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Box,  AspectRatio, Image,  Center, Text } from "native-base";
const CardFile = ({item}) => {
    const OpenUrl = React.useCallback(
        async (url) => {
            const supported = await Linking.canOpenURL(url);
            //  console.log(supported)
            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        },
      [],
    )
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
            <TouchableWithoutFeedback
                  onPress={() => OpenUrl(item.file)}
            >
                  <Box w="100%" h="40" >
                      <AspectRatio w="100%" h="100%" justifyContent="center" >
                          <Image source={require('../images/file.jpg')} alt="image" h="100%" w="120%" />
                      </AspectRatio>
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
                          > Document {item?.id}</Text>
                      </Center>
                  </Box>
          </TouchableWithoutFeedback>
              
             

          </Box>
   </Center>
  )
}

export default CardFile

const styles = StyleSheet.create({})