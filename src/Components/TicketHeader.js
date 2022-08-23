import React from 'react';
import {  Text, HStack, } from "native-base";


export default function TicketHeader() {
    return (
        <HStack my="2" mx="2" bg="warmGray.600" p="2" justifyContent="space-between" alignItems="center">
            <Text color="#fff"
                fontSize='md'
                flex="1"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700">
                Issue
            </Text>
            <Text color="#fff"
                fontSize='md'
                flex="1"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700">
                Opener
            </Text>
            <Text color="#fff"
                fontSize='md'
                flex="1"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700">
                Status
            </Text>
            <Text color="#fff"
                fontSize='md'
                flex="1.5"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700">
                Actions
            </Text>

        </HStack>
    )
}