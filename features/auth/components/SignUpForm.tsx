import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "../hooks/useSignUp";

const SignUpForm = () => {
  const { handeSignup, loading, form, toast, router } = useSignUp();
  return (
    <View className="w-full p-4  rounded-2xl">
      {toast !== "" && (
        <View className="bg-blue-500/90 rounded-md p-3 mb-4 flex-row items-center">
          <Ionicons
            name="alert-circle-sharp"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white text-sm flex-1">{toast}</Text>
        </View>
      )}
      <View className="mb-4">
        <Text className="text-white mb-1.5 text-sm font-medium">Name</Text>
        <Controller
          control={form.control}
          name="name"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              className={`bg-white/10 h-12 rounded-lg px-4 text-white ${
                form.formState.errors.name ? "border border-red-500" : ""
              }`}
              placeholder="Enter your name"
              placeholderTextColor="#a1a1aa"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {form.formState.errors && (
          <Text className="text-red-500 text-xs mt-1">
            {form.formState.errors.name?.message}
          </Text>
        )}
      </View>

      {/* Email Input */}
      <View className="mb-4">
        <Text className="text-white mb-1.5 text-sm font-medium">Email</Text>
        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              className={`bg-white/10 h-12 rounded-lg px-4 text-white ${
                form.formState.errors.email ? "border border-red-500" : ""
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

      {/* Password Input */}
      <View className="mb-4">
        <Text className="text-white mb-1.5 text-sm font-medium">Password</Text>
        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              className={`bg-white/10 h-12 rounded-lg px-4 text-white ${
                form.formState.errors.password ? "border border-red-500" : ""
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
      <View className="mt-4">
        <Text className="text-white mb-1.5 text-sm font-medium">
          Confirm Password
        </Text>
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              className={`bg-white/10 h-12 rounded-lg px-4 text-white ${
                form.formState.errors.confirmPassword
                  ? "border border-red-500"
                  : ""
              }`}
              placeholder="Confirm your password"
              placeholderTextColor="#a1a1aa"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {form.formState.errors.confirmPassword && (
          <Text className="text-red-500 text-xs mt-1">
            {form.formState.errors.confirmPassword.message}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className={`h-12 rounded-lg justify-center items-center mt-10 ${
          loading ? "bg-indigo-600/70" : "bg-indigo-600"
        }`}
        onPress={form.handleSubmit(handeSignup)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-base font-semibold">Sign Up</Text>
        )}
      </TouchableOpacity>

      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-400">{`Already have an account? `}</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
          <Text className="text-indigo-400 font-medium">Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginTop: 16 }}>
        <Text style={{ color: "#a1a1aa", fontSize: 12, textAlign: "center" }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default SignUpForm;
