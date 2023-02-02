


import { StyleSheet, Linking, Alert, Platform , TouchableOpacity,  Modal,View  } from 'react-native'
import React from 'react'
import { Box, AspectRatio, Image, Center, Text, Button, HStack, } from "native-base";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardFile = ({ item }) => {
    // console.log(item)
    const OpenUrl = React.useCallback(
        async (url) => {
            const supported = await Linking.canOpenURL(url);
            //  console.log(supported)
            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        },
        [],
    )
    const [modalVisible, setModalVisible] = React.useState(false);
const [showFile, setshowFile] = React.useState('')
    const Downloadfile = async (file) => {
        const url = file
        // "https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf";

        // *IMPORTANT*: The correct file extension is always required.
        // You might encounter issues if the file's extension isn't included
        // or if it doesn't match the mime type of the file.
        // https://stackoverflow.com/a/47767860
        function getUrlExtension(url) {
            return url.split(/[#?]/)[0].split(".").pop().trim();
        }

        const extension = getUrlExtension(url);

        // Feel free to change main path according to your requirements.
        const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

        const options = {
            fromUrl: url,
            toFile: localFile,
        };
        RNFS.downloadFile(options)
            .promise.then(() => FileViewer.open(localFile))
            .then(() => {
                // success
            })
            .catch((error) => {
                Alert.alert('Unable to download file')
            });
    }
    return (
      <>
        <Center>
            <TouchableOpacity 
                     
            
                        style={{
                            width:'95%'
                        }}
            >
   <Box w="100%" rounded="lg" my="1" mb="3" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}

            >

                <Box w="100%" h="20" >
                    <Box w="100%" alignItems="center" justifyContent="center">
                       {
                        item?.file.endsWith('jpg') || item?.file.endsWith('png') ? <Image source={{
                            uri:item?.file
                        }} alt="image" h="100" w="100" />: <Image source={require('../images/file.jpg')} alt="image" h="100" w="100" />
                       }

                    </Box>


                    <Center style={{ backgroundColor: "#4dd3ff" }} position="absolute" px="3" py="1.5">
                        <Text
                            color="#fff"
                            fontSize="xs"
                            _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400"
                        > Dokument </Text>
                    </Center>
                </Box>
                <HStack
                    justifyContent="space-between"

                >
{
     item?.file.endsWith('jpg') || item?.file.endsWith('png') ? <Button bg="#fff"
     borderWidth='1'
     style={{ borderColor: "#4dd3ff", borderRadius:15 }}
     onPress={() => {
setModalVisible(true)
setshowFile(item?.file)
     }}
 >
     <Text
         style={{ color: "#4dd3ff" }}
         fontSize='sm'
     >Offenes Modal</Text>

 </Button>:
  <Button bg="#fff"
  borderWidth='1'
  style={{ borderColor: "#4dd3ff", borderRadius:15 }}
  onPress={() => OpenUrl(item.file)}
>
  <Text
      style={{ color: "#4dd3ff" }}
      fontSize='sm'
  > Öffnen </Text>

</Button>
}
                   
                    {/* <Button bg="#fff"
                        borderWidth='1'
                        style={{ borderColor: "#4dd3ff", borderRadius: 15 }}
                        onPress={() => Downloadfile(item.file)}
                    >
                        <Text
                            style={{ color: "#4dd3ff" }}
                            fontSize='sm'
                        >Download</Text>

                    </Button> */}
                </HStack>
            </Box>
            </TouchableOpacity>
         
        </Center>
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
            my="1"
            >
              <Icon
                name="close"
                size={35}
                color='#4dd3ff'
   onPress={() => setModalVisible(false)}

              />
            </Box>
         {
            showFile && <Image source={{
                uri:showFile
            }} alt="image" flex="1" resizeMode='contain' />
         }
          </View>
        </View>
      
      </Modal>
      </>
    )
}

export default CardFile

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        
      },
      modalView: {
        height:'90%',
        width:'100%',
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