import React from "react";
import {
  NativeBaseProvider,
  Text,
  Box,
  Center,
  View,
  Heading,
} from "native-base";

const TabOneScreen = () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Heading>RentalZ</Heading>
      </Center>
    </NativeBaseProvider>
  );
};

export default TabOneScreen;
