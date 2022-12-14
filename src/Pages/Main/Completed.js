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
    if (!error?.status) {

      return <ErrorCard errormsg='No Server Response' />
    }
    else if (error.status === 400) {
      return <ErrorCard errormsg={error?.data?.detail} />

    }
    else if (error.status ==="FETCH_ERROR") {
      return <ErrorCard errormsg="Network request failed, refresh your network and try again!." />

  }
    else if (error.status === 401) {
      return <ErrorCard errormsg='Unauthorized' />




    } else {
      return <ErrorCard errormsg='Error' />




    }

  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <CustomFlatList data={data} msg="No Completed Assigment Was Found" navigation={navigation} />

    </View>
  );
}
