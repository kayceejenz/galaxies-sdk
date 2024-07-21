import { GalaxiesSdk } from "../src/index.js";

const firebaseConfig = {
  apiKey: "AIzaSyDi_B711ecdK6lVePPhQonzyw9bSzSGVco",
  authDomain: "mez-gpt.firebaseapp.com",
  projectId: "mez-gpt",
  storageBucket: "mez-gpt.appspot.com",
  messagingSenderId: "352440938792",
  appId: "1:352440938792:web:4146b681e52fc9e67ce01d",
  measurementId: "G-E4DFE1E57Y",
};

const sdk = new GalaxiesSdk({
  firebaseConfig,
  buttonLabel: "Launch Game",
  botToken: "7251854496:AAFYjkJXNXKnH9yxRmG632Sy08bCRkDHfZo",
  websiteUrl: "https://galaxiesgame.com",
  welcomeMessage: "Let's take you to the galaxies",
});

const telegramUserId = "5856830847";

const existingUser = await sdk.checkNewUser(telegramUserId);
console.log(existingUser);

const telegramUser = await sdk.getTelegramUser(telegramUserId);
console.log(telegramUser);

const newUser = await sdk.createNewUser(telegramUser);
console.log(newUser);

const scoresheet = await sdk.getScore(telegramUserId);
console.log(scoresheet);

const newScore = 20;
const newScoreSheet = await sdk.setScore(telegramUserId, newScore);
console.log(newScoreSheet);

const newScoreSheet = await sdk.reduceTicket(telegramUserId);
console.log(newScoreSheet);
