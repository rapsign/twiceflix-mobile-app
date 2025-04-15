import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/homeScreen";
import VideoListScreen from "../screens/videoListScreen";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PlaylistListScreen from "../screens/playlistListScreen";
import AboutScreen from "../screens/aboutScreen";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarStyle: {
          backgroundColor: "#000",
          borderBlockColor: "#000",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Videos"
        component={VideoListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="ondemand-video" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={PlaylistListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="video-collection" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="info-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
