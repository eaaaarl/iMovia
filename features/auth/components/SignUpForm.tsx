import { signUpWithEmail } from "@/libs/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { updateProfile } from "firebase/auth";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { toast } from "sonner-native";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(4, "Name must be at least 4 characters"),
});

export type signUpValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const handeLogin = async (payload: signUpValues) => {
    setLoading(true);
    try {
      const userCredential = await signUpWithEmail({
        email: payload.email,
        password: payload.password,
      });

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: payload.name,
      });

      toast.success("Registered successfully");
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full p-4  rounded-2xl">
      {/* Name Input */}
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

      {/* Submit Button */}
      <TouchableOpacity
        className={`h-12 rounded-lg justify-center items-center mb-5 ${
          loading ? "bg-indigo-600/70" : "bg-indigo-600"
        }`}
        onPress={form.handleSubmit(handeLogin)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-base font-semibold">Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Sign In Link */}
      <View className="flex-row justify-center">
        <Text className="text-gray-400">{`Already have an account? `}</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
          <Text className="text-indigo-400 font-medium">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpForm;
