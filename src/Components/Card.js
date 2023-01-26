import React from 'react';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

import { Box, Heading , Text, Center, HStack, Stack } from "native-base";
import { TouchableOpacity } from 'react-native';
import moment from "moment";

export default function Card({item, navigation}) {

console.log(item)
const { width } = useWindowDimensions();
const source = {
    html: item?.description
  };
   
    return (

        <Center py="1" >
            <TouchableOpacity onPress={() => navigation.navigate('SingleAssignment', {id: item.id})} style={{width:'95%'}}>
                <Box alignItems="center" w="100%">
                    <Box w="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.300"
                    }} _web={{
                        shadow: 2,
                        borderWidth: 0
                    }} _light={{
                        backgroundColor: "gray.50"
                    }}>

                        <Stack p="3" space={3}>
                            <Stack>
                                <Heading size="md" >
                                    {item?.name}
                                </Heading>
                                {/* <RenderHtml
      contentWidth={width}
      source={source}
    /> */}

                            </Stack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text color="coolGray.800" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    Firmenname:
                                </Text>
                                <Text color="coolGray.800"
                                    fontSize="xs"
                                _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    {item?.company?.name}
                                </Text>
                            </HStack>
   
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text color="coolGray.800" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    Status:
                                </Text>
                                {
                                    item?.status === 'PENDING' && <Stack w="30%" bg="black" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="green.600">
                                        <Text fontWeight="400" color="white" fontSize="sm">
                                            {item?.status}
                                        </Text>
                                    </Stack>
                                }
                                {
                                    item?.status === 'ACTIVE' && <Stack w="30%" bg="yellow.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="yellow.600">
                                        <Text fontWeight="400" color="white" fontSize="sm">
                                      {item.status_display}
                                        </Text>
                                    </Stack>
                                }

                                {
                                    item?.status === 'COMPLETED' && <Stack w="30%" bg="green.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="green.600">
                                        <Text fontWeight="400" color="white" fontSize="sm">
                                        {item.status_display}
                                        </Text>
                                    </Stack>
                                }
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text color="coolGray.800" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                   Geplanten Stunden:
                                </Text>
                                <Text color="coolGray.800"
                                fontSize="xs"
                                _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                 {item?.work_hours}
                                </Text>
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text color="coolGray.800" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                  Montageumfang:
                                </Text>
                                <Text color="coolGray.800"
                                fontSize="xs"
                                _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                 {item?.working_scope}
                                </Text>
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontSize="xs" color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    Start : {moment(item?.start_date).format('DD.MM.YYYY')}
                                </Text>
                                <Text fontSize='xs' color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    Enddatum: {moment(item?.deadline).format('DD.MM.YYYY')}
                                </Text>
                            </HStack>
                        </Stack>
                    </Box>
                </Box>
           </TouchableOpacity>
            
          
        </Center>
    );
}
