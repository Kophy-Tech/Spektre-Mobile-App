import { StyleSheet, View, FlatList, TouchableOpacity , Alert} from 'react-native'
import React from 'react'
import { useGetNotificationsQuery, } from '../../../Redux/AuthApi'
import LoadingCard from '../../../Components/Loading'
import ErrorCard from '../../../Components/ErrorCard'
import { Box, Heading, Text, Center, HStack, Stack , Button} from "native-base";


const EmptyCard =()=>{
    return (
        <Box alignItems="center" w="100%">
            <Box w="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Text p="5" textAlign="center" color="coolGray.800"
                    fontSize="md"
                    _dark={{
                        color: "warmGray.200"
                    }} fontWeight="400">
               Leere Benachrichtigungen
                </Text>
            </Box>
        </Box>
    )
}
const Notifications = ({navigation}) => {
    const { data, error, isLoading, isError } = useGetNotificationsQuery({
        pollingInterval: 1000,
    })
// console.log(data)
  
 const renderItem =({item})=>{
     return (
         <Box alignItems="center" my="1">
             <TouchableOpacity
                 style={{
                     width: '100%',
                     alignItems: 'center'
                 }}
                 onPress={() => navigation.navigate('notification', { id: item.id })}>
                 <Box w="95%" rounded="lg"
                     p='2'
                     overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                         borderColor: "coolGray.600",
                         backgroundColor: "gray.700"
                     }} _web={{
                         shadow: 2,
                         borderWidth: 0
                     }} _light={{
                         backgroundColor: "gray.50"
                     }}>
                     <HStack alignItems="center" justifyContent="space-between">
                         <Text color="coolGray.800"
                             fontSize="xs"
                             _dark={{
                                 color: "warmGray.200"
                             }} fontWeight="400">
                             {item.text.length > 40 ? item?.text.slice(0, 40) + '...' : item?.text}
                         </Text>
                         {
                             item.seen === false && <Text fontSize="xs" style={{
                                 color: 'red'
                             }}>unread</Text>
                         }
                         {
                             item.seen && <Text fontSize="xs" style={{
                                 color: 'blue'
                             }}>read</Text>
                         }
                     </HStack>
                 </Box>
             </TouchableOpacity>

         </Box>
     )
 
 }
    // console.log(data)
    if (isLoading) {
        return <LoadingCard />
    }

    if (isError) {
        if (!error?.status) {

            return <ErrorCard errormsg='No Server Response' />
        }
        else if (error.status === 400) {
            return <ErrorCard errormsg={error?.data?.detail} />

        }
        else if (error.status ==="FETCH_ERROR") {
            return <ErrorCard errormsg="Network request failed, refresh your network and try again!." />

        }
        else if (error.status === 401) {
            return <ErrorCard errormsg='Unauthorized' />




        } else {
            return <ErrorCard errormsg='Error' />




        }

    }
  return (
      <Box flex="1" bg="#fff" >
    
          <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => <EmptyCard />}
          />
    </Box>
  )

}

export default Notifications

const styles = StyleSheet.create({})