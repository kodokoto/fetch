import { ExpoConfig, ConfigContext } from "@expo/config";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_Y2FyaW5nLXB1cC0zMi5jbGVyay5hY2NvdW50cy5kZXYk";

export default function defineConfig(_ctx: ConfigContext): ExpoConfig {
  return {
    name: "fetch",
    scheme: "fetch",
    slug: "fetch",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    extra: {
        eas: {
            projectId: "your-eas-project-id",
        },
        CLERK_PUBLISHABLE_KEY
    },
    web: {
      favicon: "./assets/favicon.png"
    }
  };
}