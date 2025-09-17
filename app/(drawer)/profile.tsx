import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  // Profile state
  const [name, setName] = useState("Your Name");
  const [username, setUsername] = useState("@username");

  // Modal state for profile editing
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempUsername, setTempUsername] = useState(username);

  // Playlists state
  const [playlists, setPlaylists] = useState([
    {
      id: "1",
      title: "Liked Songs",
      cover: "https://misc.scdn.co/liked-songs/liked-songs-300.jpg",
      songs: 1234,
    },
    {
      id: "2",
      title: "Workout Mix",
      cover:
        "https://i.scdn.co/image/ab67706f0000000200c9055ea56a14e14975ec1d",
      songs: 98,
    },
  ]);

  // Modal for adding playlist
  const [isPlaylistModalVisible, setPlaylistModalVisible] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [newPlaylistCover, setNewPlaylistCover] = useState("");

  // Confirm profile changes
  const handleConfirm = () => {
    setName(tempName);
    setUsername(tempUsername);
    setModalVisible(false);
  };

  // Add new playlist
  const addPlaylist = () => {
    if (!newPlaylistTitle.trim()) return;
    const newPlaylist = {
      id: Date.now().toString(),
      title: newPlaylistTitle,
      cover: newPlaylistCover || "https://via.placeholder.com/150",
      songs: 0,
    };
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistTitle("");
    setNewPlaylistCover("");
    setPlaylistModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/the-x-factor/images/a/a9/Jamesarthur.jpg/revision/latest?cb=20151123150032",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileUsername}>{username}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Playlists Section */}
      <View style={styles.section}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.sectionTitle}>Playlists</Text>
          <TouchableOpacity onPress={() => setPlaylistModalVisible(true)}>
            <Text style={{ color: "#1DB954", fontSize: 26 }}>＋</Text>
          </TouchableOpacity>
        </View>

        {playlists.map((pl) => (
          <View key={pl.id} style={styles.card}>
            <Image source={{ uri: pl.cover }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{pl.title}</Text>
              <Text style={styles.cardSubtitle}>{pl.songs} songs</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Artists Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Artists You Follow</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            {
              name: "Drake",
              uri: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
            },
            {
              name: "Taylor Swift",
              uri: "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
            },
            {
              name: "Ed Sheeran",
              uri: "https://i.scdn.co/image/ab67616d0000b2736567a393a964a845a89b7f70",
            },
            {
              name: "Ariana Grande",
              uri: "https://i.scdn.co/image/ab67616d0000b27355b8f4c3458e256eca14f18f",
            },
            {
              name: "The Weeknd",
              uri: "https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
            },
          ].map((artist, i) => (
            <View key={i} style={styles.artistCard}>
              <Image source={{ uri: artist.uri }} style={styles.artistImage} />
              <Text style={styles.artistName}>{artist.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingsOption}>
          <Text style={styles.settingsText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsOption}>
          <Text style={styles.settingsText}>Playback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsOption}>
          <Text style={styles.settingsText}>Privacy & Security</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsOption}
          onPress={() => router.push("/spotify")}
        >
          <Text style={styles.settingsText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Edit Modal */}
      <Modal transparent visible={isModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#aaa"
              value={tempName}
              onChangeText={setTempName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor="#aaa"
              value={tempUsername}
              onChangeText={setTempUsername}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Playlist Add Modal */}
      {/* Playlist Add Modal */}
<Modal transparent visible={isPlaylistModalVisible} animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>New Playlist</Text>

      {/* Playlist Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Playlist name"
        placeholderTextColor="#aaa"
        value={newPlaylistTitle}
        onChangeText={setNewPlaylistTitle}
      />

      {/* Upload Cover Image */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });

          if (!result.canceled) {
            setNewPlaylistCover(result.assets[0].uri);
          }
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {newPlaylistCover ? "Change Cover Image" : "Upload Cover Image"}
        </Text>
      </TouchableOpacity>

      {/* Preview selected cover */}
      {newPlaylistCover ? (
        <Image
          source={{ uri: newPlaylistCover }}
          style={{ width: 80, height: 80, borderRadius: 8, marginTop: 10 }}
        />
      ) : null}

      {/* Buttons */}
      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setPlaylistModalVisible(false)}
        >
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={addPlaylist}>
          <Text style={styles.modalButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 16 },
  header: { alignItems: "center", marginBottom: 20 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: { color: "white", fontSize: 22, fontWeight: "bold" },
  profileUsername: { color: "#aaa", fontSize: 14 },
  buttonRow: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  followButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  moreButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: { color: "white", fontSize: 14, fontWeight: "bold" },
  section: { marginBottom: 20 },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 10,
  },
  cardImage: { width: 60, height: 60, borderRadius: 4, marginRight: 10 },
  cardInfo: { flex: 1 },
  cardTitle: { color: "white", fontSize: 16, fontWeight: "bold" },
  cardSubtitle: { color: "#aaa", fontSize: 12 },
  artistCard: { alignItems: "center", marginRight: 16 },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 6,
  },
  artistName: { color: "white", fontSize: 14 },
  settingsOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  settingsText: { color: "white", fontSize: 16 },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButton: {
  backgroundColor: "#333",
  padding: 10,
  borderRadius: 8,
  alignItems: "center",
  marginBottom: 12,
},

  modalContainer: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: { color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: {
    backgroundColor: "#111",
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end" },
  cancelButton: { marginRight: 10 },
  confirmButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalButtonText: { color: "white", fontSize: 14, fontWeight: "bold" },
});
