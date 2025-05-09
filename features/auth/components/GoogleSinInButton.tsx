import icon from "@/constants/icon";
import { login } from "@/libs/appwrite";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
export default function GoogleSignIn() {
  const handleLogin = async () => {
    const result = await login();
    if (result) {
      console.log("Res", result);
      Alert.alert("Login Success");
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };
  return (
    <TouchableOpacity
      onPress={() => handleLogin()}
      style={{
        backgroundColor: "#0f0D23",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 9999,
        width: "100%",
        paddingVertical: 16,
        marginTop: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={icon.google}
          style={{ height: 20, width: 20 }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 18, color: "white", marginLeft: 8 }}>
          Sign in with Google
        </Text>
      </View>
    </TouchableOpacity>
  );
}
