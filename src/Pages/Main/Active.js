import React from 'react';
import { View } from 'react-native';

import ErrorCard from '../../Components/ErrorCard';

import LoadingCard from '../../Components/Loading';

import CustomFlatList from '../../Components/CustomFlatList';
import {  useGetActiveAsignQuery } from '../../Redux/AuthApi';

export default function Active({navigation}) {


  const { data, error, isLoading, isError } =  useGetActiveAsignQuery()
// console.log(data[0])
  if (isLoading) {
    return <LoadingCard />
  }
  if (isError) {
    <ErrorCard errormsg={error} />
    }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <CustomFlatList data={data} msg="No Active Assigment Was Found" navigation={navigation} />

    </View>
  );
}
