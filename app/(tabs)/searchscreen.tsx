import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("Pressed Search")}>
        <Text style={styles.text}>Pressing Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { color: "#fff", fontSize: 20 },
});
