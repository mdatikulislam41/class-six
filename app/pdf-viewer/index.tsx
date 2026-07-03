import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function PdfViewerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ uri?: string; title?: string }>();
  const uri = typeof params.uri === "string" ? params.uri : undefined;
  const title = typeof params.title === "string" ? params.title : "PDF Viewer";

  React.useEffect(() => {
    if (!uri) return;

    const openPdf = async () => {
      try {
        await WebBrowser.openBrowserAsync(uri);
      } catch (error) {
        console.error("PDF open error:", error);
      }
    };

    openPdf();
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

      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-slate-700 text-base text-center">
          Opening PDF in your device viewer...
        </Text>
      </View>
    </SafeAreaView>
  );
}
