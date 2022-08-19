// In App.js in a new project

import * as React from 'react';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Pages/Auth/Login';



const Stack = createNativeStackNavigator();

function AuthStack() {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>

    );
}

export default AuthStack;