import React from "react";
import {
  NativeBaseProvider,
  Text,
  Box,
  Center,
  View,
  Fab,
  Icon,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";

const TabTwoScreen = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Text>Tab 2</Text>
        <Box position="relative" h={100} w="100%">
          <Fab
            position="absolute"
            size="lg"
            bg="#2563eb"
            onPress={() => navigation.navigate("CreateProperty")}
            icon={
              <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
            }
          />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default TabTwoScreen;
