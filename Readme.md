# GalaxiesSdk Documentation

## Overview

`GalaxiesSdk` is a class designed to integrate Telegram bot interactions with Firebase Firestore. It provides methods for user authentication via Telegram, managing user data, and handling game-related operations.

## Installation

To use `GalaxiesSdk`, you need to install it via npm.

### Using npm

```bash
npm install galaxies-access-layer node-telegram-bot-api
```

## Configuration

When initializing `GalaxiesSdk`, provide the following Firebase configuration options:

- `apiKey`: Your Firebase API key.
- `authDomain`: Firebase Auth domain.
- `projectId`: Firebase project ID.
- `storageBucket`: Firebase storage bucket.
- `messagingSenderId`: Firebase messaging sender ID.
- `appId`: Firebase app ID.
- `measurementId`: Firebase measurement ID (optional).

## Usage

### Import and Initialize

Import the `GalaxiesSdk` class and initialize it with your configuration.

```javascript
import { GalaxiesSdk } from "galaxies-access-layer/dist/galaxies-access-layer.es.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

const sdk = new GalaxiesSdk({
  firebaseConfig,
  buttonLabel: "Launch Game",
  botToken: "YOUR_BOT_TOKEN",
  websiteUrl: "YOUR_WEBSITE_URL",
  welcomeMessage: "Let's take you to the galaxies",
});
```

## Class Methods

### `getTelegramUser(userId)`

Fetches the Telegram user's profile information including their photo URL.

**Parameters:**

- `userId` (String): The Telegram user ID.

**Returns:**

- An object containing `userId`, `username`, and `photoUrl`.

### `checkNewUser(userId)`

Checks if a user already exists in Firestore.

**Parameters:**

- `userId` (String): The Telegram user ID.

**Returns:**

- `true` if the user exists, `false` otherwise.

### `createNewUser(user)`

Creates a new user in Firestore with the initial ticket count.

**Parameters:**

- `user` (Object): The user object containing user details.

**Returns:**

- The created user object.

### `reduceTicket(userId)`

Reduces the ticket count for a user by one.

**Parameters:**

- `userId` (String): The Telegram user ID.

**Returns:**

- The updated user object.

### `addTicket(userId)`

Increases the ticket count for a user by one.

**Parameters:**

- `userId` (String): The Telegram user ID.

**Returns:**

- The updated user object.

### `setScore(userId, score)`

Sets the score for a user.

**Parameters:**

- `userId` (String): The Telegram user ID.
- `score` (Number): The score to be added.

**Returns:**

- The updated score object.

### `getScore(userId)`

Gets the score for a user.

**Parameters:**

- `userId` (String): The Telegram user ID.

**Returns:**

- The user's score object.

### `getTopPlayers()`

Gets top 3 players.

**Returns:**

- List user's score object.

### `getLeaderBoard()`

Gets top 3 players.

**Returns:**

- List user's score object.
