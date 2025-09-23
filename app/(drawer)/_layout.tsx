// app/(drawer)/_layout.tsx
import { RootState } from "@/store"; // ✅ adjust if your store is elsewhere
import { darkTheme, lightTheme } from "@/theme"; // ✅ the theme.ts file we created
import { createDrawerNavigator } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import { useSelector } from "react-redux";
import { PlaylistProvider } from "../context/PlaylistContext";
import CustomDrawer from "./_CustomDrawer";
const { Navigator } = createDrawerNavigator();
const Drawer = withLayoutContext(Navigator);
export default function DrawerLayout() {
 
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <PlaylistProvider>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { backgroundColor: theme.background, width: 250 },
          drawerLabelStyle: { color: theme.text },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
          }}
        />
        <Drawer.Screen
          name="PrivacySecurity"
          options={{
            drawerLabel: "Privacy & Security",
            title: "Privacy & Security",
          }}
        />
        <Drawer.Screen
          name="PlaylistDetail"
          options={{
            drawerLabel: "Playlists",
            title: "Playlists",
          }}
        />
      </Drawer>
    </PlaylistProvider>
  );
}
