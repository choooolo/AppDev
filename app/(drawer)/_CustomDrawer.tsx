// app/(drawer)/CustomDrawer.tsx
import { RootState } from "@/store";
import { darkTheme, lightTheme } from "@/theme";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function CustomDrawer(props: any) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: theme.background }}
    >
      {/* Header with Profile */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/the-x-factor/images/a/a9/Jamesarthur.jpg/revision/latest?cb=20151123150032",
          }}
          style={styles.avatar}
        />
        <Text style={[styles.username, { color: theme.text }]}>James Barthur</Text>
        <Text style={[styles.email, { color: theme.text }]}>jamesbarthur@email.com</Text>
      </View>

      {/* Drawer Items */}
      <View style={{ flex: 1, backgroundColor: theme.background, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
      <View style={[styles.footer, { borderTopColor: darkMode ? "#333" : "#ccc" }]}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            router.replace("/spotify");
          }}
        >
          <Text style={[styles.logoutText, { color: theme.primary }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
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
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    opacity: 0.8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  logoutButton: {
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
