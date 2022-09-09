import React from 'react';
import { Alert ,StyleSheet, TouchableOpacity} from 'react-native';

import { Flex, Spacer, Text , Box, Stack, Button} from 'native-base';
import ErrorCard from '../../Components/ErrorCard';
import { useNavigation } from "@react-navigation/native";

import LoadingCard from '../../Components/Loading';

import { useGetUserQuery } from '../../Redux/AuthApi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const navigation = useNavigation()

  

  const { data, error, isLoading } = useGetUserQuery()
  const LogOut = () =>{
    Alert.alert(
      "Are you sure you want to logout?",
      "",
      [
       
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          AsyncStorage.removeItem('token')
navigation.navigate('Auth')
        } }
      ]
    );
  }
   
  // console.log(data)
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
    <Box py="4" px="4" bg="#fff" h="100%">
       
      <Flex direction="row"  mt="1.5" justifyContent="space-between">
        <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
          First Name:
        </Text>
        <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
         {data?.first_name}
        </Text>

      </Flex>
      <Flex direction="row"  mt="5" justifyContent="space-between">
        <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
          Last Name:
        </Text> 
         <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
          {data?.last_name}
        </Text>

      </Flex>

      <Flex direction="row" mt="5" justifyContent="space-between">
        <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
          Email:
        </Text>
        <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
          {data?.email}
        </Text>

      </Flex>
      <Flex direction="row" mt="5" justifyContent="space-between">
        <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
          Position:
        </Text>
        <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
          {data?.type}
        </Text>

      </Flex>
      <Flex direction="row" mt="5" justifyContent="space-between">
        <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
          Company Name:
        </Text>
        <Text color="coolGray.800" _dark={{
          color: "warmGray.200"
        }} fontWeight="400">
          {data?.company?.name}
        </Text>

      </Flex>

      <Stack mt="10">
<TouchableOpacity style={styles.changePassword}
  onPress={() => navigation.navigate('change')}
>
<Text  fontWeight="800" fontSize="md" color="#4dd3ff">
         change Password
        </Text> 
</TouchableOpacity>
      </Stack>
      <Stack mt="10">
        <Button
          leftIcon={<Icon name="logout"  color="white" />}
          bg="#4dd3ff"
          onPress={LogOut}
        >
          Log Out
        </Button>
      </Stack>
     </Box>
  );
}


const styles = StyleSheet.create({
  changePassword:{
    width:'100%',
    backgroundColor:'transparent',
    height:40,
   justifyContent:'center',
   alignItems:'center',
   borderColor:'#4dd3ff',
   borderWidth:1,
   paddingLeft:10,
   borderRadius:10
   

  }
})