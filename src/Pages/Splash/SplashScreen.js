


import { StyleSheet, Text, View,  } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  Image } from "native-base";
const SplashScreen = ({navigation}) => {


  return (
    <View style={{flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}}>
    <Image source={require('../../images/logo-sm.png')} alt="image" h="100" w="100" />

  </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})