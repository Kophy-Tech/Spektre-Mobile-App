import { StyleSheet, View, FlatList , TextInput, TouchableWithoutFeedback,  Keyboard,} from 'react-native'
import React from 'react'
import { Box, Heading, Text, Center, HStack, Stack, Button, Input, FormControl, Spinner, Avatar } from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import { useGetTicketQuery, useResponseTicketMutation } from '../../Redux/AuthApi'
import LoadingCard from '../../Components/Loading'
import ErrorCard from '../../Components/ErrorCard'
const ResponseTicket = ({route}) => {
    const id = route?.params?.id
    const { data:itemData, error, isLoading } = useGetTicketQuery({ id }, {
        pollingInterval: 1000,
    })
    const [responseTicket, { isLoading: responseLoading }] = useResponseTicketMutation()

    const [ text, setText] = React.useState('');
    // console.log(itemData?.responses?.length, 'from item')

    const renderItem =({item})=>{
        return(
            <Box w="100%">
                {
                    item?.writer?.type !== 'WORKER' && 
                    <Stack px="2" alignItems="flex-end" my="1">
                            <HStack alignItems="center">
                                <Text color="black"
                                    fontSize="md"
                                    pr="3"
                                    _dark={{
                                        color: "warmGray.200"
                                    }} fontWeight="700">
                                    {
                                        item?.writer?.first_name
                                    }
                                </Text>
                                <Avatar bg="#4dd3ff" source={{
                                    uri: item?.writer?.profile_picture
                                }}>
                                    AJ
                                </Avatar>
                             
                            </HStack>
                            <Stack py="2">

                                <Text color="coolGray.700" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="700">
                                    {
                                        item?.text
                                    }
                                </Text>
                                <Text color="coolGray.600"
                                    fontSize="xs"

                                 _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    {
                                        moment(item?.date_created).format( 'MMMM Do YYYY, h:mm:ss a')
                                }
                                </Text>

                            </Stack>
                    </Stack>
                }
               
         {
                    item?.writer?.type === 'WORKER' && 
                    <Stack px="2" my="1" >
                        <HStack alignItems="center">
                            <Avatar bg="#4dd3ff" source={{
                                    uri: item?.writer?.profile_picture
                            }}>
                             WK
                            </Avatar>
                            <Text color="black"
                                fontSize="md"
                            pl="3"
                            _dark={{
                                color: "warmGray.200"
                            }} fontWeight="700">
                             {
                                    item?.writer?.first_name 
                             }
                            </Text>
                      </HStack>
                        <Stack py="2">

                                <Text color="coolGray.700" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="700">
                              {
                                    item?.text 
                              }
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                               {
                                        moment(item?.date_created).format('MMMM Do YYYY, h:mm:ss a')

                               }
                            </Text>

                        </Stack>
                    </Stack>
         }

            </Box>
        )
    }
    const submitData = async () => {
 const data = {
    ticket:id,
    text

 }
        try {
            const user = await responseTicket(data).unwrap()
            // console.log(user);
        
 setText('')
        } catch (error) {
            console.log(error)
            if (!error?.status) {
                Alert.alert('No Server Response')
            }
            else if (error.status === 400) {
                Alert.alert(error.data.non_field_errors[0])

            }
            else if (error.status === 405) {
                Alert.alert(error.data.detail)


            } else {
                Alert.alert('error')


            }
        }

    }
    console.log(error)
//  console.log(item)
    if (isLoading) {
        return <LoadingCard />
    }
    if (error) {
        if (!error?.status) {
         
            return <ErrorCard errormsg='No Server Response' />
        }
        else if (error.status === 400) {
            return <ErrorCard errormsg={error?.data?.detail} />

        }
        else if (error.status === 401) {
            return <ErrorCard errormsg='Unauthorized' />

           


        } else {
            return <ErrorCard errormsg='Error' />

           


        }
       
    }
  return (
      <Box flex="1" bg="#fff" >
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
                          {itemData?.issue}
                      </Heading>
                    

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
                          {itemData?.opener?.company?.name}
                      </Text>
                  </HStack>
                  <HStack alignItems="center" justifyContent="space-between">
                      <Text color="coolGray.800" _dark={{
                          color: "warmGray.200"
                      }} fontWeight="400">
                          Status:
                      </Text>
                      {
                          itemData?.status === 'OPEN' && <Stack w="20" bg="white" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="green.600">
                              <Text fontWeight="400" color="black">
                                  {itemData?.status}
                              </Text>
                          </Stack>
                      }
                    

                      {
                          itemData?.status === 'CLOSE' && <Stack w="20" bg="green.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="red.600">
                              <Text fontWeight="400" color="white" style={{
                                  fontSize: 12
                              }}>
                                  {itemData?.status}
                              </Text>
                          </Stack>
                      }
                  </HStack>

                  <HStack alignItems="center" justifyContent="space-between">
                      <Text color="coolGray.600" _dark={{
                          color: "warmGray.200"
                      }} fontWeight="400">

                          Date Created:{
                              moment(itemData?.date_created).format('MMMM Do YYYY, h:mm:ss a')

                          }
                      </Text>
                   
                  </HStack>
              </Stack>
          </Box>

       <Box mb="20">
              <FlatList
                  data={itemData?.responses}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  ListHeaderComponentStyle={{
                      paddingBottom: 10
                  }}
              //   ListEmptyComponent={() => <EmptyCard />}
              />

       </Box>

{
              itemData?.status === 'OPEN' && <HStack position="absolute" bottom="2" alignItems="center" justifyContent="space-between" mx="1">
                  <FormControl w="87%">
                    <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
                    <TextInput
                          value={text}
                          onChangeText={(text) => setText(text)}
                          style={{ backgroundColor: "#fff", borderRadius:20, borderWidth:1 }}
                        

                      />

                    </TouchableWithoutFeedback>
                    
                  </FormControl>
                 
              {
                     !responseLoading && <Button
                          w="13%"
                          alignItems="center" justifyContent="center"
                          disabled={!text}
                          onPress={submitData}
                          style={{ backgroundColor: 'transparent' }}>
                          <Icon
                              name="send"
                              size={24}
                              color='#4dd3ff'


                          />
                      </Button>
              }

                  {responseLoading &&               <Spinner accessibilityLabel="Loading posts" color="blue" />     }
              </HStack>
} 
        
   </Box>
  )
}

export default ResponseTicket

const styles = StyleSheet.create({})