import { createDrawerNavigator } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import { PlaylistProvider } from "../context/PlaylistContext";
import CustomDrawer from "./_CustomDrawer";

const { Navigator } = createDrawerNavigator();
const Drawer = withLayoutContext(Navigator);

export default function DrawerLayout() {
  return (
    <PlaylistProvider>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: { backgroundColor: "#121212", width: 250 },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            drawerLabelStyle: { color: "#fff" },
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            drawerLabelStyle: { color: "#fff" },
            title: "Profile",
          }}
        />
        <Drawer.Screen
          name="PrivacySecurity"
          options={{
            drawerLabel: "Privacy & Security",
            drawerLabelStyle: { color: "#fff" },
            title: "Privacy & Security",
          }}
        />
        <Drawer.Screen
          name="PlaylistDetail"
          options={{
            drawerLabel: "Playlists",
            drawerLabelStyle: { color: "#fff" },
            title: "Playlists",
          }}
        />
      </Drawer>
    </PlaylistProvider>
  );
}
