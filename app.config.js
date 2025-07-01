export default {
  expo: {
    name: "iMovia",
    slug: "iMovia",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.eaaaarl.imovia",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.eaaaarl.imovia",
      permissions: ["INTERNET"],
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-web-browser",
      ["@react-native-google-signin/google-signin"],
    ],
    experiments: {
      typedRoutes: true,
    },
    owner: "eaa-aarl",
    extra: {
      router: {},
      eas: {
        projectId: "98e8c09b-f6c5-4fa8-b8ea-efd8fbfa14a9",
      },
    },
  },
};
