import { StyleSheet, View, FlatList, Alert, TouchableOpacity, Modal, } from 'react-native'
import React from 'react'
import ErrorCard from '../../Components/ErrorCard';
import { useRoute } from '@react-navigation/native';
import { Box, Heading, Text, Center, HStack, Stack, Button, Input, FormControl } from "native-base";
import LoadingCard from '../../Components/Loading';
import { useChangeAsignStatusMutation, useGetAsignQuery, useOpenTicketMutation, useCloseTicketMutation } from '../../Redux/AuthApi';
import CardFile from '../../Components/CardFile';
import EmptyCardFile from '../../Components/EmptyCardFile';
import SpinnerLoad from '../../Components/Spinner';
import EmptyCard from '../../Components/EmptyCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TicketHeader from '../../Components/TicketHeader';
import DocumentHeader from '../../Components/DocumentHeader';
import Ticket from '../../Components/Ticket';
import EmptyTicket from '../../Components/EmptyTicket';
export default function SingleAssignment({navigation}) {
 
   const route = useRoute();
  const [changeAsignStatus, { isLoading:Loadingstatus }] =useChangeAsignStatusMutation()
  const [OpenTicket, { isLoading: LoadingOpenTicket }] = useOpenTicketMutation()
  const [CloseTicket, { isLoading: LoadingCloseTicket }] = useCloseTicketMutation()
 const [IdLoaing, setIdLoaing] = React.useState(null);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [respond, setRespond] = React.useState('');
  const [respondError, setRespondError] = React.useState('');
  // console.log(respond)
const id = route?.params?.id
// console.log(id)

    const { data:itemData, error, isLoading } = useGetAsignQuery({id})
 console.log(error)
 const updateStatus = (data)=>{
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
         text: "OK", onPress: async() => {
           const updateData = {
             status: data
           }
           const updateId = {
             id,
             updateData
           }
           console.log(updateId)
           try {
             const user = await changeAsignStatus(updateId).unwrap()
             console.log(user?.status);
         

           } catch (error) {
             console.log(error.data)
             if (!error?.status) {
               Alert.alert('No Server Response')
             }
             else if (error.status === 400) {
               Alert.alert(error.data.non_field_errors[0])

             }
             else if (error.status === 405) {
               Alert.alert(error.data.detail)


             } else {
               Alert.alert('Login Failed')


             }
           }
         }
       }
     ]
   );
 }

  const closeTicketSend = ({idProps, status}) => {
    Alert.alert(
      "Are you sure you want to close this ticket?",
      "",
      [

        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            if(status==='CLOSED'){
              Alert.alert('Ticket is closed already')
            }

            else{
              console.log(idProps)
              setIdLoaing(idProps)
              const updateData = {
                status: 'CLOSED'
              }
              const updateId = {
                id: idProps,
                updateData
              }
              try {
                const user = await CloseTicket(updateId).unwrap()
                console.log(user?.status);
                setIdLoaing(null)

              } catch (error) {
                console.log(error.data)
                if (!error?.status) {
                  Alert.alert('No Server Response')
                }
                else if (error.status === 400) {
                  Alert.alert(error.data.non_field_errors[0])

                }
                else if (error.status === 401) {
                  Alert.alert('Unauthorized')


                } else {
                  Alert.alert('Login Failed')


                }
              }
            }
       
           

          }
        }
      ]
    );
  }
  const validateResponse = () => {
    if (respond === '') {
      setRespondError('Ticket is required');

      return false;
    }
    if (respond.length >0) {
      setRespondError('');

      return true;
    }

  

// return true

  
  };
 const SendOpenTicket = async()=>{
   if (!validateResponse()) {
     console.log('error')
   }
 else{
     const respondId = {

       issue: respond,
       assignment: id
     }
     try {
       const user = await OpenTicket(respondId).unwrap()
       console.log(user?.status);
       setModalVisible(false)
       setRespond('')

     } catch (error) {
       console.log(error)
       if (!error?.status) {
         Alert.alert('No Server Response')
       }
       else if (error.status === 400) {
         Alert.alert(error.data.non_field_errors[0])

       }
       else if (error.status === 401) {
         Alert.alert('Unauthorized')


       } else {
         Alert.alert('Error')


       }
     }
 }
 }
 const renderItem =({item })=> <CardFile item={item}/>
  const renderItemTickets = ({ item }) => <Ticket item={item} closeTicketSend={closeTicketSend} LoadingCloseTicket={LoadingCloseTicket} IdLoaing={IdLoaing} navigation={navigation} />
   
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
              <Text fontWeight="400" pt="1" color="blue">
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
                itemData?.status === 'PENDING' && <Stack w="30%" bg="black" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="green.600">
                  <Text fontWeight="400" color="white">
                    {itemData?.status}
                  </Text>
                </Stack>
              }
              {
                itemData?.status === 'ACTIVE' && <Stack w="30%" bg="yellow.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="yellow.600">
                  <Text fontWeight="400" color="white">
                    {itemData?.status}
                  </Text>
                </Stack>
              }

              {
                itemData?.status === 'COMPLETED' && <Stack w="30%" bg="green.600" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="green.600">
                  <Text fontWeight="400" color="white"  fontSize="sm">
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
                <Button style={{backgroundColor:"#4dd3ff"}}
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
                <Button bg="#4dd3ff"
                  onPress={() => updateStatus('COMPLETED')}
                    disabled={Loadingstatus}
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
      <HStack my="2" mx="2" justifyContent="space-between">
        <Text color="coolGray.900"
          fontSize='lg'
          _dark={{
            color: "warmGray.200"
          }} fontWeight="700">
        Tickets
        </Text>

          <Button style={{ backgroundColor: "#4dd3ff" }}
          onPress={() => setModalVisible(true)}
        >
          <Text
            color="#fff"
            fontSize='sm'
          >Open Ticket</Text>

        </Button>
   </HStack>

     
      <FlatList
        data={itemData?.tickets}
        renderItem={renderItemTickets}
        keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyTicket />}
        ListHeaderComponent={<TicketHeader/>}
     
        ListFooterComponent={<FlatList
          data={itemData?.documents}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyCardFile />}
          ListHeaderComponent={<DocumentHeader/>}
        />}
      />
     
     
    </Box>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
         
          <View style={styles.modalView}>
            <Box justifyContent='flex-end'
            alignItems="flex-end"
            my="2"
            >
              <Icon
                name="close"
                size={35}
                color='#4dd3ff'
   onPress={() => setModalVisible(false)}

              />
            </Box>
            <FormControl>
              <Input
                value={respond}
                onChangeText={(text) => setRespond(text)}
                fontSize="md"

              />
              {
                respondError && <FormControl.HelperText _text={{
                  fontSize: 'xs',
                  color: 'red.500'
                }}>
                  {respondError}
                </FormControl.HelperText>
              }
            </FormControl>
          
            <Box mt="8">
              <Button
                style={{ backgroundColor: "#4dd3ff" , borderRadius:10}}
                onPress={SendOpenTicket}
                disabled={LoadingOpenTicket}
              >
                {
                  LoadingOpenTicket ? <SpinnerLoad /> : <Text
                    color="#fff"
                    fontSize='sm'
                  >Send</Text>
                }
              

              </Button>
            </Box>
          </View>
        </View>
      
      </Modal>
    </>
  )
}



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0.7)',
    
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    width:'90%'
  },

})