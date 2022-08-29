

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/Route/MainStack';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import { NativeBaseProvider } from "native-base";
import StatusBarContainer from './src/Components/StatusBar';
import { api } from './src/Redux/AuthApi'
const App = () => {
 
  store.dispatch(api.endpoints.getNotifications.initiate())
  return (
    < NativeBaseProvider>
    < NavigationContainer>
    <Provider store={store}>
         < StatusBarContainer/>
          
    <MainStack/>

    </Provider>
    </NavigationContainer>
    </ NativeBaseProvider>
  );
};



export default App;
