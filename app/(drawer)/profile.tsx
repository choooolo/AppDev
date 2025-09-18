import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useReducer, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  Layout,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

// ---------------- Reducer for Undo/Redo -----------------
type State = {
  past: any[];
  present: any[];
  future: any[];
};

type Action =
  | { type: "ADD_PLAYLIST"; payload: any }
  | { type: "REMOVE_PLAYLIST"; payload: string }
  | { type: "CLEAR" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_STATE"; payload: any[] };

const initialState: State = {
  past: [],
  present: [],
  future: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PLAYLIST":
      return {
        past: [...state.past, state.present],
        present: [...state.present, action.payload],
        future: [],
      };
    case "REMOVE_PLAYLIST":
      return {
        past: [...state.past, state.present],
        present: state.present.filter((pl) => pl.id !== action.payload),
        future: [],
      };
    case "CLEAR":
      return {
        past: [...state.past, state.present],
        present: [],
        future: [],
      };
    case "UNDO": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
      };
    }
    case "SET_STATE":
      return { ...state, present: action.payload };
    default:
      return state;
  }
}

// ---------------- Component -----------------
export default function ProfileScreen() {
  const router = useRouter();

  // Profile edit modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Playlist modal
  const [isPlaylistModalVisible, setPlaylistModalVisible] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [newPlaylistCover, setNewPlaylistCover] = useState("");

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // Form state
  const [form, setForm] = useState({
    name: "Your Name",
    username: "@username",
    email: "",
    genre: "",
    profileImage: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
  });

  // Shake animation
  const shakeAnim = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeAnim.value }],
  }));
  const triggerShake = () => {
    shakeAnim.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  // Load playlists from storage
  useEffect(() => {
    const loadData = async () => {
      const storedPlaylists = await AsyncStorage.getItem("playlists");
      if (storedPlaylists) {
        dispatch({ type: "SET_STATE", payload: JSON.parse(storedPlaylists) });
      } else {
        dispatch({
          type: "SET_STATE",
          payload: [
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
          ],
        });
      }

      // Load profile form
      const storedProfile = await AsyncStorage.getItem("profile_form");
      if (storedProfile) {
        setForm(JSON.parse(storedProfile));
      }
    };
    loadData();
  }, []);

  // Save playlists to storage
  useEffect(() => {
    AsyncStorage.setItem("playlists", JSON.stringify(state.present));
  }, [state.present]);

  // Save profile to storage
  const handleSubmit = async () => {
    if (errors.username || errors.email) {
      triggerShake();
      return;
    }
    try {
      await AsyncStorage.setItem("profile_form", JSON.stringify(form));
      Alert.alert("Saved", "Profile updated successfully!");
      setModalVisible(false);
    } catch (e) {
      console.warn("save failed", e);
    }
  };

  const onChangeField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addPlaylist = () => {
    if (!newPlaylistTitle.trim()) return;
    const newPlaylist = {
      id: Date.now().toString(),
      title: newPlaylistTitle,
      cover: newPlaylistCover || "https://via.placeholder.com/150",
      songs: 0,
    };
    dispatch({ type: "ADD_PLAYLIST", payload: newPlaylist });
    setNewPlaylistTitle("");
    setNewPlaylistCover("");
    setPlaylistModalVisible(false);
  };

  const removePlaylist = (id: string) => {
    dispatch({ type: "REMOVE_PLAYLIST", payload: id });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri:
              form.profileImage ||
              "https://static.wikia.nocookie.net/the-x-factor/images/a/a9/Jamesarthur.jpg/revision/latest?cb=20151123150032",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{form.name}</Text>
        <Text style={styles.profileUsername}>{form.username}</Text>
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

      {/* Playlists Section */}
      <View style={styles.section}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.sectionTitle}>Playlists</Text>
          <TouchableOpacity onPress={() => setPlaylistModalVisible(true)}>
            <Text style={{ color: "#1DB954", fontSize: 26 }}>＋</Text>
          </TouchableOpacity>
        </View>

        {state.present.map((pl) => (
          <Animated.View
            key={pl.id}
            style={styles.card}
            exiting={SlideOutLeft.duration(400)}
            layout={Layout.springify()}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", flex: 1 }}
              onPress={() =>
                router.push({
                  pathname: "/PlaylistDetail",
                  params: { id: pl.id, title: pl.title },
                })
              }
            >
              <Image source={{ uri: pl.cover }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{pl.title}</Text>
                <Text style={styles.cardSubtitle}>{pl.songs} songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removePlaylist(pl.id)}>
              <Text style={{ color: "red", fontSize: 14 }}>Remove</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {["Account", "Notifications", "Privacy", "Help"].map((item) => (
          <TouchableOpacity key={item} style={styles.settingsItem}>
            <Text style={{ color: "white", fontSize: 16 }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modals */}
      {/* Profile Edit Modal */}
      <Modal transparent visible={isModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainerFixed}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              {/* Upload Profile Picture */}
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={async () => {
                  const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                  });
                  if (!result.canceled && result.assets && result.assets[0]?.uri) {
                    setForm((prev) => ({ ...prev, profileImage: result.assets[0].uri }));
                  }
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
                  {form.profileImage ? "Change Profile Picture" : "Upload Profile Picture"}
                </Text>
              </TouchableOpacity>

              {form.profileImage && (
                <Animated.View entering={FadeIn.duration(400)}>
                  <Image
                    source={{ uri: form.profileImage }}
                    style={{ width: 120, height: 120, borderRadius: 60, marginVertical: 16, alignSelf: "center" }}
                  />
                </Animated.View>
              )}

              {/* Name */}
              <Animated.View style={shakeStyle}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="#888"
                  value={form.name}
                  onChangeText={(v) => onChangeField("name", v)}
                  style={styles.input}
                />
              </Animated.View>

              {/* Username */}
              <Animated.View style={shakeStyle}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#888"
                  value={form.username}
                  onChangeText={(v) => {
                    onChangeField("username", v);
                    if (!/^[a-zA-Z0-9_]{3,20}$/.test(v)) {
                      setErrors((prev) => ({
                        ...prev,
                        username:
                          "Username must be 3–20 characters, letters/numbers/underscores only.",
                      }));
                    } else {
                      setErrors((prev) => ({ ...prev, username: "" }));
                    }
                  }}
                  style={[styles.input, errors.username ? { borderColor: "red", borderWidth: 1 } : null]}
                />
                {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
              </Animated.View>

              {/* Email */}
              <Animated.View style={shakeStyle}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#888"
                  value={form.email}
                  onChangeText={(v) => {
                    onChangeField("email", v);
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
                      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
                    } else {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  style={[styles.input, errors.email ? { borderColor: "red", borderWidth: 1 } : null]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </Animated.View>

              {/* Genre */}
              <Text style={{ color: "white", marginBottom: 8 }}>Favorite Genre</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}>
                {["Pop", "Rock", "Jazz", "Hip-Hop"].map((g) => {
                  const selected = form.genre === g;
                  return (
                    <TouchableOpacity
                      key={g}
                      onPress={() => onChangeField("genre", g)}
                      style={[styles.genreBtn, selected && styles.genreBtnSelected, { marginRight: 8, marginBottom: 8 }]}
                    >
                      <Text style={[styles.genreText, selected && styles.genreTextSelected]}>{g}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Buttons */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                <TouchableOpacity onPress={handleSubmit} style={[styles.submitBtn, { flex: 1, marginRight: 8 }]}>
                  <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>Save Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setForm({ name: "", username: "", email: "", genre: "", profileImage: "" });
                    setErrors({ username: "", email: "" });
                    AsyncStorage.removeItem("profile_form");
                  }}
                  style={[styles.submitBtn, { backgroundColor: "#444", flex: 1, marginLeft: 8 }]}
                >
                  <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>Reset</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 16, alignSelf: "center" }}>
                <Text style={{ color: "#1DB954", fontWeight: "700" }}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Playlist Add Modal */}
      <Modal transparent visible={isPlaylistModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>New Playlist</Text>

            <TextInput
              style={styles.input}
              placeholder="Playlist name"
              placeholderTextColor="#aaa"
              value={newPlaylistTitle}
              onChangeText={setNewPlaylistTitle}
            />

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={async () => {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 1,
                });
                if (!result.canceled && result.assets && result.assets[0]?.uri) {
                  setNewPlaylistCover(result.assets[0].uri);
                }
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {newPlaylistCover ? "Change Cover Image" : "Upload Cover Image"}
              </Text>
            </TouchableOpacity>

            {newPlaylistCover && (
              <Image
                source={{ uri: newPlaylistCover }}
                style={{ width: 80, height: 80, borderRadius: 8, marginTop: 10 }}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setPlaylistModalVisible(false)}>
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

// ---------------- Styles -----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 16 },
  header: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  profileName: { color: "white", fontSize: 22, fontWeight: "bold" },
  profileUsername: { color: "#aaa", fontSize: 14 },
  buttonRow: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  followButton: { backgroundColor: "#1DB954", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, marginRight: 10 },
  moreButton: { backgroundColor: "#333", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  buttonText: { color: "white", fontSize: 14, fontWeight: "bold" },
  section: { marginBottom: 20 },
  sectionTitle: { color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  errorText: { color: "red", fontSize: 12, marginTop: 4 },
  input: { backgroundColor: "#111", color: "white", padding: 10, borderRadius: 8, marginBottom: 12 },
  submitBtn: { backgroundColor: "#1DB954", paddingVertical: 12, borderRadius: 8 },
  card: { flexDirection: "row", alignItems: "center", marginBottom: 12, backgroundColor: "#111", padding: 10, borderRadius: 10 },
  cardImage: { width: 60, height: 60, borderRadius: 4, marginRight: 10 },
  cardInfo: { flex: 1 },
  cardTitle: { color: "white", fontSize: 16, fontWeight: "bold" },
  cardSubtitle: { color: "#aaa", fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modalContainer: { backgroundColor: "#222", padding: 20, borderRadius: 10, width: "90%", maxWidth: 400, alignSelf: "center" },
  modalContainerFixed: { backgroundColor: "#222", padding: 20, borderRadius: 10, width: "90%", maxWidth: 400, height: "70%" },
  uploadButton: { backgroundColor: "#333", padding: 10, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  genreBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#333", borderRadius: 20 },
  genreBtnSelected: { backgroundColor: "#1DB954" },
  genreText: { color: "white" },
  genreTextSelected: { color: "black", fontWeight: "700" },
  modalTitle: { color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end", marginTop: 16 },
  cancelButton: { marginRight: 10 },
  confirmButton: { backgroundColor: "#1DB954", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  modalButtonText: { color: "white", fontSize: 14, fontWeight: "bold" },
  artistCard: { marginRight: 16, alignItems: "center" },
artistImage: { width: 80, height: 80, borderRadius: 40 },
artistName: { color: "white", marginTop: 6 },

  settingsItem: { paddingVertical: 12, borderBottomColor: "#333", borderBottomWidth: 1 },
});
