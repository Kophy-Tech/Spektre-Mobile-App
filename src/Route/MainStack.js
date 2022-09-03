// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomStack from './BottomStack';
import OnboardingScreen from '../Pages/OnboardingScreen/OnboardingScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

function MainStack() {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);


    const LoadData = async()=>{
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData == null) {
            setIsAppFirstLaunched(true);
            AsyncStorage.setItem('isAppFirstLaunched', 'false');
        } else {
            setIsAppFirstLaunched(false);
        }
 
    }
    React.useEffect(() => {
    LoadData()
    }, []);
  return (
      isAppFirstLaunched != null && (
      <Stack.Navigator
          screenOptions={{
              headerShown:false
          }}
      >
        

          {isAppFirstLaunched && (
              <Stack.Screen name="onboard" component={OnboardingScreen} />

          )}
      <Stack.Screen name="Auth" component={AuthStack} />

      <Stack.Screen name="Bottom" component={BottomStack} />


      </Stack.Navigator>)
    
  );
}

export default MainStack;