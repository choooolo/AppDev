import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useReducer, useRef, useState } from "react";
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const historyReducer = (state, action) => {
  const { past, present, future } = state;
  switch (action.type) {
    case "SET":
      return {
        past: action.payload.past ?? [],
        present: action.payload.present ?? [],
        future: action.payload.future ?? [],
      };
    case "ADD_SONG": {
      const next = [...present, action.payload];
      return { past: [...past, present], present: next, future: [] };
    }
    case "REMOVE_SONG": {
      const next = present.filter((_, i) => i !== action.payload.index);
      return { past: [...past, present], present: next, future: [] };
    }
    case "CLEAR":
      return { past: [...past, present], present: [], future: [] };
    case "UNDO": {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return { past: newPast, present: previous, future: [present, ...future] };
    }
    case "REDO": {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return { past: [...past, present], present: next, future: newFuture };
    }
    default:
      return state;
  }
};

export default function PlaylistDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const playlistId = params?.id ?? "default";
  const playlistTitle = params?.title ?? "Playlist";

  const [historyState, dispatch] = useReducer(historyReducer, {
    past: [],
    present: [],
    future: [],
  });

  const [songText, setSongText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const STORAGE_KEY = `playlist_history_${playlistId}`;
  const loadedRef = useRef(false);

  // Load
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          dispatch({ type: "SET", payload: JSON.parse(raw) });
        }
      } catch (e) {
        console.warn("Failed to load playlist:", e);
      } finally {
        loadedRef.current = true;
        setIsLoading(false);
      }
    })();
  }, [STORAGE_KEY]);

  // Save
  useEffect(() => {
    if (!loadedRef.current) return;
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(historyState));
      } catch (e) {
        console.warn("Failed to save playlist:", e);
      }
    })();
  }, [historyState, STORAGE_KEY]);

  const addSong = () => {
    const text = songText.trim();
    if (!text) return;
    const id = Date.now().toString();
    const title = text.startsWith("http") ? `YouTube: ${text}` : text;
    dispatch({ type: "ADD_SONG", payload: { id, title } });
    setSongText("");
  };

  const removeSong = (index) => {
    dispatch({ type: "REMOVE_SONG", payload: { index } });
  };

  const clearPlaylist = () => {
    Alert.alert("Clear playlist?", "This will remove all songs.", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: () => dispatch({ type: "CLEAR" }) },
    ]);
  };

  const undo = () => dispatch({ type: "UNDO" });
  const redo = () => dispatch({ type: "REDO" });

  const canUndo = historyState.past.length > 0;
  const canRedo = historyState.future.length > 0;

  const renderSong = ({ item, index }) => {
    const renderRightActions = () => (
      <View style={styles.swipeDelete}>
        <Text style={styles.removeText}>Delete</Text>
      </View>
    );
    return (
      <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={() => removeSong(index)}>
        <Animated.View
          entering={FadeIn.duration(220)}
          exiting={FadeOut.duration(180)}
          style={styles.songRow}
        >
          <Text style={styles.songTitle}>{item.title}</Text>
        </Animated.View>
      </Swipeable>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#0f1114" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{playlistTitle}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.addContainer}>
          <TextInput
            value={songText}
            onChangeText={setSongText}
            placeholder="Enter YouTube URL or song name..."
            placeholderTextColor="#888"
            style={styles.input}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addBtn} onPress={addSong}>
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity disabled={!canUndo} onPress={undo} style={[styles.actionBtn, !canUndo && styles.actionDisabled]}>
            <Text style={styles.actionText}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={!canRedo} onPress={redo} style={[styles.actionBtn, !canRedo && styles.actionDisabled]}>
            <Text style={styles.actionText}>Redo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearPlaylist} style={[styles.actionBtn, styles.clearBtn]}>
            <Text style={styles.actionText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {isLoading ? (
            <Text style={{ color: "#999", textAlign: "center", marginTop: 20 }}>Loading...</Text>
          ) : historyState.present.length === 0 ? (
            <Text style={{ color: "#999", textAlign: "center", marginTop: 20 }}>No songs yet.</Text>
          ) : (
            <FlatList
              data={historyState.present}
              keyExtractor={(item) => item.id}
              renderItem={renderSong}
              contentContainerStyle={{ paddingBottom: 40 }}
            />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 72,
    paddingTop: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f1114",
  },
  back: { color: "#1DB954", fontSize: 16 },
  title: { color: "white", fontSize: 18, fontWeight: "700", marginLeft: 8 },
  container: { flex: 1, padding: 16, backgroundColor: "#0f1114" },
  addContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: { flex: 1, backgroundColor: "#111214", color: "white", padding: 12, borderRadius: 8 },
  addBtn: { marginLeft: 8, backgroundColor: "#1DB954", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  addBtnText: { color: "white", fontWeight: "700" },
  actionsRow: { flexDirection: "row", marginTop: 12, gap: 8 },
  actionBtn: { flex: 1, alignItems: "center", backgroundColor: "#222426", paddingVertical: 10, borderRadius: 8 },
  actionText: { color: "white", fontWeight: "600" },
  actionDisabled: { opacity: 0.35 },
  clearBtn: { backgroundColor: "#6b1b1b" },
  listContainer: { flex: 1, marginTop: 14 },
  songRow: { padding: 16, backgroundColor: "#131415", borderRadius: 8, marginBottom: 10 },
  songTitle: { color: "white", fontSize: 16 },
  swipeDelete: { backgroundColor: "#6b1b1b", justifyContent: "center", alignItems: "flex-end", paddingHorizontal: 20, borderRadius: 8, marginBottom: 10 },
  removeText: { color: "#fff", fontWeight: "700" },
});
