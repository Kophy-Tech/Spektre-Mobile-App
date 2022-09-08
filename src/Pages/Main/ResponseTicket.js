import { StyleSheet, View, FlatList , TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Platform, PermissionsAndroid } from 'react-native'
import React from 'react'
import { Box, Heading, Text, Center, HStack, Stack, Button, Input, FormControl, Spinner, Avatar, Modal } from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import { useGetTicketQuery, useResponseTicketMutation } from '../../Redux/AuthApi'
import LoadingCard from '../../Components/Loading'
import ErrorCard from '../../Components/ErrorCard'
import ModalComponent from '../../Components/Modal';
import ResponseRender from './responseRender';

const ResponseTicket = ({route}) => {
    const id = route?.params?.id
    const projectManG= route?.params?.project?.assignment?.project?.project_manager
// console.log(projectManG ,' project manager')
    const { data:itemData, error, isLoading } = useGetTicketQuery({ id }, {
        // pollingInterval: 1000,
    })
   
 
    const [modalVisible, setModalVisible] = React.useState(false);

    const [responseTicket, { isLoading: responseLoading }] = useResponseTicketMutation()

    const [ text, setText] = React.useState('');
  

    const renderItem =({item})=> <ResponseRender item={item}/>

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
 <>
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
<Stack alignItems="center" mt="5">
<Avatar bg="#4dd3ff" source={{
                                uri:projectManG?.profile_picture
                        }}>
                         WK
                        </Avatar>
                        <Text color="#4dd3ff">Project Manager</Text>
</Stack>
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
                Project Manager:
              </Text>
              <Text color="coolGray.800"
                fontSize="xs"
                _dark={{
                  color: "warmGray.200"
                }} fontWeight="400">
                {projectManG?.first_name}   {projectManG?.last_name}
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

       <Box mb="1/2">
              <FlatList
                  data={itemData?.responses}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

                  ListHeaderComponentStyle={{
                      paddingBottom: 10
                  }}
              //   ListEmptyComponent={() => <EmptyCard />}
              />

       </Box>

       <HStack position="absolute" bottom="2" alignItems="center" justifyContent="space-between" mx="1">
                  <FormControl w="87%">
                    <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
                    <TextInput
                          value={text}
                          onChangeText={(text) => setText(text)}
                          style={{ backgroundColor: "#fff", borderRadius:20, borderWidth:1 }}
                        

                      />

                    </TouchableWithoutFeedback>
                    <Stack  position="absolute" right="2" top="2">
  <TouchableOpacity
 onPress={() => setModalVisible(!modalVisible)}
  >
  <Icon
                name="arrow-collapse-up"
                size={35}
                color='#4dd3ff'

               
            />
  </TouchableOpacity>

</Stack>
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
   </Box>
<Stack >
<ModalComponent modalVisible={modalVisible}  setModalVisible={setModalVisible}/>
</Stack>
 </>
  )
}

export default ResponseTicket

const styles = StyleSheet.create({
  
})