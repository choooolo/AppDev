import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function InfoScreen() {
  const router = useRouter();
  //test rani  putang inang yan
  // Social links
  const tiktokUrl = "https://www.tiktok.com/@jamesarthur23";
  const youtubeUrl = "https://www.youtube.com/channel/UCz4tgANd4yy8Oe0iXCdSWfA";
  const spotifyUrl = "https://open.spotify.com/artist/4IWBUUAFIplrNtaOHcJPRM";

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <Button title="← Back" onPress={() => router.push('/')} />
      </View>

      {/* Profile Picture */}
      <Image
        source={require('@/assets/images/jaems arthur.webp')}
        style={styles.profilePic}
      />

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Name: James Andrew Arthur</Text>
        <Text style={styles.infoText}>Age: 37</Text>
        <Text style={styles.infoText}>Location: Britain</Text>
        <Text style={styles.infoText}>Birthdate: 2 March 1988</Text>
      </View>

      {/* Social Links */}
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => Linking.openURL(tiktokUrl)}>
          <Image source={require('@/assets/images/tiktok.png')} style={styles.socialIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL(youtubeUrl)}>
          <Image source={require('@/assets/images/youtube.png')} style={styles.socialIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL(spotifyUrl)}>
          <Image source={require('@/assets/images/spotify.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Embedded Video */}
      <View style={styles.videoContainer}>
        <WebView
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
           source={{ uri: "https://www.youtube.com/watch?v=Jtauh8GcxBY&list=RDv27COkZT4GY&index=4" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginTop: 40,
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 8,
    color: 'white',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    gap: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  videoContainer: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});
