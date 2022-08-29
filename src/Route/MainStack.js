// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomStack from './BottomStack';
import OnboardingScreen from '../Pages/OnboardingScreen/OnboardingScreen';


const Stack = createNativeStackNavigator();

function MainStack() {
  return (
   
      <Stack.Navigator
          screenOptions={{
              headerShown:false
          }}
      >
      <Stack.Screen name="onboard" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />

      <Stack.Screen name="Bottom" component={BottomStack} />


      </Stack.Navigator>
    
  );
}

export default MainStack;