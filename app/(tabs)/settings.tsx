import React, { useState } from "react";
import { StyleSheet, View, Text, Switch, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Notification Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: "#767577", true: "#1DB954" }}
          thumbColor={notifications ? "#fff" : "#f4f3f4"}
        />
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#767577", true: "#1DB954" }}
          thumbColor={darkMode ? "#fff" : "#f4f3f4"}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.push("/signup")} // back to login/signup
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    color: "white",
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
