import { StyleSheet, View, FlatList ,Modal, TextInput, TouchableWithoutFeedback,Alert, TouchableOpacity, Keyboard, Platform, PermissionsAndroid } from 'react-native'
import React from 'react'
import { Box, Heading, Text, Center, HStack, Stack, Button, Input, FormControl, Spinner, Avatar } from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import IconI from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from "react-native-document-picker";
import { useResponseTicketMutation } from '../Redux/AuthApi';
const ModalComponent = ({modalVisible, setModalVisible ,id}) => {

    const [responseTicket, { isLoading: responseLoading }] = useResponseTicketMutation()



    const [imagePicker, setImagePicker] = React.useState({

    });
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
           Alert.alert('Unknown Error: ' + JSON.stringify(err));
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
    
                  
                    setImagePicker({
                        uri: asset.uri,
                        type:asset.type,
                        name:asset.fileName})
                        const data = new FormData();

                        data.append('attachment', {
                            uri: asset.uri,
                            type:asset.type,
                            name:asset.fileName});
                          data.append('ticket', id)
                        
                         responseTicket(data).unwrap().then((data)=>{
console.log(data)
                          }).catch((error)=>{
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

                          })
                           
             
             
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
                        // includeBase64: true
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
        
                            console.log('uri -> ', asset.uri);
                        
                    setImagePicker({
                        uri: asset.uri,
                        type:asset.type,
                        name:asset.fileName})
                        const data = new FormData();

                        data.append('attachment', {
                            uri: asset.uri,
                            type:asset.type,
                            name:asset.fileName});
                          data.append('ticket', id)
                        
                         responseTicket(data).unwrap().then((data)=>{
console.log(data)
                          }).catch((error)=>{
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

                          })
                           
                       
          
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
        
                        console.log('uri -> ', asset.uri);
                      
                    setImagePicker({
                        uri: asset.uri,
                        type:asset.type,
                        name:asset.fileName
                    })

                    if(imagePicker.uri){
                        submitData()
                    }
        
                    });
              
        
                  
        
        
                }
            });
        
        }
               
            }

            
    const submitData = async () => {
     const data = new FormData();

        data.append('attachment', {
            uri:imagePicker.uri,
            type:imagePicker.type,
            name:imagePicker.name
          });
          data.append('ticket', id)
          data.append('text', '');
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
  return (
    <View style={styles.centeredView}>
   
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
      <Stack position="absolute" left="50%" top="-20">
      <Icon
      onPress={()=>setModalVisible(false)}
                            name="close"
                            size={35}
                            color='#4dd3ff'


                        />
      </Stack>
        <HStack alignItems="center" justifyContent="space-between">
{/* <Stack alignItems="center">
<Stack >
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
<Text fontSize="lg"   fontWeight="900"  color='#4dd3ff'>Document</Text>

</Stack> */}
<Stack  alignItems="center">
<Stack >
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
<Text fontSize="lg"   fontWeight="900"  color='#4dd3ff'>Gallery</Text>

</Stack>
<Stack alignItems="center">
<Stack >
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
<Text fontSize="lg"   fontWeight="900"  color='#4dd3ff'>Camera</Text>
</Stack>
        </HStack>
         
        </View>
      </View>
    </Modal>
   
  </View>
  )
}

export default  ModalComponent

const styles = StyleSheet.create({
    centeredView: {
        flex:1,
            justifyContent: "flex-end",
            alignItems: "center",
         
          },
          modalView: {
            marginBottom: 60,
            backgroundColor: "white",
            borderRadius: 20,
            width:'98%',
            padding: 20,
          
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          
          },
})