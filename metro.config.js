const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

let config = getDefaultConfig(__dirname);

config = withNativeWind(config, { input: "./global.css" });

config.watchFolders = [path.resolve(__dirname, "features")];

config.resolver.extraNodeModules = {
  features: path.resolve(__dirname, "features"),
};

config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes("cjs")) {
  config.resolver.sourceExts.push("cjs");
}

config.resolver.unstable_enablePackageExports = false;

module.exports = config;
