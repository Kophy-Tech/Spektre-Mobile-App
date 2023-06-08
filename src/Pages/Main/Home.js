import React from 'react';
import { View } from 'react-native';
import { useGeAllAsignQuery } from '../../Redux/AuthApi';
import ErrorCard from '../../Components/ErrorCard';

import LoadingCard from '../../Components/Loading';

import CustomFlatList from '../../Components/CustomFlatList';

export default function Home({navigation}) {


  const { data, error, isLoading , isError} = useGeAllAsignQuery()
// console.log(error, 'errror')
// console.log(data)

if(isLoading){
  return <LoadingCard />
}
if (isError) {
  <ErrorCard errormsg={error} />
  }
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
       
      <CustomFlatList data={data} msg="No Assigment Was Found"  navigation={navigation}/>
    
     </View>
  );
}
