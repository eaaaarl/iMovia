import { loginWithEmail } from "@/libs/firebase";
import { useAppDispatch } from "@/libs/redux/hooks";
import { setUser } from "@/libs/redux/state/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
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

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type signInValues = z.infer<typeof signInSchema>;

export default function EmailPasswordAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const handleSubmit = async (payload: signInValues) => {
    setIsLoading(true);
    try {
      const authUser = await loginWithEmail({
        email: payload.email,
        password: payload.password,
      });

      dispatch(
        setUser({
          displayName: authUser.user.displayName || "",
          email: authUser.user.email || "",
          uid: authUser.user.uid,
        })
      );

      router.replace("/(tabs)");
      form.reset();
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email and password");
      } else {
        console.log("Authentication error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="w-full">
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

      <TouchableOpacity
        className={`h-12 rounded-lg justify-center items-center mt-4 ${
          isLoading ? "bg-indigo-600/70" : "bg-indigo-600"
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

      <View className="w-full flex justify-center items-center my-4">
        <TouchableOpacity
          onPress={() => toast.info("This feature will be available soon!")}
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
