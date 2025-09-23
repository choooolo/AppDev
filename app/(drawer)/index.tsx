// HomeScreen.tsx
import profilePic from "@/assets/images/jaems arthur.webp";
import { RootState } from "@/store"; // adjust if your store is elsewhere
import { darkTheme, lightTheme } from "@/theme"; // your theme definitions
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const [selected, setSelected] = useState("All");
  const navigation = useNavigation();

  const categories = ["All", "Music", "Podcasts"];

  // read darkMode from Redux
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  const recentPlaylists = [
    {
      id: "1",
      title: "Top Hits",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGJipXM41x77wKO8KgSEXEz3hLRpMhsKW8OA&s",
    },
    {
      id: "2",
      title: "Chill Vibes",
      cover:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84208adb263349d9c836439816",
    },
    {
      id: "3",
      title: "Workout",
      cover:
        "https://i.scdn.co/image/ab67706f0000000200c9055ea56a14e14975ec1d",
    },
    {
      id: "4",
      title: "Party Mix",
      cover:
        "https://i.scdn.co/image/ab67616d0000b273dbbecb3d89a9b760716d9f08",
    },
    {
      id: "5",
      title: "Focus",
      cover:
        "https://i.scdn.co/image/ab67706f000000026020f2f6476db518ef747da4",
    },
    {
      id: "6",
      title: "Relax",
      cover:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84cf33878980e0ae7b4b6e5381",
    },
    {
      id: "7",
      title: "Indie Mix",
      cover:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8470182ce1d0288d9cbce5fc0c",
    },
    {
      id: "8",
      title: "Pop Rising",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM19DlIDRFc-z8oFXH0gQ9_F-6BHjDSbRTAw&s",
    },
  ];

  const hits = [
    {
      id: "1",
      title: "Hot Hits PH",
      cover:
        "https://astig.ph/wp-content/uploads/2022/04/Hot-Hits-Philippines.jpeg",
    },
    {
      id: "2",
      title: "Global Top 50",
      cover:
        "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg",
    },
    {
      id: "3",
      title: "Pop Hits",
      cover:
        "https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg",
    },
  ];

  const radios = [
    {
      id: "1",
      title: "Ed Sheeran Radio",
      cover:
        "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/6eUKZXaKkcviH0Ku9w2n3V/en-GB",
    },
    {
      id: "2",
      title: "Ariana Grande Radio",
      cover:
        "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/66CXWjxzNUsdJxJ2JdwvnR/en",
    },
    {
      id: "3",
      title: "Drake Radio",
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8KMVz1_fGjqksk5_1FqCvsUV1dPjIeiEXpA&s",
    },
  ];

  // small helpers for colors used in several places
  const cardBg = darkMode ? "#1e1e1e" : "#f5f5f5";
  const categoryBg = darkMode ? "#222" : "#eee";
  const bottomBg = darkMode ? "#000" : "#fff";
  const inactiveText = darkMode ? "#aaa" : "#666";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image source={profilePic} style={styles.profileImage} />
        </TouchableOpacity>

        <View style={styles.categoryContainer}>
          {categories.map((cat) => {
            const isSelected = selected === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelected(cat)}
                style={[
                  styles.categoryButton,
                  { backgroundColor: isSelected ? "#1DB954" : categoryBg, marginRight: 10 },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: isSelected ? "#000" : theme.text },
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Recently Played */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recently Played</Text>
        <View style={styles.grid}>
          {recentPlaylists.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.gridItem, { backgroundColor: cardBg }]}
            >
              <Image source={{ uri: item.cover }} style={styles.gridImage} resizeMode="cover" />
              <Text style={[styles.gridText, { color: theme.text }]} numberOfLines={1}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Hits of Yesterday and Today */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Hits of Yesterday and Today</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {hits.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.cover }} style={styles.cardImage} resizeMode="cover" />
              <Text style={[styles.cardText, { color: theme.text }]}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Popular Radio */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Popular Radio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {radios.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.cover }} style={styles.cardImage} resizeMode="cover" />
              <Text style={[styles.cardText, { color: theme.text }]}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.bottomNav, { backgroundColor: bottomBg, borderTopColor: darkMode ? "#333" : "#ccc" }]}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="#1DB954" />
          <Text style={[styles.navTextActive, { color: "#1DB954" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color={inactiveText} />
          <Text style={[styles.navText, { color: inactiveText }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="library-outline" size={24} color={inactiveText} />
          <Text style={[styles.navText, { color: inactiveText }]}>Your Library</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color={inactiveText} />
          <Text style={[styles.navText, { color: inactiveText }]}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 16 },
  categoryContainer: { flexDirection: "row", alignItems: "center" },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  categorySelected: { backgroundColor: "#1DB954" },
  categoryText: { fontSize: 14 },
  categoryTextSelected: { color: "#000", fontWeight: "bold" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    marginVertical: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  gridItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 8,
    padding: 6,
  },
  gridImage: { width: 50, height: 50, borderRadius: 4, marginRight: 8 },
  gridText: { fontSize: 14, flexShrink: 1 },
  card: { marginLeft: 16, width: 120 },
  cardImage: { width: 120, height: 120, borderRadius: 8, marginBottom: 6 },
  cardText: { fontSize: 14 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 0.5,
  },
  navText: { fontSize: 12, textAlign: "center", marginTop: 4 },
  navTextActive: { fontSize: 12, textAlign: "center", marginTop: 4 },
});
