import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const supportsNativePdfViewer = Platform.OS !== "web" && Constants.appOwnership !== "expo" && Constants.appOwnership !== "guest";

let PdfComponent: React.ComponentType<any> | null = null;

if (supportsNativePdfViewer) {
  try {
    PdfComponent = require("react-native-pdf").default;
  } catch {
    PdfComponent = null;
  }
}

export default function PdfViewerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ uri?: string; title?: string }>();
  const uri = typeof params.uri === "string" ? params.uri : undefined;
  const title = typeof params.title === "string" ? params.title : "PDF Viewer";
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setIsLoading(true);
    setError(null);
  }, [uri]);

  if (!uri) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center px-6">
        <Text className="text-slate-700 text-base">No PDF selected.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 rounded-full bg-teal-600 px-4 py-2">
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text className="flex-1 ml-3 text-base font-semibold text-slate-800" numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View className="flex-1 bg-white">
        {isLoading && !error ? (
          <View className="absolute inset-0 z-10 items-center justify-center bg-white">
            <ActivityIndicator size="large" color="#0f766e" />
            <Text className="mt-3 text-base text-slate-600">Loading PDF...</Text>
          </View>
        ) : null}

        {error ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center text-base text-red-600">{error}</Text>
          </View>
        ) : PdfComponent ? (
          <PdfComponent
            source={{ uri }}
            style={{ flex: 1 }}
            onLoadComplete={() => setIsLoading(false)}
            onError={(err: unknown) => {
              setIsLoading(false);
              setError("Unable to load this PDF.");
              console.error("PDF load error:", err);
            }}
          />
        ) : (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center text-base text-slate-700">
              {supportsNativePdfViewer
                ? "PDF preview is not available on this platform right now."
                : "PDF preview requires a development build or standalone app."}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
