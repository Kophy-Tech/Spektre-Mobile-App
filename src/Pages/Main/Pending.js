import React from 'react';
import { View } from 'react-native';

import ErrorCard from '../../Components/ErrorCard';

import LoadingCard from '../../Components/Loading';
import { useSelector } from 'react-redux';
import CustomFlatList from '../../Components/CustomFlatList';
import { useGetPendingAsignQuery } from '../../Redux/AuthApi';

export default function Pending({navigation}) {


  const { data, error, isLoading } = useGetPendingAsignQuery()
  // console.log(error, 'errror')
  // console.log(data)
 
  if (isLoading) {
    return <LoadingCard />
  }
  if(error){
    return <ErrorCard errormsg={error.data.detail} />
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <CustomFlatList data={data} msg="No Pending Assigment Was Found" navigation={navigation} />

    </View>
  );
}
