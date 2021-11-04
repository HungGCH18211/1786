import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./StackScreen";

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default Routes;
