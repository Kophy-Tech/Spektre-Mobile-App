import { FlatList, StyleSheet } from "react-native";
import React from 'react'
import Card from './Card'
import EmptyCard from "./EmptyCard";

const CustomFlatList = ({data, msg , navigation}) => {
    const renderItem = ({ item }) => <Card item={item} navigation={navigation} />
    const fakeData=[]
    return <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={()=> <EmptyCard msg={msg}/>}
    />
  
}

export default CustomFlatList

const styles = StyleSheet.create({})