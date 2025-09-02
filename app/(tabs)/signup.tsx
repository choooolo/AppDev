import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  return (
    <ScrollView className="flex-1 bg-black px-6 pt-12">
      {/* Header */}
      <Text className="text-white text-3xl font-bold text-center mb-6">
        Sign up for free to start listening
      </Text>

      {/* Social Buttons */}
      <TouchableOpacity className="bg-[#1877F2] rounded-full py-3 mb-3">
        <Text className="text-white text-center font-semibold">
          Sign up with Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="border border-gray-400 rounded-full py-3 mb-6">
        <Text className="text-white text-center font-semibold">
          Sign up with Google
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-[1px] bg-gray-600" />
        <Text className="text-gray-400 mx-3">or</Text>
        <View className="flex-1 h-[1px] bg-gray-600" />
      </View>

      {/* Email */}
      <Text className="text-white text-base font-bold mb-2">What's your email?</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        className="bg-white text-black px-4 py-3 rounded-md mb-6"
      />

      {/* Password */}
      <Text className="text-white text-base font-bold mb-2">Create a password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Create a password"
        placeholderTextColor="#aaa"
        secureTextEntry
        className="bg-white text-black px-4 py-3 rounded-md mb-6"
      />

      {/* Name */}
      <Text className="text-white text-base font-bold mb-2">What should we call you?</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter a profile name"
        placeholderTextColor="#aaa"
        className="bg-white text-black px-4 py-3 rounded-md mb-6"
      />

      {/* Date of Birth */}
      <Text className="text-white text-base font-bold mb-2">What's your date of birth?</Text>
      <TextInput
        value={dob}
        onChangeText={setDob}
        placeholder="DD/MM/YYYY"
        placeholderTextColor="#aaa"
        className="bg-white text-black px-4 py-3 rounded-md mb-6"
      />

      {/* Gender */}
      <Text className="text-white text-base font-bold mb-2">What's your gender?</Text>
      <View className="flex-row justify-between mb-6">
        {["Male", "Female", "Non-binary"].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setGender(option)}
            className={`px-5 py-3 rounded-full border ${
              gender === option ? "bg-green-500 border-green-500" : "border-gray-500"
            }`}
          >
            <Text
              className={`font-semibold ${
                gender === option ? "text-black" : "text-white"
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Terms & Conditions */}
      <Text className="text-gray-400 text-xs mb-6">
        By signing up, you agree to Spotify’s Terms of Service and Privacy Policy.
      </Text>

      {/* Submit Button */}
      <TouchableOpacity className="bg-green-500 rounded-full py-4 mb-6">
        <Text className="text-black text-center font-bold text-base">Sign Up</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="flex-row justify-center mb-10">
        <Text className="text-gray-400">Already have an account? </Text>
        <TouchableOpacity>
          <Text className="text-white font-semibold">Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
