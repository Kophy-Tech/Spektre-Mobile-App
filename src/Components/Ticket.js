import React from 'react';
import { Text, HStack,  } from "native-base";
import { TouchableOpacity } from 'react-native';

export default function Ticket({ item, closeTicketSend, LoadingCloseTicket, IdLoaing, navigation }) {
    return (
        <HStack mt="0.5" mb="2" mx="2" p="0.5" justifyContent="space-between" alignItems='center'>
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
            {
                item?.status === 'OPEN' && <Text color="blue"
                    fontSize="xs"
                    textAlign="center"
                 
                    flex="1"

                    _dark={{
                        color: "warmGray.200"
                    }} fontWeight="400">
                    {item?.status}
                </Text>
            }
            {
                item?.status === 'CLOSED' && <Text 
                    style={{ color: "red" }}
                    fontSize="xs"
                    textAlign="center"
               
                    flex="1"

                    _dark={{
                        color: "warmGray.200"
                    }} fontWeight="400">
                    {item?.status}
                </Text>
            }
            <HStack
                flex="2"
                justifyContent='space-between'
            >
                <TouchableOpacity style={{
                    backgroundColor: 'blue',
                    padding: 4,
                    borderRadius: 10,
                    width: '45%',
                    justifyContent: 'center',
                    alignItems: 'center'

                }}
                onPress={()=>{
                    navigation.navigate('responseTicket', { id: item.id })
                }}
                >
                    <Text color="#fff"
                        fontSize="xs"

                        _dark={{
                            color: "warmGray.200"
                        }} fontWeight="400">
                        respond
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
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
                </TouchableOpacity>
            </HStack>
        </HStack>
    )
}
