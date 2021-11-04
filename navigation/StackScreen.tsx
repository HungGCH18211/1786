import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CreateProperty from "../screens/CreateProperty";
import EditProperty from "../screens/EditProperty";
import ViewAll from "../screens/ViewAll";
import ViewOne from "../screens/ViewOne";

export default () => {
  return <Navigator />;
};

const Stack = createStackNavigator();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
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

const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#A5A7AC",
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="home"
        component={ViewAll}
        options={{
          title: "Property",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={28} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Auth"
        component={RootNavigator}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tab"
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};
