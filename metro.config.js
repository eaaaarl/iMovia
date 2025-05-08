const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get the default Expo config
const config = getDefaultConfig(__dirname);

// Add external folders to be watched
config.watchFolders = [
  path.resolve(__dirname, "features"), // 👈 add any folder outside `app/` that you import from
];

// Optionally add extraNodeModules if using absolute imports
config.resolver.extraNodeModules = {
  features: path.resolve(__dirname, "features"),
};

module.exports = withNativeWind(config, { input: "./global.css" });
