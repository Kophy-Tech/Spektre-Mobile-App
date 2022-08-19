import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, Flex, Spacer} from "native-base";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SpinnerLoad from "../../Components/Spinner";
import { useLoginMutation } from "../../Redux/AuthApi";
import { Alert } from "react-native";
const Login = () => {
  const [passwordType, setPasswordType] = React.useState("password");
  const navigation = useNavigation()
  const [login, { isLoading }] = useLoginMutation()
  const [data, setData] = React.useState({
    username:'',
    password:''
  });
  const [errorUsername, setErrorUsername] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
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
        navigation.replace("Bottom")
        
      } catch (error) {
        console.log(error.data)
        Alert.alert(error.data.non_field_errors[0])
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

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Username</FormControl.Label>
          <Input 
          value={data.username}
            onChangeText={value => handleInputChange('username', value)}
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
        
          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
            Forget Password?
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="indigo"
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