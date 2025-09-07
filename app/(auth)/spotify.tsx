import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, Image, Text, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

export default function SpotifyLogin() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      {/* Spotify Logo */}
      <Image source={require("@/assets/images/spotify.png")} style={styles.logo} />
      <ThemedText type="title" style={styles.title}>Spotify</ThemedText>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email or username"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotContainer} onPress={() => alert("Forgot password pressed")}>
        <Text style={styles.forgotText}>Forgot your password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => {

          router.push("/"); // Navigate to homepage
        }}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Be connect with */}
      <Text style={styles.connectText}>Be connect with</Text>

      {/* Social Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => alert("Facebook login pressed")}>
          <Image source={require("@/assets/images/facebook.png")} style={styles.socialIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert("Google login pressed")}>
          <Image source={require("@/assets/images/google.png")} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Sign Up Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.footerLink}>Sign Up</Text>

        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    color: "white",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    backgroundColor: "#121212",
    color: "white",
    marginBottom: 15,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#1DB954",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  signInText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },
  forgotText: {
    color: "#808080",
    fontSize: 14,
  },
  connectText: {
    color: "#1DB954",
    fontSize: 16,
    marginTop: 25,
    marginBottom: 15,
    fontWeight: "bold",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  socialIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 6,
  },

  socialIcon: {
    width: 28,
    height: 28,
    tintColor: "white", // ensures logo stays white
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    color: "gray",
    fontSize: 14,
  },
  footerLink: {
    color: "#1DB954",
    fontWeight: "bold",
    fontSize: 14,
  },
  backButton: {
    marginTop: 30,
  },
  backText: {
    color: "white",
    fontSize: 16,
  },
});
