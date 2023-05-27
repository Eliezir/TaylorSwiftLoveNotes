import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db } from "../firebase/config";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  where,
  query,
  getDocs,
  arrayUnion,
  arrayRemove,
  addDoc,
} from "firebase/firestore";

export const getQuotes = async () => {
  let quotesRef = collection(db, "quotes");
  let querySnapsot = await getDocs(quotesRef);
  let quotes = [];
  querySnapsot.forEach((doc) => {
    let quote = doc.data();
    quotes.push({
      lyrics: quote.lyrics,
      album: quote.album,
      song: quote.song,
      spotifyURL : quote.spotifyUrl
    });
  });
  return quotes;
};



/* const Taylor = [
  { album: "Lover", lyrics: "I like shiny things but I'd marry you with paper rings", song: "Paper Rings", spotifyUrl: "https://open.spotify.com/track/4y5bvROuBDPr5fuwXbIBZR" },
  { album: "Evermore", lyrics: "And I can't let you go, your hand print's on my soul", song: "Cowboy Like Me", spotifyUrl: "https://open.spotify.com/track/1XjHRolIXL2M1EEOUsGGR4" },
  { album: "Evermore", lyrics: "But I stay, when it's hard or it's wrong, or we're making mistakes", song: "Long Story Short", spotifyUrl: "https://open.spotify.com/track/0vVMlbdYx2080Oa9FndPZr" },
  { album: "Lover", lyrics: "For you, I would fall from grace just to touch your face", song: "False God", spotifyUrl: "https://open.spotify.com/track/5hQSXkFgbxjZo9uCwd11so" },
  { album: "Folklore", lyrics: "All these people think love's for show, but I would die for you in secret", song: "Invisible String", spotifyUrl: "https://open.spotify.com/track/6VsvKPJ4xjVNKpI8VVZ3SV" },
  { album: "Lover", lyrics: "No more keepin' score now, I just keep you warm", song: "Cornelia Street", spotifyUrl: "https://open.spotify.com/track/12M5uqx0ZuwkpLp5rJim1a" },
  { album: "Lover", lyrics: "And at every table, I'll save you a seat", song: "Daylight", spotifyUrl: "https://open.spotify.com/track/1fzAuUVbzlhZ1lJAx9PtY6" },
  { album: "Evermore", lyrics: "I'm a fire and I'll keep your brittle heart warm if your cascade ocean wave blues come", song: "Ivy", spotifyUrl: "https://open.spotify.com/track/19CSr8rwW05VJL2F91KFNK" },
  { album: "Lover", lyrics: "You're my best friend", song: "Lover", spotifyUrl: "https://open.spotify.com/track/1dGr1c8CrMLDpV6mPbImSI" },
  { album: "Folklore", lyrics: "I remember how we felt sitting by the water and every time I look at you, it's like the first time", song: "Cardigan", spotifyUrl: "https://open.spotify.com/track/4R2kfaDFhslZEMJqAFNpdd" },
  { album: "Evermore", lyrics: "You can hear it in the silence. You can feel it on the way home. You can see it with the lights out", song: "Champagne Problems", spotifyUrl: "https://open.spotify.com/track/0sY6ZUTh4yoctD8VIXz339" },
  { album: "Lover", lyrics: "And I know I make the same mistakes every time, bridges burn, I never learn, at least I did one thing right", song: "Miss Americana & The Heartbreak Prince", spotifyUrl: "https://open.spotify.com/track/1dGr1c8CrMLDpV6mPbImSI" },
  { album: "Lover", lyrics: "I want to wear his initial on a chain round my neck, chain round my neck... not because he owns me, but 'cause he really knows me", song: "Lover", spotifyUrl: "https://open.spotify.com/track/1dGr1c8CrMLDpV6mPbImSI" },
  { album: "Folklore", lyrics: "Squeeze my hand three times in the back of the taxi", song: "August", spotifyUrl: "https://open.spotify.com/track/3hUxzQpSfdDqwM3ZTFQY0K" },
  { album: "Folklore", lyrics: "Can I go where you go? Can we always be this close?", song: "Illicit Affairs", spotifyUrl: "https://open.spotify.com/track/2NmsngXHeC1GQ9wWrzhOMf" },
  { album: "Evermore", lyrics: "With your boots beneath my bed...forever is the sweetest con", song: "Cowboy Like Me", spotifyUrl: "https://open.spotify.com/track/1XjHRolIXL2M1EEOUsGGR4" },
  { album: "Reputation", lyrics: "And all at once you are the one I have been waiting for, king of my heart, body and soul", song: "King of My Heart", spotifyUrl: "https://open.spotify.com/track/7HuBDWi18s4aJM8UFnNheH" },
  { album: "Lover", lyrics: "I hope I never lose you, hope it never ends, I'd never walk Cornelia Street again", song: "Cornelia Street", spotifyUrl: "https://open.spotify.com/track/12M5uqx0ZuwkpLp5rJim1a" },
  { album: "Lover", lyrics: "I once believed love would be burning red, but it's golden", song: "Daylight", spotifyUrl: "https://open.spotify.com/track/1fzAuUVbzlhZ1lJAx9PtY6" },
  { album: "Evermore", lyrics: "One single thread of gold tied me to you", song: "Gold Rush", spotifyUrl: "https://open.spotify.com/track/2ZTKWFG6OtHI3ewy9OGNOY" },
  { album: "Reputation", lyrics: "Please don't ever become a stranger who's laugh I could recognize anywhere", song: "New Year's Day", spotifyUrl: "https://open.spotify.com/track/7F5oktn5YOsR9eR5YsFtqb" },
  { album: "Folklore", lyrics: "Have I known you twenty seconds or twenty years?", song: "Seven", spotifyUrl: "https://open.spotify.com/track/6KJqZcs9XDgVck7Lg9QOTC" },
  { album: "Lover", lyrics: "All I know is a new found grace. All my days I'll know your face", song: "Afterglow", spotifyUrl: "https://open.spotify.com/track/1SymEzIT3H8UZfibCs3TYi" },
  { album: "Speak Now", lyrics: "Long live the walls we crashed through, I had the time of my life with you", song: "Long Live", spotifyUrl: "https://open.spotify.com/track/6XDBA3QWX51lDJ0oZbaJJN" },
  { album: "Folklore", lyrics: "My house of stone, your ivy grows, and now I'm covered in you", song: "August", spotifyUrl: "https://open.spotify.com/track/3hUxzQpSfdDqwM3ZTFQY0K" },
  { album: "Lover", lyrics: "Don't want no other shade of blue but you", song: "Lover", spotifyUrl: "https://open.spotify.com/track/1dGr1c8CrMLDpV6mPbImSI" },
  { album: "Reputation", lyrics: "Say my name and everything just stops", song: "Delicate", spotifyUrl: "https://open.spotify.com/track/6NFyWDv5CjfwuzoCkw47Xf" },
  { album: "Evermore", lyrics: "Baby all at once this is enough", song: "Evermore", spotifyUrl: "https://open.spotify.com/track/3O5osWf1rSoKMwe6E9ZaXP" },
  { album: "Lover", lyrics: "I'd like to hangout with you for my whole life", song: "Lover", spotifyUrl: "https://open.spotify.com/track/1dGr1c8CrMLDpV6mPbImSI" },
  { album: "Lover", lyrics: "Even in my worst times, you could see the best in me", song: "Daylight", spotifyUrl: "https://open.spotify.com/track/1fzAuUVbzlhZ1lJAx9PtY6" },
  { album: "Fearless (Taylor's Version)", lyrics: "I had the best day with you today", song: "The Best Day", spotifyUrl: "https://open.spotify.com/track/3esA216TyLHEkNiBCeCmcg" },
  { album: "Evermore", lyrics: "My waves meet your shore, ever and evermore", song: "Evermore", spotifyUrl: "https://open.spotify.com/track/3O5osWf1rSoKMwe6E9ZaXP" },
  { album: "1989 (Taylor's Version)", lyrics: "I don't wanna think of anything else now that I thought of you", song: "Wildest Dreams (Taylor's Version)", spotifyUrl: "https://open.spotify.com/track/1Ov37jtRQ2YNAe8HzfczkL" },
  { album: "Red (Taylor's Version)", lyrics: "All's well that ends well to end up with you", song: "All Too Well (10 Minute Version)", spotifyUrl: "https://open.spotify.com/track/5enxwA8aAbwZbf5qCHORXi" }
  ]; */

