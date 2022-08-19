import React from 'react';

import { Box, Text,  Stack } from "native-base";
export default function EmptyCard() {
    return (
        <Box  style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center',

        }}>
            <Box w="95%" rounded="lg" mt="50%" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>

                <Stack p="4" w="100%" alignItems="center"
                    justifyContent='center'>

                    <Text fontWeight="400">
                        No Assignment Was Found
                    </Text>

                </Stack>
            </Box>
        </Box>
    );
}
