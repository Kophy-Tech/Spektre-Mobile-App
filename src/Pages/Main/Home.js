import React from 'react';
import { View } from 'react-native';
import { useGeAllAsignQuery } from '../../Redux/AuthApi';
import ErrorCard from '../../Components/ErrorCard';

import LoadingCard from '../../Components/Loading';

import CustomFlatList from '../../Components/CustomFlatList';

export default function Home({navigation}) {


  const { data, error, isLoading } = useGeAllAsignQuery()
// console.log(error, 'errror')
// console.log(data)

if(isLoading){
  return <LoadingCard />
}
  if (error) {
    if (!error?.status) {

      return <ErrorCard errormsg='No Server Response' />
    }
    else if (error.status === 400) {
      return <ErrorCard errormsg={error?.data?.detail} />

    }
    else if (error.status === 401) {
      return <ErrorCard errormsg='Unauthorized' />




    } else {
      return <ErrorCard errormsg='Error' />




    }

  }
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
       
      <CustomFlatList data={data} msg="No Assigment Was Found"  navigation={navigation}/>
    
     </View>
  );
}
