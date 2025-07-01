# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Google Authentication Implementation

### Overview
The iMovia app implements Google Authentication using Firebase Authentication and the `@react-native-google-signin/google-signin` package. This implementation provides a secure and user-friendly way for users to sign in using their Google accounts on Android devices.

### Prerequisites
- Firebase project setup with Google Authentication enabled
- Google Cloud Console project with OAuth 2.0 client configuration
- Required environment variables:
  ```
  EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
  EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  EXPO_PUBLIC_FIREBASE_MESSENGER_SENDER_ID=your_sender_id
  EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
  EXPO_PUBLIC_FIREBASE_GOOGLE_WEB_CLIENT_ID=your_web_client_id
  ```

### Features
- Seamless Google Sign-In integration
- Progressive loading states with visual feedback
- Error handling with user-friendly messages
- Automatic redirection after successful authentication
- Persistent authentication state using AsyncStorage
- Redux integration for global state management

### Implementation Details

1. **Firebase Configuration**
   - Firebase is initialized in `libs/firebase.ts`
   - Uses AsyncStorage for persistent authentication
   - Implements both email/password and Google authentication methods

2. **Google Sign-In Button Component**
   - Located in `features/auth/components/GoogleSignInButton.tsx`
   - Handles the complete Google authentication flow
   - Provides visual feedback during the authentication process
   - Implements error handling with user-friendly messages

3. **Authentication Flow**
   ```typescript
   // 1. Configure Google Sign-In
   GoogleSignin.configure({
     webClientId: process.env.EXPO_PUBLIC_FIREBASE_GOOGLE_WEB_CLIENT_ID,
     scopes: ["profile", "email"]
   });

   // 2. Handle Sign-In Process
   const signInWithGoogle = async () => {
     // Check Google Play Services
     await GoogleSignin.hasPlayServices();
     
     // Perform Google Sign-In
     const result = await GoogleSignin.signIn();
     
     // Get Firebase Credential
     const credential = GoogleAuthProvider.credential(result.idToken);
     
     // Sign in with Firebase
     const userCredential = await signInWithCredential(authFirebase, credential);
     
     // Update Redux Store
     dispatch(setUser({
       displayName: userCredential.user.displayName,
       email: userCredential.user.email,
       uid: userCredential.user.uid,
       photoURL: userCredential.user.photoURL
     }));
   };
   ```

4. **State Management**
   - Uses Redux for managing authentication state
   - Authentication state persists across app restarts
   - Implements proper loading and error states

### Security Considerations
- Implements proper error handling for various authentication scenarios
- Secures sensitive credentials using environment variables
- Validates authentication state on protected routes
- Implements proper sign-out functionality

### Usage
1. Press the "Continue with Google" button on the sign-in screen
2. Select your Google account from the popup
3. Wait for the authentication process to complete
4. Upon successful authentication, you'll be redirected to the main app

### Error Handling
The implementation handles various error scenarios:
- Invalid credentials
- Network errors
- Account exists with different credentials
- Google Play Services not available
- User cancellation

### Limitations
- Currently only available on Android devices
- Requires Google Play Services to be installed
- Internet connection required for authentication

### Future Improvements
- Add iOS support using Google Sign-In
- Implement additional social authentication providers
- Add biometric authentication support
- Enhance error recovery mechanisms
- Add offline authentication capabilities
