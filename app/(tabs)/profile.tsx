import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { clearUser } from "@/libs/redux/state/authSlice";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DEFAULT_AVATAR = "https://via.placeholder.com/150";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { uid, email, displayName } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      //await signOut(auth);
      dispatch(clearUser());
      // Navigation to login screen would typically go here
    } catch (error) {
      Alert.alert("Error", "Failed to sign out. Please try again.");
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="bg-gray-100 flex-1">
      {/* Header with background image */}
      <View className="h-40 bg-primary">
        <View className="absolute inset-0 flex items-center justify-center">
          <Text className="text-white text-xl font-bold">My Profile</Text>
        </View>
      </View>

      {/* Profile Card */}
      <View className="mx-4 -mt-16">
        <View className="bg-white rounded-lg shadow-md p-6">
          {/* Avatar and basic info */}
          <View className="items-center mb-6">
            <View className="bg-gray-200 rounded-full p-1 shadow-sm">
              <Image
                source={{ uri: DEFAULT_AVATAR }}
                className="w-24 h-24 rounded-full"
              />
            </View>
            <Text className="text-xl font-bold mt-4">
              {displayName || "User"}
            </Text>
            <Text className="text-gray-500">
              {email || "No email available"}
            </Text>
          </View>

          {/* User details */}
          <View className="mb-6">
            <View className="flex-row items-center py-3 border-b border-gray-200">
              <Ionicons name="person-outline" size={24} color="#555" />
              <Text className="ml-3 text-gray-700">
                Account ID:{" "}
                {uid ? uid.substring(0, 8) + "..." : "Not available"}
              </Text>
            </View>
            <View className="flex-row items-center py-3 border-b border-gray-200">
              <Ionicons name="mail-outline" size={24} color="#555" />
              <Text className="ml-3 text-gray-700">
                Email: {email || "Not available"}
              </Text>
            </View>
            <View className="flex-row items-center py-3">
              <Ionicons name="time-outline" size={24} color="#555" />
              <Text className="ml-3 text-gray-700">
                Member since: {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>

          {/* Account actions */}
          <View>
            <TouchableOpacity
              className="flex-row items-center py-3 border-b border-gray-200"
              onPress={() =>
                Alert.alert("Info", "Edit profile functionality would go here")
              }
            >
              <Ionicons name="create-outline" size={24} color="#555" />
              <Text className="ml-3 text-gray-700">Edit Profile</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#777"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center py-3 border-b border-gray-200"
              onPress={() =>
                Alert.alert("Info", "Settings functionality would go here")
              }
            >
              <Ionicons name="settings-outline" size={24} color="#555" />
              <Text className="ml-3 text-gray-700">Settings</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#777"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={handleSignOut}
              disabled={isLoading}
            >
              <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
              <Text className="ml-3 text-red-500">
                {isLoading ? "Signing out..." : "Sign Out"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Additional sections - can be expanded based on app requirements */}
      <View className="mx-4 mt-4 mb-8">
        <View className="bg-white rounded-lg shadow-md p-6">
          <Text className="text-lg font-semibold mb-4">App Information</Text>
          <View className="flex-row items-center py-3 border-b border-gray-200">
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#555"
            />
            <Text className="ml-3 text-gray-700">Version 1.0.0</Text>
          </View>
          <View className="flex-row items-center py-3">
            <Ionicons name="help-circle-outline" size={24} color="#555" />
            <Text className="ml-3 text-gray-700">Help & Support</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#777"
              style={{ marginLeft: "auto" }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
