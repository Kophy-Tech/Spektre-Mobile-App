import React from 'react';
import { View } from 'react-native';

import ErrorCard from '../../Components/ErrorCard';

import LoadingCard from '../../Components/Loading';

import CustomFlatList from '../../Components/CustomFlatList';
import {  useGetActiveAsignQuery } from '../../Redux/AuthApi';

export default function Active({navigation}) {


  const { data, error, isLoading } =  useGetActiveAsignQuery()
// console.log(data[0])
  if (isLoading) {
    return <LoadingCard />
  }
  if (error) {
    if (!error?.status) {

      return <ErrorCard errormsg='No Server Response' />
    }
    else if (error.status ==="FETCH_ERROR") {
      return <ErrorCard errormsg="Network request failed, refresh your network and try again!." />

  }
    else if (error.status === 400) {
      return <ErrorCard errormsg={error?.data?.detail} />

    }
    else if (error.status === 401) {
      return <ErrorCard errormsg='Unauthorized' />

    } else {
      return <ErrorCard errormsg='Unknow error occur!,Kindly refresh your application' />




    }

  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <CustomFlatList data={data} msg="No Active Assigment Was Found" navigation={navigation} />

    </View>
  );
}
