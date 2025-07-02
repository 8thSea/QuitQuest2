# Quit Quest

A retro-themed smoking cessation tracker built with React Native (Expo) and Firebase.

## Setup

1. Install dependencies with `npm install` or `yarn install`.
2. Copy `firebaseConfig.js` and add your Firebase project keys.
3. Replace placeholder Stripe and AdMob keys in `services/stripeService.js` and `screens/AchievementsScreen.js`.
4. Run the app:

```sh
npm run start
```

## Building

- **Android:** `npm run build:android`
- **iOS:** `npm run build:ios`
- **Web:** `npm run build:web`

## Firebase Rules

See `firestore.rules` for basic security rules restricting access to user documents by UID.

## Deployment

- Follow Expo's docs to configure EAS for standalone builds and upload to the stores.
- Deploy the web build to Netlify/Vercel by serving the `web-build` directory.

## Assets

All pixel art assets live under `assets/16bit/`. Use a 16-bit SNES palette and keep integer scaling for a crisp look.
