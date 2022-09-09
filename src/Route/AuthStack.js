// In App.js in a new project

import * as React from 'react';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Auth/Login';
import ChangePassword from '../Pages/Auth/ChangePassoword';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function AuthStack({navigation}) {

    

 
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="change" component={ChangePassword} />

        </Stack.Navigator>

    );
}

export default AuthStack;