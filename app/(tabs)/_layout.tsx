import icon from "@/constants/icon";
import { useAppSelector } from "@/libs/redux/hooks";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

function TabIcon({ focused, icon, title }: any) {
  return (
    <View className="items-center justify-center py-1">
      <Image
        source={icon}
        tintColor={focused ? "#AB8BFF" : "#A8B5DB"}
        className="size-6 mb-1"
      />
    </View>
  );
}

export default function TabsLayout() {
  const user = useAppSelector((state) => state.user);

  if (!user || !user.uid) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderTopWidth: 0.5,
          borderTopColor: "#262739",
          height: 65,
          paddingTop: 4,
        },
        tabBarActiveTintColor: "#7B88B9",
        tabBarInactiveTintColor: "#A8B5DB",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icon.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icon.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icon.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
