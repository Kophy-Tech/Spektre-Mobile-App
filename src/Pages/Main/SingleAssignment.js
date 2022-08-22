import { StyleSheet, View, FlatList , Alert} from 'react-native'
import React from 'react'
import ErrorCard from '../../Components/ErrorCard';
import { useRoute } from '@react-navigation/native';
import { Box, Heading, Text, Center, HStack, Stack, Button } from "native-base";
import LoadingCard from '../../Components/Loading';
import { useSelector } from 'react-redux';
import {useChangeAsignStatusMutation, useGetAsignQuery } from '../../Redux/AuthApi';
import CardFile from '../../Components/CardFile';
import EmptyCardFile from '../../Components/EmptyCardFile';
import SpinnerLoad from '../../Components/Spinner';
export default function SingleAssignment() {
    const token = useSelector((auth) => auth.auth.token)
   const route = useRoute();
  const [changeAsignStatus, { isLoading:Loadingstatus }] =useChangeAsignStatusMutation()

const id = route?.params?.id
console.log(id)

    const { data:itemData, error, isLoading } = useGetAsignQuery({token,id})
 console.log(error)
 const updateStatus = ()=>{
   Alert.alert(
     "Are you sure you want to update the status?",
     "",
     [

       {
         text: "Cancel",
         onPress: () => console.log("Cancel Pressed"),
         style: "cancel"
       },
       {
         text: "OK", onPress: async(data) => {
           const updateData = {
             status: data
           }
           const updateId = {
             token, id,
             updateData
           }
           try {
             const user = await changeAsignStatus(updateId).unwrap()
             console.log(user?.status);
         

           } catch (error) {
             console.log(error.data)
             Alert.alert(error.data.non_field_errors[0])
           }
         }
       }
     ]
   );
 }
 const renderItem =({item })=> <CardFile item={item}/>
   
  if (isLoading) {
        return <LoadingCard />
    }
    if (error) {
        return <ErrorCard errormsg={error?.data?.detail} />
    }
  return (
    <Box  bg="#fff" flex="1">
   <Center>

        <Box w="95%" my="4" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
                {itemData?.name}
              </Heading>
              <Text fontWeight="400" pt="1" color="blue.800">
                {itemData?.description}
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
                {itemData.project?.project_manager.company.name}
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
                {itemData.project?.project_manager.first_name}   {itemData.project?.project_manager.last_name}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text color="coolGray.800" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                Status:
              </Text>
              {
                itemData?.status === 'PENDING' && <Stack w="20" bg="green.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="green.600">
                  <Text fontWeight="400" color="white">
                    {itemData?.status}
                  </Text>
                </Stack>
              }
              {
                itemData?.status === 'ACTIVE' && <Stack w="20" bg="yellow.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="yellow.600">
                  <Text fontWeight="400" color="white">
                    {itemData?.status}
                  </Text>
                </Stack>
              }

              {
                itemData?.status === 'COMPLETED' && <Stack w="20" bg="red.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="red.600">
                  <Text fontWeight="400" color="white" style={{
                    fontSize:12
                  }}>
                    {itemData?.status}
                  </Text>
                </Stack>
              }
            </HStack>

            <Stack >
              <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                Start Time: {itemData?.start_date}
              </Text>
             
            </Stack>
            <Stack >
             
              <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                Deadline: {itemData?.deadline}
              </Text>
            </Stack>
            {
              itemData?.status === 'PENDING' && <HStack alignItems="center" justifyContent="space-between">
                <Text color="coolGray.900"
                  fontSize='md'
                  _dark={{
                    color: "warmGray.200"
                  }} fontWeight="700">
                  Activate Status
                </Text>
                <Button bg="blue.600"
                  onPress={() => updateStatus('ACTIVE')}
                >
{
  Loadingstatus ? <SpinnerLoad /> :  <Text
                    color="#fff"
                    fontSize='sm'
                  >Update Status</Text>
}
                 
                </Button>
              </HStack>
              
            }
            
            {
              itemData?.status === 'ACTIVE' && <HStack alignItems="center" justifyContent="space-between">
                <Text color="coolGray.900"
                  fontSize='md'
                  _dark={{
                    color: "warmGray.200"
                  }} fontWeight="700">
                  Activate Status
                </Text>
                <Button bg="blue.600"
                  onPress={() => updateStatus('COMPLETED')}
                >
                  {
                    Loadingstatus ? <SpinnerLoad /> : <Text
                      color="#fff"
                      fontSize='sm'
                    >Update Status</Text>
                  }

                </Button>
              </HStack>

            }
          </Stack>
        </Box>

      
   </Center>
      <FlatList
        data={itemData?.documents}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<EmptyCardFile/>}
      />
    </Box>
  )
}



const styles = StyleSheet.create({})