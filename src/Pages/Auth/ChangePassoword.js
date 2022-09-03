import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, Flex, Spacer } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SpinnerLoad from "../../Components/Spinner";
import { useChangePasswordMutation } from "../../Redux/AuthApi";
import { Alert } from "react-native";
const ChangePassword = () => {
    const [passwordType, setPasswordType] = React.useState("password");
    const [passwordTypeTwo, setPasswordTypeTwo] = React.useState("password");

    const navigation = useNavigation()
    const [changePassword, { isLoading }] = useChangePasswordMutation()
    const [data, setData] = React.useState({
        old_password: '',
        new_password: ''
    });
    const [oldPassword, setErrorOldPassword] = React.useState('');
    const [newPassword, setErrorNewPassword] = React.useState('');
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };
    const togglePasswordTwo = () => {
        if (passwordTypeTwo === "password") {
            setPasswordTypeTwo("text");
            return;
        }
        setPasswordTypeTwo("password");
    };
    const handleInputChange = (inputName, inputValue) => {

        setData({
            ...data,
            [inputName]: inputValue,
        });
    };
    const validatePassword = () => {

        if (data.old_password === '') {
            setErrorOldPassword('password is required');
            return false;
        }

        else if (data.old_password) {
            setErrorOldPassword('');
            return true;
        }

        return true;
    };

    const validatePasswordTwo = () => {

        if (data.new_password === '') {
            setErrorNewPassword('password is required');
            return false;
        }

        else if (data.new_password) {
            setErrorNewPassword('');
            return true;
        }

        return true;
    };

    // console.log(errorPassword, errorUsername)

    const submitData = async () => {

        if (!validatePassword()) {
            console.log('error')
        }
        else if (!validatePasswordTwo()) {
            console.log('error password')

        }
        else {
            console.log('send data', data)
            try {
                const user = await changePassword(data).unwrap()
                // console.log(user);
                navigation.navigate("Login")

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
                    Alert.alert('changePassword Failed')


                }
            }
        }

    }

    return <Center w="100%" justifyContent="center" alignItems="center" h="100%" bg="#fff">
        <Box safeArea p="2" py="8" w="90%" maxW="320">
         
            <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
               Change Paswword
            </Heading>

            <VStack mt="5">
                <FormControl>
                    <FormControl.Label>Old Password</FormControl.Label>
                    <Flex direction="row" justifyContent="space-between"
                        style={{

                            width: '100%',

                            position: 'relative'
                        }}
                        alignItems="center"
                    >
                        <Input
                            value={data.old_password}
                            onChangeText={value => handleInputChange('old_password', value)}
                            underlineColorAndroid="transparent"
                            fontSize="md"

                            type={passwordType} w="100%" style={{
                                borderWidth: 0,
                                borderRightWidth: 0,
                                borderColor: '#fff'
                            }} />
                        <Icon
                            name={passwordType === "password" ? "eye-off" : 'eye'}
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
                     oldPassword && <FormControl.HelperText _text={{
                            fontSize: 'xs',
                            color: 'red.500'
                        }}>
                            {oldPassword}
                        </FormControl.HelperText>
                    }

               
                </FormControl>
                <FormControl>
                    <FormControl.Label> New Password</FormControl.Label>
                    <Flex direction="row" justifyContent="space-between"
                        style={{

                            width: '100%',

                            position: 'relative'
                        }}
                        alignItems="center"
                    >
                        <Input
                            value={data.new_password}
                            onChangeText={value => handleInputChange('new_password', value)}
                            underlineColorAndroid="transparent"
                            fontSize="md"

                            type={passwordTypeTwo} w="100%" style={{
                                borderWidth: 0,
                                borderRightWidth: 0,
                                borderColor: '#fff'
                            }} />
                        <Icon
                            name={passwordTypeTwo === "password" ? "eye-off" : 'eye'}
                            size={20}
                            color='black'
                            onPress={togglePasswordTwo}
                            style={{
                                position: 'absolute',
                                right: 5
                            }}
                        />
                    </Flex>
                    {
                        newPassword && <FormControl.HelperText _text={{
                            fontSize: 'xs',
                            color: 'red.500'
                        }}>
                            {newPassword}
                        </FormControl.HelperText>
                    }

             
                </FormControl>
                <Button mt="2" bg="#4dd3ff"
                    onPress={submitData}
                    disabled={isLoading}
                >
                    {
                        isLoading ? <SpinnerLoad /> : 'Change Password'
                    }
                </Button>

            </VStack>
        </Box>
    </Center>
}

export default ChangePassword;