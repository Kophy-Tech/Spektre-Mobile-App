import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ErrorCard from '../../Components/ErrorCard';


import LoadingCard from '../../Components/Loading';
import { useSelector } from 'react-redux';
import { useGetAsignQuery } from '../../Redux/AuthApi';
export default function SingleAssignment() {
    const token = useSelector((auth) => auth.auth.token)
const id =1
    const { data, error, isLoading } = useGetAsignQuery({token,id})
  if (isLoading) {
        return <LoadingCard />
    }
    if (error) {
        return <ErrorCard errormsg={error.data.detail} />
    }
  return (
    <View>
      <Text>SingleAssignment</Text>
    </View>
  )
}



const styles = StyleSheet.create({})