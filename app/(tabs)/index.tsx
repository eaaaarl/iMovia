import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView className="justify-center items-center  bg-primary flex-1">
      <Text className="text-white">Index</Text>
      <Link href={"/sign-in"} className="text-white">
        Sign In
      </Link>
    </SafeAreaView>
  );
};

export default Index;
