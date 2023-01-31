import React from 'react';
import { Text, HStack, Stack, Avatar, } from "native-base";
import { TouchableOpacity } from 'react-native';

export default function Ticket({ item, closeTicketSend, LoadingCloseTicket, IdLoaing, navigation }) {
    // console.log(item?.responsible_person, 'from ticket')
    // console.log(item?.opener, 'opener ticket')

    return (
        <HStack mt="0.5" mb="2" mx="2" p="0.5" justifyContent="space-between" alignItems='center'>
       <Text color="coolGray.600"
                fontSize="xs"
                flex="1"
                justifyItems="flex-start"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="400">
                {item?.id}
            </Text>

            <Text color="coolGray.600"
                fontSize="xs"
                flex="1"
                justifyItems="flex-start"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="400">
                {item?.issue.slice(0, 10)}..
            </Text>
            <Text color="coolGray.600"
                fontSize="xs"
                flex="1"
             textAlign="center"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="400">
                            {item?.opener?.first_name}

            </Text>
            <Text color="coolGray.600"
                fontSize="xs"
                flex="1"
                textAlign="left"
                _dark={{
                    color: "warmGray.200"
                }} fontWeight="400">
                {item?.responsible_person?.first_name}

            </Text>
            {
                item?.status === 'OPEN' && <Text color="green.900"
                    fontSize="md"
                    textAlign="left"
                 
                    flex="1"

                    _dark={{
                        color: "warmGray.200"
                    }} fontWeight="400">
                   Aktiv
                </Text>
            }
            {
                item?.status === 'CLOSED' && <Text 
                    style={{ color: "red" }}
                    fontSize="sm"
                    textAlign="left"
               
                    flex="1"

                    _dark={{
                        color: "warmGray.200"
                    }} fontWeight="400">
                   Abgeschlossen
                </Text>
            }
            <Stack
                flex="1"
                w="100%"
                // justifyContent='space-between'
                justifyContent='center'
            >
                <TouchableOpacity style={{
                    backgroundColor: '#4dd3ff',
                    padding: 4,
                    borderRadius: 10,
                    width: '95%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    justifyItems:'center'

                }}
                onPress={()=>{
                    navigation.navigate('responseTicket', { id: item.id })
                }}
                >
                    <Text color="#fff"
                        fontSize={10}

                        _dark={{
                            color: "warmGray.200"
                        }} fontWeight="400">
                        antworten
                    </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={{
                        backgroundColor: '#4dd3ff',
                        padding: 4,
                        borderRadius: 10,
                        width: '45%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => closeTicketSend({idProps:item.id,status:item?.status })}
                >
                    <Text color="#fff"
                        fontSize="xs"
                        _dark={{
                            color: "#fff"
                        }} fontWeight="400">

                            {
                            LoadingCloseTicket && IdLoaing ==item.id?' ...':' close'
                            }
                      
                    </Text>
                </TouchableOpacity> */}
            </Stack>
        </HStack>
    )
}
