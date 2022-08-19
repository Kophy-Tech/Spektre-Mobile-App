// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomStack from './BottomStack';



const Stack = createNativeStackNavigator();

function MainStack() {
  return (
   
      <Stack.Navigator
          screenOptions={{
              headerShown:false
          }}
      >
        <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Bottom" component={BottomStack}
     
     
      />

      </Stack.Navigator>
    
  );
}

export default MainStack;