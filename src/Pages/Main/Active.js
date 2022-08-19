import React from 'react';
import { View } from 'react-native';

import ErrorCard from '../../Components/ErrorCard';

import LoadingCard from '../../Components/Loading';
import { useSelector } from 'react-redux';
import CustomFlatList from '../../Components/CustomFlatList';
import {  useGetActiveAsignQuery } from '../../Redux/AuthApi';

export default function Active({navigation}) {
  const token = useSelector((auth) => auth.auth.token)

  const { data, error, isLoading } =  useGetActiveAsignQuery(token)
  // console.log(error, 'errror')
  // console.log(data)
  //  console.log(token, 'aaaa');
  if (isLoading) {
    return <LoadingCard />
  }
  if (error) {
    return <ErrorCard errormsg={error.data.detail} />
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <CustomFlatList data={data} msg="No Active Assigment Was Found" navigation={navigation} />

    </View>
  );
}
