import React from 'react';
import { View } from 'react-native';
import { useGeAllAsignQuery } from '../../Redux/AuthApi';
import ErrorCard from '../../Components/ErrorCard';

import LoadingCard from '../../Components/Loading';
import { useSelector } from 'react-redux';
import CustomFlatList from '../../Components/CustomFlatList';

export default function Home() {
  const token = useSelector((auth) => auth.auth.token)

  const { data, error, isLoading } = useGeAllAsignQuery(token)
console.log(error, 'errror')
// console.log(data)
//  console.log(token, 'aaaa');
if(isLoading){
  return <LoadingCard />
}
// if(error){
// return <ErrorCard/>
// }
  return (
    <View style={{flex:1}}>
       
      <CustomFlatList data={data}/>
    
     </View>
  );
}
