import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabs from "./myTabs";
import SearchScreen from "../screens/searchScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={MyTabs} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
