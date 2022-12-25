import React from 'react';
import { Box, Text } from "native-base";


export default function EmptyTicket() {
  return (
      <Box my="2" alignItems="center" justifyContent="center">
    <Text
              color="coolGray.600"
              fontSize="md"
             

              _dark={{
                  color: "warmGray.200"
              }} fontWeight="400"
    > Keine Tickets</Text>
  </Box>
  );
}
