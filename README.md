**Here's your updated and cleaned `README.md` file** tailored to your setup:

---

```markdown
# My React Native App

This is a new **React Native** project bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli) with **TypeScript**.

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Running on Physical Android Device via Android Studio

1. **Open the project in Android Studio**
   - Open the `android` folder of this project in Android Studio.

2. **Connect your physical device**
   - Enable **USB Debugging** on your Android device.
   - Connect it to your computer via USB.
   - Make sure your device is authorized (allow USB debugging prompt).

3. **Run the app**
   - Click the **Run** button (green play icon) in Android Studio, or press `Shift + F10`.
   - Select your connected physical device from the device list.

Android Studio will automatically handle building the app, starting the Metro bundler in the background (if needed), and installing the app on your device.

### Alternative: Run using CLI

```sh
# Install dependencies (if not already done)
npm install
# OR
yarn install
```

```sh
# Run on Android
npm run android
# OR
yarn android
```

> **Note**: Even when using CLI, Metro bundler will start automatically.

## Modifying the App

- Open `App.tsx` (TypeScript) in your editor.
- Make changes and save.
- The app will automatically reload on your device thanks to **Fast Refresh**.

To perform a full reload:
- Shake your Android device (or press the menu button) → tap **Reload**.

## Project Structure

This project uses:
- **React Native Community CLI**
- **TypeScript**
- **Android Studio** as the primary development environment

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native with TypeScript](https://reactnative.dev/docs/typescript)
- [React Native Community CLI](https://github.com/react-native-community/cli)


This version is much cleaner, focused on your actual workflow (Android Studio + physical device), and removes the unnecessary Metro-first instructions while still keeping helpful alternatives. 

Would you like me to make it even shorter or add any specific sections (like folder structure, libraries used, etc.)?
