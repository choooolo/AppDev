import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={require("@/assets/images/jaems arthur.webp")}
        style={styles.profilePic}
      />

      {/* User Info */}
      <Text style={styles.name}>Vince Jon Gonzalez</Text>
      <Text style={styles.email}>vince@example.com</Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => alert("Edit Profile")}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#b3b3b3",
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  editText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
