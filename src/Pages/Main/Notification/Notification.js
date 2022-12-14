import { StyleSheet, View, Alert } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Heading, Text, Center, HStack, Stack, Button } from "native-base";

import { useReadNofiticationMutation } from '../../../Redux/AuthApi'
import ErrorCard from '../../../Components/ErrorCard';
import LoadingCard from '../../../Components/Loading';
const Notification = ({route}) => {
    const id = route?.params?.id
 const [item, setItem] = React.useState(null);
    const [readNofitication, { isLoading: readLoading, error, isSuccess }] = useReadNofiticationMutation()

  

    const ReadDoc = async () => {
      
        try {

            const user = await readNofitication(id).unwrap()
            console.log(user, 'from read');
            setItem(user)
        

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
    React.useLayoutEffect(() => {
ReadDoc()
     
    }, [])

 console.log(item, 'item')
    if (readLoading) {
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
            return <ErrorCard errormsg='Unknow error occur!,Kindly refresh your application' />




        }

    }

    if (isSuccess){
        return (
            <Box alignItems="center" mt="20">
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
                           <Heading textAlign="center" size="md" py="1">
                        {item?.notification_type}
                    </Heading>
                    <Heading size="sm" py="1">
                        {item?.title}
                    </Heading>
                    <Text color="coolGray.800"
                        py="4"
                        fontSize="md"
                        _dark={{
                            color: "warmGray.200"
                        }} fontWeight="400">
                        {item?.text}
                    </Text>

                </Box>
            </Box>
        )
    }

}

export default Notification

const styles = StyleSheet.create({})