# 🏰 Quit Quest - Stop Smoking RPG App by Jonathan Klimoski

A gamified stop-smoking app with a 16-bit SNES JRPG aesthetic that helps users track their progress, save money, and unlock achievements on their smoke-free journey.

## 🎮 Features

- **Medieval Fantasy Theme**: 16-bit pixel art style inspired by classic SNES JRPGs
- **Progress Tracking**: Monitor days smoke-free, money saved, and cigarettes avoided
- **Achievements System**: Unlock badges and level up your knight avatar
- **Data Visualization**: Charts showing savings over time
- **Cloud Sync**: Firebase integration for data backup
- **Monetization**: Pro subscription via Stripe, ads via AdMob
- **Cross-Platform**: iOS, Android, and Web support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac only) or Android Studio
- Firebase account
- Stripe account (for payments)
- AdMob account (for ads)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quit-quest.git
cd quit-quest
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
API_URL=https://your-backend-api.com/api

# AdMob Configuration
ADMOB_APP_ID_IOS=ca-app-pub-xxxxx~yyyyy
ADMOB_APP_ID_ANDROID=ca-app-pub-xxxxx~yyyyy
```

4. Start the development server:
```bash
npx expo start
```

## 📱 Platform-Specific Setup

### iOS Setup

1. Install iOS dependencies:
```bash
cd ios && pod install
```

2. Configure Info.plist for AdMob:
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-xxxxx~yyyyy</string>
<key>SKAdNetworkItems</key>
<array>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>cstr6suwn9.skadnetwork</string>
  </dict>
</array>
```

### Android Setup

1. Configure AndroidManifest.xml for AdMob:
```xml
<meta-data
  android:name="com.google.android.gms.ads.APPLICATION_ID"
  android:value="ca-app-pub-xxxxx~yyyyy"/>
```

2. Add permissions:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Web Setup

1. Install web dependencies:
```bash
npx expo install react-dom react-native-web @expo/webpack-config
```

2. Configure web-specific settings in `app.json`:
```json
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png",
      "name": "Quit Quest",
      "shortName": "QuitQuest"
    }
  }
}
```

## 🔥 Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)

2. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password

3. Create Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Add security rules from `firestore.rules`

4. Add Firebase config to your app (see `.env` setup above)

## 💳 Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)

2. Get your publishable key from the Dashboard

3. Set up a backend server for payment processing:
   - See backend folder for server implementation
   - Deploy to your preferred hosting service

4. Configure webhook endpoints for subscription management

## 📊 AdMob Setup

1. Create an AdMob account at [admob.google.com](https://admob.google.com)

2. Create ad units:
   - Banner ad for dashboard
   - Interstitial ad for achievements
   - Note the ad unit IDs

3. Add test device IDs for development

## 🏗️ Building for Production

### iOS Build

```bash
# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios
```

### Android Build

```bash
# Build for Android
eas build --platform android
```

### Web Build

```bash
# Build for web
npx expo export --platform web
```

## 📲 Publishing

### App Store (iOS)

1. Create app in App Store Connect
2. Upload build via Transporter
3. Fill in app information and screenshots
4. Submit for review

### Google Play Store (Android)

1. Create app in Google Play Console
2. Upload AAB file
3. Complete store listing
4. Set up pricing and distribution
5. Submit for review

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## 📚 Project Structure

```
quit-quest/
├── src/
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── context/
│   ├── navigation/
│   └── theme/
├── backend/
├── assets/
├── App.js
└── package.json
```

---

## License

---

## License

© 2025 Jonathan Klimoski. All rights reserved.

This software and all accompanying files, assets, code, and documentation are proprietary and closed-source. No portion of this software may be copied, distributed, modified, or used in any form without the express prior written permission of Jonathan Klimoski.

For licensing inquiries or to request permission for use, please contact:  
 
Email: jonathanklimnoski@proton.me 


This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by classic SNES JRPGs
- Built with React Native and Expo
- Special thanks to the stop-smoking community

## 📞 Support

- Email: support@quitquest.com
- Discord: [Join our server](https://discord.gg/quitquest)
- Issues: [GitHub Issues](https://github.com/yourusername/quit-quest/issues)

---

**Remember**: Every smoke-free day is a victory! 🏆