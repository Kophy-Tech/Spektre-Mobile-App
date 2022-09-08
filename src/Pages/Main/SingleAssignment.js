import { StyleSheet, View, FlatList, Alert, TouchableOpacity, Modal,     Platform, PermissionsAndroid } from 'react-native'
import React from 'react'
import ErrorCard from '../../Components/ErrorCard';
import { useRoute } from '@react-navigation/native';
import { Box, Heading, Text, Center, HStack, Stack, Button, Input, FormControl , Avatar} from "native-base";
import LoadingCard from '../../Components/Loading';
import { useChangeAsignStatusMutation, useGetAsignQuery, useOpenTicketMutation, useCloseTicketMutation } from '../../Redux/AuthApi';
import CardFile from '../../Components/CardFile';
import EmptyCardFile from '../../Components/EmptyCardFile';
import SpinnerLoad from '../../Components/Spinner';
import EmptyCard from '../../Components/EmptyCard';
import TicketHeader from '../../Components/TicketHeader';
import DocumentHeader from '../../Components/DocumentHeader';
import Ticket from '../../Components/Ticket';
import EmptyTicket from '../../Components/EmptyTicket';
import moment from "moment";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from "react-native-document-picker";





export default function SingleAssignment({navigation}) {
 
   const route = useRoute();
  const [changeAsignStatus, { isLoading:Loadingstatus }] =useChangeAsignStatusMutation()
  const [OpenTicket, { isLoading: LoadingOpenTicket }] = useOpenTicketMutation()
  const [CloseTicket, { isLoading: LoadingCloseTicket }] = useCloseTicketMutation()
 const [IdLoaing, setIdLoaing] = React.useState(null);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [respond, setRespond] = React.useState('');
  const [respondError, setRespondError] = React.useState('');
  const [imagePicker, setImagePicker] = React.useState([]);


  const documentPicker = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      // setSingleFile(res);
    } catch (err) {
      // setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        Alert.alert('Canceled');
      } else {
        // For Unknown Error
      //  Alert.alert('Unknown Error: ' + JSON.stringify(err));
        // throw err;
      }
    }
  };
  const selectImage=()=> {
    let options = {
        title: 'Select Image',
        customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
     
        quality:1,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    launchImageLibrary(options, (response) => {
       

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
        } else {
          

          

           

            // You can also display the image using data:
        
            // alert(JSON.stringify(response));s
            // const data = {
            //     fileName: sourcefilename,
            //     uri: sourceUri
            // }
            response.assets.map((asset) => {

                console.log('uri -> ', asset.uri);

                setImagePicker([...imagePicker, {
                  uri: asset.uri,
                  type:asset.type,
                  name:asset.fileName
              }])
         
         
            });
    
           
            
       
           
        }
    });
}

  const CameraImage =async()=> {
    
    if(Platform.OS ==='android'){
        const grantedcamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        const grantedstorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED && grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera & storage permission given");
    
            let options = {
    
                quality: 1,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                    includeBase64:true
                },
            };
            launchCamera(options, (response) => {
    
    
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    alert(response.customButton);
                } else {
    
                    response.assets.map((asset) => {
    
                        console.log('uri -> ', asset);
                        setImagePicker([...imagePicker, {
                          uri: asset.uri,
                          type:asset.type,
                          name:asset.fileName
                      }])
  
                     
                    });
                  
    
    
                }
            });
    
    
        } else {
            console.log("Camera permission denied");
        }
    
    }
    
    else{
        let options = {
    
            quality: 1,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
    
    
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
    
                response.assets.map((asset) => {
    
                    console.log('uri -> ', asset);
                    setImagePicker([...imagePicker, {
                      uri: asset.uri,
                      type:asset.type,
                      name:asset.fileName
                  }])
    
                });
          
    
              
    
    
            }
        });
    
    }
           
        }
  // console.log(respond)
const id = route?.params?.id
// console.log(id)

    const { data:itemData, error, isLoading } = useGetAsignQuery({id})

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
    
     const data = new FormData();

     imagePicker.forEach((item, i)=>{
      data.append('attachments', {
        uri:item.uri,
        type:item.type,
        name:item.name
      });
     })
     data.append('assignment', id)
     data.append('issue', respond);
  //  console.log(data, 'data ')
  
     try {
       const user = await OpenTicket(data).unwrap()
       console.log(user);
       setModalVisible(false)
       setRespond('')
       setImagePicker([])

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
              {/* {
                itemData?.status === 'PENDING' && <Stack w="30%" bg="black" alignItems="center" justifyContent="center" borderWidth="0.5" borderRadius="2" borderColor="green.600">
                  <Text fontWeight="400" color="white">
                    {itemData?.status}
                  </Text>
                </Stack>
              } */}
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
                Start Time: {moment(itemData?.start_date).format('MMMM Do YYYY')}
              </Text>
             
            </Stack>
            <Stack >
             
              <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                Deadline: {moment(itemData?.deadline).format('MMMM Do YYYY')}
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
        showsVerticalScrollIndicator={false}
     
        ListFooterComponent={<FlatList
          data={itemData?.documents}
        showsVerticalScrollIndicator={false}

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
          <HStack alignItems="center" justifyContent="flex-end">
<Stack mr="5">
<TouchableOpacity
onPress={documentPicker}
>
<Icon
                name="file-upload"
                size={35}
                color='#4dd3ff'

               
            />
</TouchableOpacity>
</Stack>
<Stack mx="5">
<TouchableOpacity
onPress={selectImage}
>
<Icon
                name="image"
                size={35}
                color='#4dd3ff'

               
            />
</TouchableOpacity>
</Stack>
<Stack mx="5">
  <TouchableOpacity
  onPress={CameraImage}
  >
  <IconI
                name="camera"
                size={35}
                color='#4dd3ff'

               
            />
  </TouchableOpacity>

</Stack>
          </HStack>

          <HStack alignItems="center" my="3" flexWrap='wrap'>

            {imagePicker.length > 0 &&  imagePicker.map( (data, i)=>{
              console.log(data)
              return(
                <Avatar bg="#4dd3ff" 
                mx="1"
                key={i}
                alignSelf="center" size="md" source={{
                  uri: data?.uri
                }}>
                  
                  </Avatar>
              )
            })   }
        
          </HStack>
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