import React from 'react';
import { Box, Text } from "native-base";


export default function DocumentHeader() {
    return (
        <Box mx="2" my="2">
            <Text
                color="coolGray.900"
                fontSize='lg'
                _dark={{
                    color: "warmGray.200"
                }} fontWeight="700"
            >Dokumente</Text>
        </Box>
    )
}
