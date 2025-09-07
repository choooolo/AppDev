import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [privateSession, setPrivateSession] = useState(false);
  const [listeningActivity, setListeningActivity] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(true);

  const theme = darkMode
    ? {
        background: "black",
        text: "white",
        subtext: "#aaa",
        border: "#222",
      }
    : {
        background: "white",
        text: "black",
        subtext: "#555",
        border: "#ddd",
      };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text, marginTop: 20 }]}>
        Privacy & Security
      </Text>

      {/* Dark Mode Toggle */}
      <View style={styles.settingRow}>
        <View style={styles.textContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>
            Dark Mode
          </Text>
          <Text style={[styles.settingSubtitle, { color: theme.subtext }]}>
            Switch between light and dark theme.
          </Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#555", true: "#1DB954" }}
          thumbColor={"#fff"}
        />
      </View>

      {/* Private Session */}
      <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>
            Private Session
          </Text>
          <Text style={[styles.settingSubtitle, { color: theme.subtext }]}>
            Temporarily hide what you’re listening to.
          </Text>
        </View>
        <Switch
          value={privateSession}
          onValueChange={setPrivateSession}
          trackColor={{ false: "#555", true: "#1DB954" }}
          thumbColor={"#fff"}
        />
      </View>

      {/* Listening Activity */}
      <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>
            Listening Activity
          </Text>
          <Text style={[styles.settingSubtitle, { color: theme.subtext }]}>
            Share what you listen to with your followers.
          </Text>
        </View>
        <Switch
          value={listeningActivity}
          onValueChange={setListeningActivity}
          trackColor={{ false: "#555", true: "#1DB954" }}
          thumbColor={"#fff"}
        />
      </View>

      {/* Data Sharing */}
      <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>
            Data Sharing
          </Text>
          <Text style={[styles.settingSubtitle, { color: theme.subtext }]}>
            Allow Spotify to share data with partners.
          </Text>
        </View>

        <Switch
          value={dataSharing}
          onValueChange={setDataSharing}
          trackColor={{ false: "#555", true: "#1DB954" }}
          thumbColor={"#fff"}
        />

      </View>

      {/* Personalized Ads */}
      <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>
            Personalized Ads
          </Text>
          <Text style={[styles.settingSubtitle, { color: theme.subtext }]}>
            Get ads tailored to your listening habits.
          </Text>
        </View>
        <Switch
          value={personalizedAds}
          onValueChange={setPersonalizedAds}
          trackColor={{ false: "#555", true: "#1DB954" }}
          thumbColor={"#fff"}
        />
      </View>

      {/* Extra Options */}
      {/* Extra Options */}
      <TouchableOpacity style={[styles.option, { borderBottomColor: theme.border }]}>
        <Text style={[styles.optionText, { color: theme.text }]}>
          Download Your Data
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, { borderBottomColor: theme.border }]}>
        <Text style={[styles.optionText, { color: theme.text }]}>
          Manage Consent
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, { borderBottomColor: theme.border }]}>
        <Text style={[styles.optionText, { color: "#f55" }]}>
          Delete Account
        </Text>
      </TouchableOpacity>

      {/* Logout Option */}
      <TouchableOpacity
        style={[styles.option, { borderBottomColor: theme.border }]}
        onPress={() => router.push("/spotify")} // 👈 this navigates to spotify.tsx
      >
        <Text style={[styles.optionText, { color: theme.text }]}>
          Logout
        </Text>
      </TouchableOpacity>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});
