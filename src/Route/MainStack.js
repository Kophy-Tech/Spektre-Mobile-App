// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomStack from './BottomStack';
import OnboardingScreen from '../Pages/OnboardingScreen/OnboardingScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../Pages/Splash/SplashScreen';
import { useDispatch, useSelector } from 'react-redux';
import { tokenSet } from '../Redux/AuthSlice';

const Stack = createNativeStackNavigator();

function MainStack({navigation}) {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
    const token = useSelector((state)=> state.auth.token)
    const onBoard = useSelector((state)=> state.auth.onBoard)
    // console.log(onBoard, '')
const dispatch= useDispatch()
 const [showSplash, setshowSplash] = React.useState(true)

     React.useEffect(() => {
    setTimeout(async() => {
        const token = await AsyncStorage.getItem('token')
        if(token){
        dispatch(tokenSet(token))

        }
        setshowSplash(false)
      

    }, 2000);
     }, [])

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
        

      {
        onBoard && <>
            {isAppFirstLaunched && (
              <Stack.Screen name="onboard" component={OnboardingScreen} />

          )}
        </>
      }
{
    showSplash ? <Stack.Screen name="Splash" component={SplashScreen} />:(
     <>
     {
        token?
<Stack.Screen name="Bottom" component={BottomStack} />
:
<Stack.Screen name="Auth" component={AuthStack} />

     }
     </>
    )
}



    



      </Stack.Navigator>)
    
  );
}

export default MainStack;