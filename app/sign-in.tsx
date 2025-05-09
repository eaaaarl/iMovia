import image from "@/constants/image";
import GoogleSignIn from "@/features/auth/components/GoogleSinInButton";
import React from "react";
import { Image, Text, View } from "react-native";

export default function SignIn() {
  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };
  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Image source={image.bg} className=" absolute z-0 h-full w-full" />
      <View className="w-full p-4">
        <View className="justify-center items-center">
          <View
            style={{
              width: 96,
              height: 96,
              backgroundColor: "#4F46E5",
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              i
            </Text>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Movia
            </Text>
          </View>
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
          <Text style={{ color: "#a1a1aa", textAlign: "center", marginTop: 8 }}>
            Sign in to continue to your movie experience
          </Text>
        </View>
        <GoogleSignIn />
      </View>
    </View>
  );
}
