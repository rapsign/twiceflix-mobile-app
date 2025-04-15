import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

export default function Header({ title = "TWICEFLIX" }) {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleSearchPress}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "red",
    fontSize: 28,
    fontWeight: "bold",
  },
});
