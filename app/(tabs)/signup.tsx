import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();
  const [gender, setGender] = useState("");

  return (
    <View style={styles.container}>
      {/* Spotify Logo */}
      <Image
        source={require("@/assets/images/spotify.png")} // place your Spotify logo here
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Spotify</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry />

      {/* Date of Birth */}
      <View style={styles.dobContainer}>
        <Text style={styles.label}>Date of Birth :</Text>
        <TextInput style={styles.dobInput} placeholder="DD" placeholderTextColor="#aaa" keyboardType="numeric" />
        <TextInput style={styles.dobInput} placeholder="MM" placeholderTextColor="#aaa" keyboardType="numeric" />
        <TextInput style={styles.dobInput} placeholder="YY" placeholderTextColor="#aaa" keyboardType="numeric" />
      </View>

      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === "Male" && styles.selectedGender]}
          onPress={() => setGender("Male")}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderButton, gender === "Female" && styles.selectedGender]}
          onPress={() => setGender("Female")}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Sign up with */}
      <Text style={styles.signUpWith}>Sign Up With</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>f</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>G</Text>
        </TouchableOpacity>
      </View>

      {/* Already have an account */}
      <TouchableOpacity onPress={() => router.push("/spotify")}>
        <Text style={styles.signInText}>
          Already have an account? <Text style={styles.link}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#111",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  dobContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  label: {
    color: "white",
    marginRight: 10,
  },
  dobInput: {
    flex: 1,
    backgroundColor: "#111",
    color: "white",
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    textAlign: "center",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  selectedGender: {
    borderColor: "#1DB954",
    backgroundColor: "#1DB95420",
  },
  genderText: {
    color: "white",
  },
  signupButton: {
    backgroundColor: "#1DB954",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  signupText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpWith: {
    color: "white",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  socialButton: {
    width: 28,
    height: 28,
    tintColor: "white",
  },
  socialText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInText: {
    color: "white",
    marginTop: 10,
  },
  link: {
    color: "#1DB954",
    fontWeight: "bold",
  },
});
