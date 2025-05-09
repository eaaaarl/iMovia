import { useAppSelector } from "@/libs/redux/hooks";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const user = useAppSelector((state) => state.user);

  if (user.uid) {
    return <Redirect href={"/(tabs)"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
