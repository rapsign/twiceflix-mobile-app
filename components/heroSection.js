import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

const HeroSection = () => {
  const [latestVideo, setLatestVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(
      collection(db, "videos"),
      orderBy("published_at", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const video = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))[0];
        setLatestVideo(video);
      },
      (error) => console.error("Error fetching video:", error)
    );
    return () => unsubscribe();
  }, []);

  const handlePlay = () => {
    if (latestVideo) {
      navigation.navigate("VideoPlayer", {
        youtubeUrl: latestVideo.youtube_url,
      });
    }
  };

  if (!latestVideo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: latestVideo.thumbnail }}
        style={[styles.backgroundImage, { height: height * 0.4 }]}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,1)", "transparent", "rgba(0,0,0,0.8)"]}
          style={[styles.vignette, { height: height * 0.4 }]}
          locations={[0, 0.5, 1]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
        />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{latestVideo.title}</Text>
          <Text style={styles.description}>{latestVideo.description}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
              <Ionicons name="play" size={20} color="black" />
              <Text style={styles.playText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="white"
              />
              <Text style={styles.infoText}>More Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HeroSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    zIndex: 50,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    position: "absolute",
    top: 80,
    paddingHorizontal: 15,
    zIndex: 10,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  playButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  playText: {
    color: "#000",
    marginLeft: 8,
    fontWeight: "bold",
  },
  infoButton: {
    backgroundColor: "rgba(255, 255, 255, 0.29)",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  infoText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
});
