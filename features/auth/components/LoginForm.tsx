import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EmailPasswordAuth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [isLoading, setIsLoading] = useState(false); // For loading state

  // Handle authentication (login or signup)
  const handleAuth = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      // Here you would implement your actual authentication logic
      // For example, using Firebase, Auth0, or your own backend API

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demonstration purposes
      console.log(`${isLogin ? "Logging in" : "Signing up"} with:`, {
        email,
        password,
      });

      // Reset form after successful auth
      setEmail("");
      setPassword("");

      // You would typically navigate to another screen or set an auth state here
      alert(`${isLogin ? "Login" : "Signup"} successful!`);
    } catch (error: any) {
      console.error("Authentication error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: "white", marginBottom: 8 }}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#a1a1aa"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            color: "white",
          }}
        />
      </View>
      <View style={{ marginBottom: 24 }}>
        <Text style={{ color: "white", marginBottom: 8 }}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="#a1a1aa"
          secureTextEntry
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            color: "white",
          }}
        />
      </View>
      <TouchableOpacity
        onPress={handleAuth}
        disabled={isLoading}
        style={{
          backgroundColor: "#4F46E5",
          borderRadius: 9999,
          width: "100%",
          paddingVertical: 16,
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
          {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 24,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "#a1a1aa" }}>{`Don't have an account?`}</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={{ color: "#4F46E5", fontWeight: "600" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginTop: 16 }}>
        <Text style={{ color: "#a1a1aa", fontSize: 12, textAlign: "center" }}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
