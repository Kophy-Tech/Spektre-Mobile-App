import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, Flex, Spacer} from "native-base";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SpinnerLoad from "../../Components/Spinner";
import { useLoginMutation } from "../../Redux/AuthApi";
import { StyleSheet, Linking, Alert, Platform } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { tokenSet } from "../../Redux/AuthSlice";

const Login = () => {
  const [passwordType, setPasswordType] = React.useState("password");
  const navigation = useNavigation()
  const [login, { isLoading }] = useLoginMutation()
  const [data, setData] = React.useState({
    username:'Bledar',
    password:'smartboy3000'
  });


 
  const OpenUrl = React.useCallback(
    async () => {
      const supported = await Linking.canOpenURL('https://spektre-prj.herokuapp.com/account/password_reset/');
      //  console.log(supported)
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL('https://spektre-prj.herokuapp.com/accounts/password_reset/');
      } else {
        Alert.alert(`Don't know how to open this URL`);
      }
    },
    [],
  )

  const [errorUsername, setErrorUsername] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const dispatch= useDispatch()
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleInputChange = (inputName, inputValue) => {

    setData({
      ...data,
      [inputName]: inputValue,
    });
  };
  const validatePassword = () => {

    if (data.password == '' ) {
      setErrorPassword('password is required');
      return false;
    }
    
   else if (data.password ) {
      setErrorPassword('');
      return true;
    }

    return true;
  };

  const validateUsername= () => {

    if (data.username === '') {
      setErrorUsername('username is required');
      return false;
    }

    else if (data.username) {
      setErrorUsername('');
      return true;
    }

    return true;
  };

  // console.log(errorPassword, errorUsername)

  const submitData = async() => {
  
    if (!validateUsername()){
 console.log('error')
    }
    else if (!validatePassword()){
      console.log('error password')

    }
    else{
      // console.log('send data', data)
      try {
        const user = await login(data).unwrap()
        // console.log(user);
if(user){
  AsyncStorage.setItem('token' ,  user?.token)
  dispatch(tokenSet(user?.token))
}
        // navigation.replace("Bottom")
        
      } catch (error) {
        console.log(error)
        if (!error?.status){
Alert.alert('No Server Response')
        }
        else if (error.status === 400){
          Alert.alert(error.data.non_field_errors[0])

        }
        else if (error.status === 405) {
          Alert.alert(error.data.detail)

        
        } 
        else if (error.status === "FETCH_ERROR") {
          Alert.alert(" Network request failed")

        
        } 
        
        else {
          Alert.alert('Login Failed')

         
        }
      }
    }
    
  }

  return <Center w="100%" justifyContent="center" alignItems="center" h="100%" bg="#fff">
    <Box safeArea p="2" py="8" w="90%" maxW="320">
      <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
        Welcome Spektre
      </Heading>
      <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>

      <VStack  mt="5">
        <FormControl>
          <FormControl.Label>Username</FormControl.Label>
          <Input 
          value={data.username}
            onChangeText={value => handleInputChange('username', value)}
            fontSize="md"
          />
          {errorUsername && <FormControl.HelperText _text={{
            fontSize: 'xs',
            color: 'red.500'
          }}>
            {errorUsername}
          </FormControl.HelperText>}
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Flex direction="row" justifyContent="space-between"
          style={{
          
            width: '100%',
           
            position: 'relative'
          }}
          alignItems="center"
          >
            <Input 
              value={data.password}
              onChangeText={value => handleInputChange('password', value)}
              underlineColorAndroid="transparent"
              fontSize="md"

            type={passwordType}  w="100%" style={{
              borderWidth:0,
              borderRightWidth:0,
              borderColor:'#fff'
            }}/>
            <Icon
              name={passwordType === "password" ?"eye-off":'eye'}
              size={20}
              color='black'
              onPress={togglePassword}
               style={{
                position: 'absolute',
                right: 5
               }}
            />
          </Flex>
          {
            errorPassword && <FormControl.HelperText _text={{
              fontSize: 'xs',
              color: 'red.500'
            }}>
              {errorPassword}
            </FormControl.HelperText>
          }
        
     <HStack justifyContent="flex-end" alignItems="center" mb="3">
            <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "blue"
            }} alignSelf="flex-end" mt="1"
            onPress={OpenUrl}
            >
              Forget Password?
            </Link>
          
     </HStack>
        </FormControl>
        <Button mt="2" bg="#4dd3ff"
          onPress={submitData}
          disabled={isLoading}
          >
        {
            isLoading ? <SpinnerLoad/>: 'Sign In'
        }
        </Button>
      
      </VStack>
    </Box>
  </Center>
}

export default Login