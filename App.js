import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/mainNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    BebasNeue: require("./assets/fonts/BebasNeue-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
