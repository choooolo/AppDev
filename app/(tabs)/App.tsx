// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./homescreen";
import SearchScreen from "./searchscreen";
import LibraryScreen from "./libraryscreen";
import CreateScreen from "./createscreen";
import ProfileDrawer from "./profiledrawer";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// ✅ Tabs include HomeScreen now
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Your Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ✅ Drawer wraps the Tabs
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <ProfileDrawer {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen
          name="MainTabs"
          component={Tabs}
          options={{ drawerLabel: "Spotify" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
