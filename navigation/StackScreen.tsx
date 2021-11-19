import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import CreateProperty from "../screens/CreateProperty";
import EditProperty from "../screens/EditProperty";
import ViewAll from "../screens/ViewAll";
import ViewOne from "../screens/ViewOne";
import LandingPage from "../screens/LandingPage";

export default () => {
  return <Navigator />;
};

const Stack = createStackNavigator();
function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="landing">
      <Stack.Screen
        name="Home"
        component={ViewAll}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateProperty"
        component={CreateProperty}
        options={({ navigation }) => ({
          title: "",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
        })}
      />
      <Stack.Screen
        name="ViewProperty"
        component={ViewOne}
        options={({ navigation }) => ({
          title: "",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
        })}
      />
      <Stack.Screen
        name="EditProperty"
        component={EditProperty}
        options={({ navigation }) => ({
          title: "",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "#f9fafd",
            elevation: 0,
          },
        })}
      />
    </Stack.Navigator>
  );
}

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Auth"
        component={RootNavigator}
      />
    </Stack.Navigator>
  );
};
