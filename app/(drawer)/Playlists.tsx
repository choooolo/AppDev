import React from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native";

const playlists = [
  { id: "1", title: "Chill Vibes", cover: require("@/assets/images/chillvibes.webp") },
  { id: "2", title: "Workout Mix", cover: require("@/assets/images/workout.jpg") },
  { id: "3", title: "Top Hits", cover: require("@/assets/images/tophits.jpeg") },
  { id: "4", title: "Relax & Study", cover: require("@/assets/images/workout.jpg") },
];

export default function PlaylistsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.playlistCard} onPress={() => alert(`Opening ${item.title}`)}>
            <Image source={item.cover} style={styles.cover} />
            <Text style={styles.playlistText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  playlistCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#1e1e1e",
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
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});