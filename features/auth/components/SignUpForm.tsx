import { signUpWithEmail } from "@/libs/firebase";
import { useAppDispatch } from "@/libs/redux/hooks";
import { setUser } from "@/libs/redux/state/authSlice";
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
import { FIREBASE_AUTH_ERRORS } from "../utils/firebaseAuthErrors";

const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(4, "Name must be at least 4 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type signUpValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const handeSignup = async (payload: signUpValues) => {
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

      dispatch(
        setUser({
          email: user.email || "",
          displayName: user.displayName || "",
          uid: user.uid,
        })
      );

      toast.success("Registered successfully");
      form.reset();

      router.push("/(tabs)");
    } catch (error: any) {
      const errMessage =
        FIREBASE_AUTH_ERRORS[error.code] ||
        "Something went wrong, please try again";
      toast.error(errMessage);
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
