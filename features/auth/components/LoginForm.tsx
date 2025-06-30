import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useLogin } from "../hooks/useLogin";
import GoogleSignInButton from "./GoogleSignInButton";

export default function EmailPasswordAuth() {
  const { handleSubmit, isLoading, router, toast, form, setToast } = useLogin();
  return (
    <View className="w-full">
      {toast !== "" && (
        <View className="bg-blue-500/90 rounded-md p-3 mb-4 flex-row items-center">
          <Ionicons
            name="information-circle"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white text-sm flex-1">{toast}</Text>
        </View>
      )}
      <View className="mb-4">
        <Text className="text-white mb-1.5 text-sm font-medium">Email</Text>
        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              className={`bg-white/10 h-12 rounded-lg px-4 text-white ${form.formState.errors.email ? "border border-red-500" : ""
                }`}
              placeholder="Enter your email"
              placeholderTextColor="#a1a1aa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {form.formState.errors && (
          <Text className="text-red-500 text-xs mt-1">
            {form.formState.errors.email?.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <Text className="text-white mb-1.5 text-sm font-medium">Password</Text>
        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              className={`bg-white/10 h-12 rounded-lg px-4 text-white ${form.formState.errors.password ? "border border-red-500" : ""
                }`}
              placeholder="Enter your password"
              placeholderTextColor="#a1a1aa"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {form.formState.errors.password && (
          <Text className="text-red-500 text-xs mt-1">
            {form.formState.errors.password.message}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className={`h-12 rounded-lg justify-center items-center mt-4 ${isLoading ? "bg-indigo-600/70" : "bg-indigo-600"
          }`}
        onPress={form.handleSubmit(handleSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-base font-semibold">Login</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row items-center my-6">
        <View className="flex-1 h-[1px] bg-white/10" />
        <Text className="mx-4 text-white/60">or</Text>
        <View className="flex-1 h-[1px] bg-white/10" />
      </View>

      <GoogleSignInButton />

      <View className="w-full flex justify-center items-center my-4">
        <TouchableOpacity
          onPress={() => setToast("This feature will be available soon!")}
          disabled={isLoading}
          className="text-indigo-400 text-sm"
        >
          <Text className="text-white font-semibold">Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-400">{`Don't have an account? `}</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text className="text-indigo-400 font-medium">Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginTop: 16 }}>
        <Text style={{ color: "#a1a1aa", fontSize: 12, textAlign: "center" }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
