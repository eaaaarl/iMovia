import icon from "@/constants/icon";
import image from "@/constants/image";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import React from "react";
import { Image, Text, View } from "react-native";

export default function SignIn() {
  return (
    <View className="flex-1 bg-primary">
      <Image source={image.bg} className="absolute inset-0 w-full h-full opacity-40" />

      <View className="flex-1 justify-center px-8">
        <View className="items-center mb-16">
          <Image
            source={icon.logo}
            className="w-20 h-20 mb-8"
            resizeMode="contain"
          />

          <Text className="text-3xl font-bold text-white text-center mb-3">
            Welcome to iMovia
          </Text>

          <Text className="text-zinc-400 text-center text-base leading-6">
            Your ultimate movie experience{'\n'}starts here
          </Text>
        </View>

        <View className="space-y-6">
          <GoogleSignInButton />

          <Text className="text-zinc-500 text-xs text-center mt-8">
            By continuing, you agree to our Terms of Service{'\n'}and Privacy Policy
          </Text>
        </View>
      </View>

      {/* Subtle gradient overlay */}
      <View className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />
    </View>
  );
}