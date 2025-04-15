import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function VideoListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Videos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  text: { color: "red", fontSize: 24, fontWeight: "bold" },
});
