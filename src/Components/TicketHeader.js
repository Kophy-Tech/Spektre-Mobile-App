import React from 'react';
import {  Text, HStack, } from "native-base";


export default function TicketHeader() {
    return (
        <HStack my="2" mx="2" bg="warmGray.600" p="0.5" justifyContent="space-between" alignItems="center">
                 <Text color="#fff"
                fontSize='sm'
                flex="1"
               textAlign="left"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700">
            Nein. Anzahl der Dateien
            </Text>
            <Text color="#fff"
                fontSize='sm'
                flex="1"
               textAlign="left"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700">
                Ausstellen
            </Text>
            <Text color="#fff"
                fontSize='sm'
                flex="1"
                textAlign="left"
                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700">
             Öffner
            </Text>
            <Text color="#fff"
                fontSize='sm'
                flex="1"
textAlign="left"
                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700">
                Status
            </Text>
            <Text color="#fff"
                fontSize='sm'
                flex="1"
                textAlign="center"

                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700">
              Aktion
            </Text>

        </HStack>
    )
}
