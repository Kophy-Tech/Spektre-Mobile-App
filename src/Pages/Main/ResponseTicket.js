import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Box, Heading, Text, Center, HStack, Stack, Button, Input, FormControl, Spinner } from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useGetTicketQuery, useResponseTicketMutation } from '../../Redux/AuthApi'
import LoadingCard from '../../Components/Loading'
import ErrorCard from '../../Components/ErrorCard'
const ResponseTicket = ({route}) => {
    const id = route?.params?.id
    const { data:item, error, isLoading } = useGetTicketQuery({ id })
    const [responseTicket, { isLoading: responseLoading }] = useResponseTicketMutation()

    const [ text, setText] = React.useState('');


    const submitData = async () => {
 const data = {
    ticket:id,
    text

 }
        try {
            const user = await responseTicket(data).unwrap()
            console.log(user);
        
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
 console.log(item)
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
   <Box flex="1">
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
                          {item?.issue}
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
                      {item?.opener?.company?.name}
                      </Text>
                  </HStack>
                  <HStack alignItems="center" justifyContent="space-between">
                      <Text color="coolGray.800" _dark={{
                          color: "warmGray.200"
                      }} fontWeight="400">
                          Status:
                      </Text>
                      {
                          item?.status === 'OPEN' && <Stack w="20" bg="white" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="green.600">
                              <Text fontWeight="400" color="black">
                                  {item?.status}
                              </Text>
                          </Stack>
                      }
                    

                      {
                          item?.status === 'CLOSE' && <Stack w="20" bg="green.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="red.600">
                              <Text fontWeight="400" color="white" style={{
                                  fontSize: 12
                              }}>
                                  {item?.status}
                              </Text>
                          </Stack>
                      }
                  </HStack>

                  <HStack alignItems="center" justifyContent="space-between">
                      <Text color="coolGray.600" _dark={{
                          color: "warmGray.200"
                      }} fontWeight="400">
                        Date Created:{item?.date_created}
                      </Text>
                   
                  </HStack>
              </Stack>
          </Box>



{
              item?.status === 'OPEN' && <HStack position="absolute" bottom="0" alignItems="center" justifyContent="space-between">
                  <FormControl w="86%">
                      <Input
                          value={text}
                          onChangeText={(text) => setText(text)}
                          style={{ backgroundColor: "#fff" }}
                          fontSize="md"

                      />

                  </FormControl>
                  {
                      text === '' && !responseLoading&& <Button
                          disabled={!text}
                          onPress={() => console.log('heloo')}
                          style={{ backgroundColor: 'transparent' }}>
                      <Text color="black"> typ..</Text>
                      </Button>

                  }
              {
                      text &&  !responseLoading && <Button
                          disabled={!text}
                          onPress={submitData}
                          style={{ backgroundColor: 'transparent' }}>
                          <Icon
                              name="send"
                              size={35}
                              color='black'


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