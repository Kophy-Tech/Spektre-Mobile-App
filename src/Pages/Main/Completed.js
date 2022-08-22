import React from 'react';
import { View } from 'react-native';

import ErrorCard from '../../Components/ErrorCard';

import LoadingCard from '../../Components/Loading';

import CustomFlatList from '../../Components/CustomFlatList';
import { useGetCompletedAsignQuery } from '../../Redux/AuthApi';

export default function Completed({navigation}) {

  const { data, error, isLoading } = useGetCompletedAsignQuery()

  if (isLoading) {
    return <LoadingCard />
  }
  if (error) {
    return <ErrorCard errormsg={error.data.detail} />
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <CustomFlatList data={data} msg="No Completed Assigment Was Found" navigation={navigation} />

    </View>
  );
}
