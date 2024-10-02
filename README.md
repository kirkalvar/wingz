---

# Simplified ride-sharing driver mobile application

This is a React Native project built with Expo. It includes features such as map integration using Google Maps and various components tailored to the needs of a mobile application.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kirkalvar/wingz.git
   cd wingz
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your Google Maps API key:
   ```
   EXPO_PUBLIC_GOOGLE_MAP_API_KEY=your-google-maps-api-key
   ```

4. Ensure you have the Expo Go app installed on your testing device. Download it from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) or the [App Store](https://apps.apple.com/us/app/expo-go/id982107779).

## Running the Project

1. Start the Expo server with tunneling enabled:
   ```bash
   npx expo start --tunnel
   ```

   This command will allow you to test the app on devices that are connected to different networks than your development computer (e.g., different Wi-Fi or cellular networks). Expo provides a public URL that you can use to access the app from anywhere.

2. On your testing device, open the Expo Go app, and scan the QR code generated in your terminal or browser.

