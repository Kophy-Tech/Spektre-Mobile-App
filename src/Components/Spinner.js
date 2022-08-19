import React from "react";
import { Spinner, HStack, Heading } from "native-base";

const SpinnerLoad = () => {
  return <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts"  color="#fff"/>
      <Heading color="#fff" fontSize="md">
        Loading
      </Heading>
    </HStack>;
};

export default SpinnerLoad