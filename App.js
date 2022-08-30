

import React from 'react';

import {

  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/Route/MainStack';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import { NativeBaseProvider, Image } from "native-base";
import StatusBarContainer from './src/Components/StatusBar';
import { api } from './src/Redux/AuthApi';

const Splash =()=>{
  return (
    <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}}>
      <Image source={require('../spektre/src/images/logo.png')} alt="image" h="100" w="100" />

    </View>
  )
}
const App = () => {
  const [load, setload] = React.useState(true);
 const show =()=>{
   setTimeout(() => {
     setload(false)
   }, 3000);
 }

show()
  store.dispatch(api.endpoints.getNotifications.initiate())
  return (
    < NativeBaseProvider>
    < NavigationContainer>
    <Provider store={store}>
          < StatusBarContainer />
        {
            load ? <Splash /> : <MainStack />

        }
          

    </Provider>
    </NavigationContainer>
    </ NativeBaseProvider>
  );
};



export default App;
