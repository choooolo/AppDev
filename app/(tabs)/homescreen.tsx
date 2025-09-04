import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.profileButton}
      >
        <Text style={{ color: "white" }}>☰</Text>
      </TouchableOpacity>

      <Text style={{ color: "white" }}>This is the Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  profileButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 50,
  },
});
