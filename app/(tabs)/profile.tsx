import image from "@/constants/image";
import React from "react";
import { Image, Text, View } from "react-native";

const Profile = () => {
  return (
    <View className="bg-primary flex-1 justify-center items-center">
      <Image source={image.bg} className="w-full flex-1" />
      <Text className="text-white">Profile</Text>
    </View>
  );
};

export default Profile;
