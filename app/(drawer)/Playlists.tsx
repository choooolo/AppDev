import { RootState } from "@/store"; // ✅ adjust path if different
import { darkTheme, lightTheme } from "@/theme"; // ✅ same theme file as HomeScreen
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

const playlists = [
  { id: "1", title: "Chill Vibes", cover: require("@/assets/images/chillvibes.webp") },
  { id: "2", title: "Workout Mix", cover: require("@/assets/images/workout.jpg") },
  { id: "3", title: "Top Hits", cover: require("@/assets/images/tophits.jpeg") },
  { id: "4", title: "Relax & Study", cover: require("@/assets/images/workout.jpg") },
];

export default function PlaylistsScreen() {
  // read darkMode from Redux
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  // small helpers
  const cardBg = darkMode ? "#1e1e1e" : "#f5f5f5";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Your Playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.playlistCard, { backgroundColor: cardBg }]}
            onPress={() => alert(`Opening ${item.title}`)}
          >
            <Image source={item.cover} style={styles.cover} />
            <Text style={[styles.playlistText, { color: theme.text }]}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  playlistCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
  },
  cover: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 15,
  },
  playlistText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
