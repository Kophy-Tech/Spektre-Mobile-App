import React from 'react';


import { Box, Heading , Text, Center, HStack, Stack } from "native-base";
import { TouchableOpacity } from 'react-native';
export default function Card({item, navigation}) {


  
   
    return (

        <Center py="1" >
            <TouchableOpacity onPress={() => navigation.navigate('SingleAssignment', {id: item.id})} style={{width:'95%'}}>
                <Box alignItems="center" w="100%">
                    <Box w="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700"
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
                                <Text fontWeight="400" pt="1" color="blue.800">
                                    {item?.description.slice(0, 30)}
                                </Text>

                            </Stack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text color="coolGray.800" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    Company Name:
                                </Text>
                                <Text color="coolGray.800"
                                    fontSize="xs"
                                _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    {item.project?.project_manager.company.name}
                                </Text>
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text color="coolGray.800" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    Project Manager:
                                </Text>
                                <Text color="coolGray.800"
                                fontSize="xs"
                                _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    {item.project?.project_manager.first_name}   {item.project?.project_manager.last_name}
                                </Text>
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text color="coolGray.800" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    Status:
                                </Text>
                                {
                                    item?.status === 'PENDING' && <Stack w="20" bg="green.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="green.600">
                                        <Text fontWeight="400" color="white">
                                            {item?.status}
                                        </Text>
                                    </Stack>
                                }
                                {
                                    item?.status === 'ACTIVE' && <Stack w="20" bg="yellow.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="yellow.600">
                                        <Text fontWeight="400" color="white">
                                            {item?.status}
                                        </Text>
                                    </Stack>
                                }

                                {
                                    item?.status === 'COMPLETED' && <Stack w="20" bg="red.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="red.600">
                                        <Text fontWeight="400" color="white">
                                            {item?.status}
                                        </Text>
                                    </Stack>
                                }
                            </HStack>

                            <HStack alignItems="center" justifyContent="space-between">
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    Start Time: {item?.start_date}
                                </Text>
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    Deadline: {item?.deadline}
                                </Text>
                            </HStack>
                        </Stack>
                    </Box>
                </Box>
           </TouchableOpacity>
            
          
        </Center>
    );
}