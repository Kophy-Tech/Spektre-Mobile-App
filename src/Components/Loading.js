import React from "react";
import { Skeleton, VStack, Center } from "native-base";

const LoadingCard = () => {
    return <Center w="100%">
        <VStack w="90%"  borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
            borderColor: "coolGray.500"
        }} _light={{
            borderColor: "coolGray.200"
        }}>
            <Skeleton h="10" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />

          
        </VStack>
        <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
            borderColor: "coolGray.500"
        }} _light={{
            borderColor: "coolGray.200"
        }}>
            <Skeleton h="10" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />


        </VStack>
    </Center>;
};


export default LoadingCard