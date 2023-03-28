const path = require("path");

module.exports = function(api) {
  api.cache(true);
  const envPath = path.resolve(__dirname, `../../`, `.env`);
  require("dotenv").config({ path: envPath });
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: "../../.env",
          allowlist: ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"],
          safe: false,
          allowUndefined: true,
        },
      ],
      "nativewind/babel", 
      require.resolve("expo-router/babel")
    ],
  };
};
