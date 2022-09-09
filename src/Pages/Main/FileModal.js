import { Stack, Image } from "native-base";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View , FlatList} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const FileModal = ({Attachments, modalFileVisible, setModalFileVisible}) => {
  
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalFileVisible}
    onRequestClose={() => {
     
        setModalFileVisible(!modalFileVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Stack  alignItems="center">
      <Icon
      onPress={()=>setModalFileVisible(false)}
                            name="close"
                            size={40}
                            color='#4dd3ff'

                        />
      </Stack>
      <FlatList
                  data={Attachments}
                  renderItem={({item})=>{
                    return(
                        <Stack width="100%" style={{height:250}} my="2">
                          <Image
                          resizeMode="cover"
                          source={{
      uri: item?.file
    }} alt="Alternate Text"  width="100%" height="100%"/>
                        </Stack>
                    )
                  }}
                  keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

                  ListHeaderComponentStyle={{
                    //   paddingBottom: 10
                  }}
              //   ListEmptyComponent={() => <EmptyCard />}
              />
      </View>
    </View>
  </Modal>
  )
}

export default FileModal

const styles = StyleSheet.create({


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      
      },
      modalView: {
       width:'95%',
        backgroundColor: "white",
        // borderRadius: 20,
        paddingVertical: 5,
        marginTop:10,
        marginBottom:50,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
})