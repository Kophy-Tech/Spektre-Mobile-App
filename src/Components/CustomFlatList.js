import { FlatList, StyleSheet } from "react-native";
import React from 'react'
import Card from './Card'
import EmptyCard from "./EmptyCard";

const CustomFlatList = ({data}) => {
    console.log(data, 'from customflatlist')
    const fakeData=[]
    return <FlatList
        data={data}
        renderItem={()=> <Card data={data}/>}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyCard}
    />
  
}

export default CustomFlatList

const styles = StyleSheet.create({})