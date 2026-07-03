import { View, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function BookmarkScreen() {
  const insets = useSafeAreaInsets();
  const bottomTabHeight = 54 + Math.max(insets.bottom, Platform.OS === "ios" ? 24 : 12);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fafb" }} edges={["left", "right"]}>
      <LinearGradient
        colors={["#0a5c5a", "#0d9488"]}
        className="pb-8 px-6 rounded-b-[40px] shadow-lg"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Text className="text-white text-2xl font-bold text-center">বুকমার্ক</Text>
        <Text className="text-teal-100 text-sm text-center mt-1">
          আপনার সংরক্ষিত গণিত সমাধানসমূহ
        </Text>
      </LinearGradient>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24, paddingBottom: bottomTabHeight }}>
        <View className="w-24 h-24 bg-teal-50 rounded-full items-center justify-center mb-4 border border-teal-100">
          <Ionicons name="bookmark-outline" size={48} color="#0d9488" />
        </View>
        <Text className="text-gray-800 text-lg font-bold text-center">
          বুকমার্ক করা কোনো অধ্যায় নেই
        </Text>
        <Text className="text-gray-500 text-sm text-center mt-2 px-8">
          যেকোনো অধ্যায়ের সমাধান পড়ার সময় বুকমার্ক আইকনে চাপ দিয়ে তা এখানে জমা করে রাখতে পারবেন।
        </Text>
      </View>
    </SafeAreaView>
  );
}
