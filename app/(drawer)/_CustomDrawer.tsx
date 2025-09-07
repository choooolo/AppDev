// app/(drawer)/CustomDrawer.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { router } from "expo-router";
export default function CustomDrawer(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Header with Profile */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/the-x-factor/images/a/a9/Jamesarthur.jpg/revision/latest?cb=20151123150032", // replace with your profile image
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>James Barthur</Text>
        <Text style={styles.email}>jamesbarthur@email.com</Text>
      </View>

      {/* Drawer Items */}
      <View style={{ flex: 1, backgroundColor: "#121212", paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            // TODO: clear auth/session if needed
            router.replace("/spotify"); // redirect to your login page
          }}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1DB954",
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  logoutButton: {
    paddingVertical: 12,
  },
  logoutText: {
    color: "#1DB954",
    fontSize: 16,
    fontWeight: "bold",
  },
});
