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

         {/* Gender */}
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              {["Male", "Female"].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={styles.genderOption}
                  onPress={() => setGender(g)}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      gender === g && styles.radioOuterSelected,
                    ]}
                  >
                    {gender === g && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.genderText}>{g}</Text>
                </TouchableOpacity>
              ))}
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
      justifyContent: "space-around",
      width: "100%",
      marginBottom: 20,
    },
    genderOption: {
      flexDirection: "row",
      alignItems: "center",
    },
    radioOuter: {
      height: 24,              // ⬆️ slightly bigger
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "#A7A7A7",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
      backgroundColor: "black", // ⬅️ makes border visible
    },
    radioOuterSelected: {
      borderColor: "#1DB954",
    },
    radioInner: {
      height: 12,              // ⬆️ matches outer
      width: 12,
      borderRadius: 6,
      backgroundColor: "#1DB954",
    },
    genderText: {
      color: "white",
      fontSize: 16,
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