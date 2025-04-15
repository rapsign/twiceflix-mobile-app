import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Header from "../components/header";
import HeroSection from "../components/heroSection";

export default function HomeScreen({ navigation }) {
  const handleSearchPress = () => {
    navigation.navigate("Search");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heroContainer}>
        <HeroSection />
        <View style={styles.headerWrapper}>
          <Header onSearchPress={handleSearchPress} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  heroContainer: {
    flex: 1,
    position: "relative",
  },
  headerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});
