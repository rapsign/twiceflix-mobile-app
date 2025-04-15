import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const json = await AsyncStorage.getItem("searchHistory");
      if (json != null) {
        setHistory(JSON.parse(json));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  };
  const saveToHistory = async (text) => {
    try {
      const updated = [text, ...history.filter((item) => item !== text)];
      setHistory(updated);
      await AsyncStorage.setItem("searchHistory", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  };
  const handleSubmit = () => {
    if (search.trim() !== "") {
      saveToHistory(search.trim());
      setSearch("");
    }
  };
  const removeFromHistory = async (itemToRemove) => {
    try {
      const filtered = history.filter((item) => item !== itemToRemove);
      setHistory(filtered);
      await AsyncStorage.setItem("searchHistory", JSON.stringify(filtered));
    } catch (e) {
      console.error("Failed to remove item from history", e);
    }
  };
  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("searchHistory");
      setHistory([]);
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
          />
        </View>
      </View>
      {search.trim() === "" && (
        <View style={{ marginHorizontal: 16 }}>
          {history.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  color: "#ccc",
                  fontSize: 16,
                  paddingHorizontal: 10,
                  fontWeight: "bold",
                }}
              >
                Recent
              </Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={{ color: "red", fontSize: 16 }}>Clear All</Text>
              </TouchableOpacity>
            </View>
          )}
          {history.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setSearch(item)}
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Ionicons
                  name="search"
                  size={18}
                  color="#999"
                  style={{ marginHorizontal: 10 }}
                />
                <Text
                  style={{ color: "#ccc", fontSize: 16, paddingHorizontal: 20 }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFromHistory(item)}>
                <Ionicons name="close" size={18} color="#999" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 20,
    marginVertical: 10,
  },
  backButton: {
    marginRight: 8,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  input: {
    color: "white",
    paddingVertical: 10,
    fontSize: 20,
  },
});
