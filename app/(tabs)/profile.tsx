import image from "@/constants/image";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DEFAULT_AVATAR = "https://via.placeholder.com/150";

const Profile = () => {
  const {
    confirmSignOut,
    handleEditProfile,
    onRefresh,
    refreshing,
    insets,
    displayName,
    email,
    isLoading,
    uid,
    photoURL,
  } = useProfile();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />

      <Image
        source={image.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingTop: insets.top + 20 }} className="px-4 pb-6">
          <Text className="text-white text-2xl font-bold text-center">
            My Profile
          </Text>
        </View>

        <View className="mx-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-primary/20">
          <View className="px-4 pt-6 pb-4 items-center bg-primary/10">
            <View className="bg-white rounded-full p-1 shadow-md border-2 border-primary/30">
              <Image
                source={{ uri: photoURL || DEFAULT_AVATAR }}
                className="w-28 h-28 rounded-full"
              />
              <TouchableOpacity
                className="absolute right-0 bottom-0 bg-primary rounded-full p-2"
                onPress={() =>
                  Alert.alert(
                    "Update Photo",
                    "This feature will be added soon!"
                  )
                }
              >
                <Ionicons name="camera" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text className="text-xl font-bold mt-4 text-primary">
              {displayName || "User"}
            </Text>
            <Text className="text-gray-600 mb-1">
              {email || "No email available"}
            </Text>


            <View className="flex-row items-center mt-1 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <Text className="text-xs text-primary/70 font-bold">
                ID: {uid.substring(0, 6)}...{uid.substring(uid.length - 4)}
              </Text>
            </View>

          </View>

          <View className="h-0.5 bg-primary/10" />

          <View className="px-4 py-4">
            <Text className="text-primary/70 text-xs uppercase font-semibold mb-2">
              Account Information
            </Text>

            <View className="flex-row items-center py-3 border-b border-primary/10">
              <Ionicons
                name="mail-outline"
                size={20}
                color="rgba(59, 130, 246, 0.8)"
              />
              <View className="ml-3">
                <Text className="text-xs text-primary/60">Email Address</Text>
                <Text className="text-gray-800">
                  {email || "Not available"}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center py-3 border-b border-primary/10">
              <Ionicons
                name="time-outline"
                size={20}
                color="rgba(59, 130, 246, 0.8)"
              />
              <View className="ml-3">
                <Text className="text-xs text-primary/60">Member Since</Text>
                <Text className="text-gray-800">
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center py-3">
              <MaterialCommunityIcons
                name="shield-account-outline"
                size={20}
                color="rgba(59, 130, 246, 0.8)"
              />
              <View className="ml-3">
                <Text className="text-xs text-primary/60">Account Status</Text>
                <View className="flex-row items-center">
                  <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  <Text className="text-gray-800">Active</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mx-4 mt-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-primary/20">
          <Text className="px-4 pt-4 pb-2 text-primary/70 text-xs uppercase font-semibold">
            Account Settings
          </Text>

          <TouchableOpacity
            className="flex-row items-center px-4 py-4 border-b border-primary/10"
            onPress={handleEditProfile}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color="rgba(59, 130, 246, 0.8)"
            />
            <Text className="ml-3 text-gray-800 flex-1">Edit Profile</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="rgba(59, 130, 246, 0.4)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center px-4 py-4 border-b border-primary/10"
            onPress={() =>
              Alert.alert(
                "Notifications",
                "Notification settings will be available soon!"
              )
            }
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color="rgba(59, 130, 246, 0.8)"
            />
            <Text className="ml-3 text-gray-800 flex-1">Notifications</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="rgba(59, 130, 246, 0.4)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center px-4 py-4 border-b border-primary/10"
            onPress={() =>
              Alert.alert("Privacy", "Privacy settings will be available soon!")
            }
          >
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="rgba(59, 130, 246, 0.8)"
            />
            <Text className="ml-3 text-gray-800 flex-1">
              Privacy & Security
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="rgba(59, 130, 246, 0.4)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center px-4 py-4 border-b border-primary/10"
            onPress={() =>
              Alert.alert(
                "Help Center",
                "Help and support will be available soon!"
              )
            }
          >
            <Ionicons
              name="help-circle-outline"
              size={20}
              color="rgba(59, 130, 246, 0.8)"
            />
            <Text className="ml-3 text-gray-800 flex-1">Help & Support</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="rgba(59, 130, 246, 0.4)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center px-4 py-4"
            onPress={confirmSignOut}
            disabled={isLoading}
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text className="ml-3 text-red-500 flex-1">
              {isLoading ? "Signing out..." : "Sign Out"}
            </Text>
            {isLoading ? (
              <ActivityIndicator size="small" color="#EF4444" />
            ) : (
              <Ionicons
                name="chevron-forward"
                size={18}
                color="rgba(59, 130, 246, 0.4)"
              />
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-8 items-center">
          <Text className="text-xs text-white/60">App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
