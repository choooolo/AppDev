import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function signup() {
  return (
    <View style={styles.container}>
      {/* Header Logo + Spotify */}
      <View style={styles.header}>
        <Image source={require("@/assets/images/spotify.png")} style={styles.logo} />
        <Text style={styles.headerText}>Spotify</Text>
      </View>

      {/* Email Address */}
      <TextInput placeholder="Email Address" style={styles.input} placeholderTextColor="#aaa" />

      {/* Full Name */}
      <TextInput placeholder="Full Name" style={styles.input} placeholderTextColor="#aaa" />

      {/* Password */}
      <TextInput placeholder="Password" secureTextEntry style={styles.input} placeholderTextColor="#aaa" />

      {/* Date of Birth */}
      <View style={styles.dobContainer}>
        <Text style={styles.dobLabel}>Date of Birth:</Text>
        <TextInput placeholder="DD" style={styles.dobInput} placeholderTextColor="#aaa" maxLength={2} keyboardType="numeric" />
        <TextInput placeholder="MM" style={styles.dobInput} placeholderTextColor="#aaa" maxLength={2} keyboardType="numeric" />
        <TextInput placeholder="YYYY" style={styles.dobInputYear} placeholderTextColor="#aaa" maxLength={4} keyboardType="numeric" />
      </View>

      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity style={styles.genderButton}>
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genderButton}>
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 20,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1DB954", // Spotify green
  },
  input: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    color: "#fff",
  },
  dobContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dobLabel: {
    color: "#1DB954",
    fontSize: 16,
    marginRight: 10,
    fontWeight: "600",
  },
  dobInput: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    width: 50,
    textAlign: "center",
    color: "#fff",
  },
  dobInputYear: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    width: 80,
    textAlign: "center",
    color: "#fff",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  genderText: {
    color: "#fff",
    fontSize: 16,
  },
});
