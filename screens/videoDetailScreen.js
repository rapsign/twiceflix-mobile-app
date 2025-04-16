import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { getDocs, collection, where, query } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase/firebaseConfig";
import YoutubeIframe from "react-native-youtube-iframe";

const VideoDetailScreen = ({ route }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistsQuery = query(
          collection(db, "playlists"),
          where("__name__", "in", video.playlists)
        );
        const querySnapshot = await getDocs(playlistsQuery);

        const fetchedPlaylists = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    if (video?.playlists?.length) {
      fetchPlaylists();
    }
  }, [video]);
  const { video } = route.params;
  const navigation = useNavigation();
  const getYoutubeId = (url) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: video.thumbnail }} style={styles.image}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.videoContainer}>
          <YoutubeIframe
            height={220}
            play={true}
            videoId={getYoutubeId(video.youtube_url)}
            webViewProps={{
              allowsInlineMediaPlayback: true,
            }}
            initialPlayerParams={{
              autoplay: 1,
              modestbranding: 0,
              rel: 0,
              fs: 1,
            }}
          />
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.title}>{video.title}</Text>
        <View style={styles.badgeRow}>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.playlistBadge}>TWICE MV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.playlistBadge}>TWICE 2</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{video.description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default VideoDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backButton: {
    position: "absolute",
    top: "5%",
    left: "2%",
    color: "#fff",
    zIndex: 2,
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 3,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 10,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
  },

  content: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    zIndex: 2,
  },
  playlistBadge: {
    color: "#ccc",
    backgroundColor: "#333",
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  description: {
    fontSize: 16,
    color: "#fff",
  },
});
