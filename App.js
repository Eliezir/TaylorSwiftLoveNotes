import React, { useEffect, useState, useRef } from "react";
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/FontAwesome";

import {
  StyleSheet,
  View,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator
} from "react-native";
import {
  getQuotes,
  photos,
  albumColor
} from "./src/services/quotesServices";


let backgroundTransition = "#e7e7e7"
export default function App() {
  let [fontsLoaded] = Font.useFonts({
    "Fearless (Taylor's Version)": require('./assets/fonts/Montserrat-Light.ttf'),
    "1989 (Taylor's Version)": require('./assets/fonts/PermanentMarker-Regular.ttf'),
    Evermore: require('./assets/fonts/IMFellDWPica-Italic.ttf'),
    Folklore: require('./assets/fonts/IMFellDWPica-Italic.ttf'),
    Lover: require('./assets/fonts/Satisfy-Regular.ttf'),
    "Red (Taylor's Version)": require('./assets/fonts/Anton-Regular.ttf'),
    Reputation: require('./assets/fonts/UnifrakturMaguntia-Regular.ttf'),
    "Speak Now": require('./assets/fonts/Rochester-Regular.ttf'),
    LyricsCaption: require('./assets/fonts/Gotham-Bold.otf'),
  })

  const [buttonText, setButtonText] = useState("Waiting for Taylor");
  const [img, setImg] = useState();
  const [quotesArray, setQuotesArray] = useState([]);
  const [lyrics, setLyrics] = useState(false);

  const [background] = useState(new Animated.Value(0));
  const [sharingBackground, setSharingBackground] = useState("transparent");
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [interpolatedColor, setInterpolatedColor] = useState(
    background.interpolate({
      inputRange: [0, 1],
      outputRange: ["#121212", "#121212"],
    })
  );
  const ShowQuotes = () => {
    let randomQuote = Math.floor(Math.random() * quotesArray.length);
    while (
      quotesArray[randomQuote].lyrics ===
      (lyrics ? lyrics.lyrics : null)
    ) {
      randomQuote = Math.floor(Math.random() * quotesArray.length);
    }

    setLyrics(quotesArray[randomQuote]);
    setImg(photos[quotesArray[randomQuote].album]);
    if(backgroundTransition != albumColor[quotesArray[randomQuote].album]){
    Animated.timing(progress, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(progress, {
        toValue: 1,
        duration: 1250,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    });

    setInterpolatedColor(
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [backgroundTransition, albumColor[quotesArray[randomQuote].album]],
      })
    );
    backgroundTransition = albumColor[quotesArray[randomQuote].album];
    setSharingBackground("transparent")
    setTimeout(() => {
      setSharingBackground(albumColor[quotesArray[randomQuote].album]);
    }, 1000);
  }
  };

  const OpenSpotify = async () => {
    await Linking.openURL(lyrics.spotifyURL);
  };

  useEffect(() => {
    getQuotes().then((quotes) => {
      setQuotesArray(quotes);
    });
  }, []);

  useEffect(() => {
    if (quotesArray.length !== 0) {
      setButtonText("It's Me, Hi!");
    }
  }, [quotesArray]);


  const lyricsRef = useRef();
  const shareLyrics = async () => {
    const uri = await captureRef(lyricsRef, {
      format: 'png',
      quality: 0.8,
    });
    const shareOptions = {
      mimeType: 'image/png',
      dialogTitle: 'Taylor Swift Quotes',
      message:  `Thinking about u 💜 ${lyrics.spotifyURL}`
    }
    try{ Sharing.shareAsync(uri, shareOptions) }
      catch(e){
        console.log(e)
      }
   
  }

 if(!fontsLoaded) return (
  <ActivityIndicator size="large" color="#9600ff" style={{flex:1, justifyContent:"center", backgroundColor:"#121212"}}/>
 )

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: interpolatedColor }]}
    >
      <View style={{paddingHorizontal:20, backgroundColor:sharingBackground}} ref={lyricsRef}>
      {img ? (
        <Image style={styles.img} source={{ uri: img }} />
      ) : (
        <>
        <Text style={styles.InitialText}>I don't   wanna look at anything else now that I saw you</Text>
        <Text style={[styles.InitialText, {marginTop: 0}]}>💜</Text>
        </>
      )}
      <View style={styles.creditsRow}>
        <Text style={styles.songName}>{lyrics.song}</Text>
        <Text style={[styles.album, {fontFamily : lyrics.album}]}>{lyrics.album}</Text>
      </View>
      <Text style={[styles.song, {fontFamily : 'LyricsCaption'}]}>{lyrics.lyrics}</Text>
      </View>
      {!lyrics ? 
      <TouchableOpacity
        style={styles.btn}
        onPress={() => (quotesArray.length > 0 ? ShowQuotes() : null)}>
        <Text style={styles.btnText}>{buttonText}</Text>
      </TouchableOpacity>
      :
      <View style={styles.buttonsRow}>
      <Icon name="spotify" size={35} color="rgba(255,255,255,0.7)" onPress={()=>{OpenSpotify()}}/> 
      <Icon name="play-circle" size={75} color="#fff" onPress={()=>{ ShowQuotes()}} disabled={sharingBackground == "transparent" }/>
      <Icon name="share-alt" size={35} color="rgba(255,255,255,0.7)" onPress={()=>{shareLyrics()}}/>
      </View>
}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9600ff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    marginTop: 20,
    width: 300,
    height: 300,
    borderRadius: 2.5,
  },
  InitialText: {
    marginTop: 20,
    color: "#9600ff",
    fontSize: 35,
    fontWeight: 800,
    textShadowColor: "rgba(128, 0, 255, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    width: 300,
    textAlign: "center",
    textAlignVertical: "center",
  },
  song: {
    color: "#fff",
    fontSize: 25,
    width: 300,
    height:200,
    marginVertical: 20,
    textAlign: "center",
    textAlignVertical: "top",
  },
  btn: {
    width: 150,
    padding: 10,
    /* borderWidth: 1,
    borderColor: "#9600ff", */
    borderRadius: 5,
    backgroundColor: "rgba(171, 70, 255,0.7)",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.37,
shadowRadius: 7.49,

elevation: 12,
    
  },
  btnText: {
    color: "#121212",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 800,
  },
  songName:{
    fontSize: 21,
    color : "#fff",
    fontWeight: 700,
    textAlign: "center",
    width:170,
    alignSelf: "center",
  },
  album:{
    fontSize: 18,
    color : "rgba(255,255,255,0.5)",
    textAlign: "center",
  },
  creditsRow:{
    justifyContent: "flex-start",
    width: 295,
  },
  buttonsRow:{
    display: "flex",
    flexDirection: "row",
    gap:65,
    alignItems: "center",
    bottom:20,
    position: "absolute",
  },

});
