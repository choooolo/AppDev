import { Image } from 'expo-image';
import { StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'transparent', dark: 'transparent' }}
      headerImage={
        <Image
          source={require('@/assets/images/carsoutside.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
       <ThemedText
         type="title"
         numberOfLines={1}
         adjustsFontSizeToFit
         style={styles.welcomeText}
       >
          Cars Outside
       </ThemedText>
        <ThemedView style={styles.buttonRow}>
          <Button title="Go to My Info" onPress={() => router.push("/info")} />
          <Button title="Spotify" onPress={() => router.push("/spotify")} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.lyricsText}>
          {`I'm packin' my bags that I didn't unpack the last time
            I'm sayin', "See you again, " so many times, it's becoming my tagline
            But you know the truth, I'd rather hold you
            Than try to catch this flight
            So many things I'd rather say
            But for now, it's goodbye
            You say I'm always leavin'
            You, when you're sleepin' alone
            But the, the car's outside
            But I don't wanna go tonight
            I'm not gettin' in the Addison Lee
            Unless you pack your bags
            You're comin' with me
            I'm tired of lovin' from afar
            And never being where you are
            Close the windows, lock the doors
            Don't wanna leave you anymore
            Oh-oh, ah
            I'm starin' at the same four walls in a different hotel
            It's an unfamiliar feelin' but I know it so well
            Oh, but you know the truth, I'd rather hold you
            Than this mobile in my hand
            But I guess it'll do, 'cause for you
            I would run up my phone bill
            You say I'm always leavin'
            You, when you need me the most
            But the, the car's outside
            But I don't wanna go tonight
            I'm not gettin' in the Addison Lee
            Unless you pack your bags
            You're comin' with me
            I'm tired of lovin' from afar
            And never being where you are
            Close the windows, lock the doors
            Don't wanna leave you anymore
            Ooh-ooh, ah
            Ooh-ooh, ah
            Ooh-ooh, ah
            Don't wanna leave you anymore
            Oh, darling, all of the city lights
            Never shine as bright as your eyes
            I would trade them all for a minute more
            But the car's outside
            And he's called me twice
            But he's gonna have to wait tonight
            I'm not gettin' in the Addison Lee
            Unless you pack your bags
            You're comin' with me
            I'm tired of lovin' from afar
            And never being where you are
            Close the windows, lock the doors
            Don't wanna leave you anymore
            Ooh-ooh, ah
            Ooh-ooh, ah
            Ooh-ooh, ah
            No, I don't wanna leave you anymore
            I don't wanna leave you
            (Ooh-ooh, ah) I don't wanna leave you
            (Ooh-ooh, ah) I don't wanna leave you
            Don't wanna leave you anymore`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: '100%' ,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  lyricsText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 20,
    marginVertical: 20,
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },

});
