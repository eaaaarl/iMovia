import icon from "@/constants/icon";
import image from "@/constants/image";
import EmailPasswordAuth from "@/features/auth/components/LoginForm";
import React from "react";
import { Image, Text, View } from "react-native";

export default function SignIn() {
  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Image source={image.bg} className="absolute z-0 h-full w-full" />
      <View className="w-full p-4">
        <View className="justify-center items-center">
          <Image source={icon.logo} resizeMode="contain" />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
              marginTop: 24,
            }}
          >
            Welcome to iMovia
          </Text>
          <Text
            style={{
              color: "#a1a1aa",
              textAlign: "center",
              marginTop: 8,
              marginBottom: 32,
            }}
          >
            Sign in to continue to your movie experience
          </Text>
        </View>
        <EmailPasswordAuth />
      </View>
    </View>
  );
}
