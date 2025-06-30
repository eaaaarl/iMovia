import icon from '@/constants/icon';
import { authFirebase } from '@/libs/firebase';
import { useAppDispatch } from '@/libs/redux/hooks';
import { setUser } from '@/libs/redux/state/authSlice';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { router } from 'expo-router';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Image, Platform, Text, TouchableOpacity, View } from 'react-native';

const configureGoogleSignIn = async () => {
  try {
    const webClientId = process.env.EXPO_PUBLIC_FIREBASE_GOOGLE_WEB_CLIENT_ID;
    if (!webClientId) throw new Error("Web client ID is not set");
    GoogleSignin.configure({
      webClientId: webClientId,
      scopes: ["profile", "email"],
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default function GoogleSignInButton() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const checkGoogleSignIn = async () => {
      const isConfigured = await configureGoogleSignIn();
      if (!isConfigured) return;
    }
    checkGoogleSignIn();
  }, [])

  const startLoadingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopLoadingAnimation = () => {
    fadeAnim.stopAnimation();
    fadeAnim.setValue(1);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    startLoadingAnimation();

    try {
      if (Platform.OS !== "android") {
        throw new Error('Google sign-in is only available on Android');
      }

      // Step 1: Checking Google Play Services
      setLoadingStep('Checking Google Play Services...');
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Step 2: Preparing Google Sign-In
      setLoadingStep('Preparing Google Sign-In...');
      await GoogleSignin.signOut();

      // Small delay to show the step
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 3: Opening Google Sign-In
      setLoadingStep('Opening Google Sign-In...');
      const result = await GoogleSignin.signIn();

      if (!result) {
        throw new Error('No user data received from Google');
      }

      const { idToken } = result.data as User;
      if (!idToken) {
        throw new Error('No ID token received from Google');
      }

      // Step 4: Authenticating with Firebase
      setLoadingStep('Authenticating with Firebase...');
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const authUser = await signInWithCredential(authFirebase, googleCredential);

      // Step 5: Setting up your account
      setLoadingStep('Setting up your account...');
      dispatch(setUser({
        displayName: authUser.user.displayName || "",
        email: authUser.user.email || "",
        uid: authUser.user.uid,
        photoURL: authUser.user.photoURL || "",
      }));

      // Step 6: Completing sign-in
      setLoadingStep('Completing sign-in...');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Success - navigate
      router.replace("/(tabs)");

    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      setLoadingStep('');

      let errorMessage = 'Failed to sign in with Google';
      if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email using a different sign-in method';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid credentials. Please try again';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Sign-In Error', errorMessage);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
      stopLoadingAnimation();
    }
  }

  return (
    <View className="w-full">
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          className={`h-14 rounded-lg justify-center items-center flex-row ${isLoading ? 'bg-white/5' : 'bg-white/10'
            }`}
          onPress={signInWithGoogle}
          disabled={isLoading}
          activeOpacity={isLoading ? 1 : 0.8}
        >
          {isLoading ? (
            <View className="flex-row items-center">
              <ActivityIndicator
                color="#fff"
                size="small"
                className="mr-3"
              />
              <Text className="text-white text-base font-medium">
                Signing in...
              </Text>
            </View>
          ) : (
            <>
              <Image
                source={icon.google}
                className="w-6 h-6 mr-2"
                resizeMode="contain"
              />
              <Text className="text-white text-base font-semibold">
                Continue with Google
              </Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Loading step indicator */}
      {isLoading && loadingStep && (
        <View className="mt-3 items-center">
          <Text className="text-white/70 text-sm text-center">
            {loadingStep}
          </Text>
          <View className="mt-2 flex-row space-x-1">
            {[0, 1, 2].map((dot) => (
              <Animated.View
                key={dot}
                className="w-2 h-2 bg-white/40 rounded-full"
                style={{
                  opacity: fadeAnim,
                  transform: [{
                    scale: fadeAnim.interpolate({
                      inputRange: [0.6, 1],
                      outputRange: [0.8, 1.2],
                      extrapolate: 'clamp',
                    })
                  }]
                }}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}