/*   const addQuotes = async () => {

    let quotesRef = collection(db, "quotes");
    Taylor.forEach(async (quote) => {
      await addDoc(quotesRef, {
        lyrics: quote.lyrics,
        album: quote.album,
        song: quote.song,
        spotifyUrl: quote.spotifyUrl 
      });
    });
  };
  
  addQuotes(); */



export const photos = 
{
"1989 (Taylor's Version)" : "https://firebasestorage.googleapis.com/v0/b/swiftquotes-2c798.appspot.com/o/Albuns%2FPhotos%2FCapa_de_1989.png?alt=media&token=1362cd62-672e-4289-b40a-237504205137",
 Evermore: "https://firebasestorage.googleapis.com/v0/b/swiftquotes-2c798.appspot.com/o/Albuns%2FPhotos%2FCapa_de_Evermore.png?alt=media&token=bd635ccc-0cce-4d37-9356-09bd34c79e9a",
"Fearless (Taylor's Version)": "https://firebasestorage.googleapis.com/v0/b/swiftquotes-2c798.appspot.com/o/Albuns%2FPhotos%2FCapa_de_Fearless.png?alt=media&token=06f381c4-31af-464a-a246-c8d2d6132b2e",
 Folklore: "https://firebasestorage.googleapis.com/v0/b/swiftquotes-2c798.appspot.com/o/Albuns%2FPhotos%2FCapa_de_Folklore.png?alt=media&token=6f2f19d8-553d-4b13-97a7-2cc6782148db",
 Lover: "https://firebasestorage.googleapis.com/v0/b/swiftquotes-2c798.appspot.com/o/Albuns%2FPhotos%2FCapa_de_Lover.png?alt=media&token=08899ab4-28e3-4406-83c4-d0d9f73ba7d1",
 "Red (Taylor's Version)": "https://firebasestorage.googleapis.com/v0/b/swiftquotes-2c798.appspot.com/o/Albuns%2FPhotos%2FCapa_de_Red.jpeg?alt=media&token=d88cb17d-dca1-4177-a4fc-e751b54412c4",
 Reputation: "https://firebasestorage.googleapis.com/v0/b/swiftquotes-2c798.appspot.com/o/Albuns%2FPhotos%2FCapa_de_Reputation.png?alt=media&token=8c425382-30f6-4c71-807d-a7b7932d6f74",
 "Speak Now": "https://firebasestorage.googleapis.com/v0/b/swiftquotes-2c798.appspot.com/o/Albuns%2FPhotos%2FCapa_de_Speak_Now_cover.png?alt=media&token=142ad0be-a8d5-4e3c-87c6-c7c675e2837d"
}

export const albumColor = {
  "1989 (Taylor's Version)" : "#6645dc",
  Evermore: "#bb5f05",
  "Fearless (Taylor's Version)": "#baa251",
  Folklore: "#adb5bd",
  Lover: "#ffc2e2",
  "Red (Taylor's Version)": "#ca0f2e",
  Reputation: "#000000",
  "Speak Now": "#9739a7"

}

