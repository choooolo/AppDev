import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function ProfileDrawer() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("Pressed Profile Drawer")}>
        <Text style={styles.text}>Pressing Profile Drawer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { color: "#fff", fontSize: 20 },
});
