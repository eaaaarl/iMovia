import { authFirebase } from "@/libs/firebase";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { clearUser } from "@/libs/redux/state/authSlice";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const { uid, email, displayName } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut(authFirebase);
      dispatch(clearUser());
    } catch (error) {
      Alert.alert("Error", "Failed to sign out. Please try again.");
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: handleSignOut, style: "destructive" },
    ]);
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "This feature will be available soon!", [
      { text: "OK", style: "default" },
    ]);
  };

  return {
    confirmSignOut,
    handleEditProfile,
    onRefresh,
    refreshing,
    insets,
    displayName,
    email,
    uid,
    isLoading,
  };
};
