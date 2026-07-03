import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import "../../global.css";

export default function HistoryScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <LinearGradient
        colors={["#0a5c5a", "#0d9488"]}
        className="pt-16 pb-8 px-6 rounded-b-[40px] shadow-lg"
      >
        <Text className="text-white text-2xl font-bold text-center">সম্প্রতি দেখা</Text>
        <Text className="text-teal-100 text-sm text-center mt-1">
          আপনার সম্প্রতি পড়া সমাধানগুলোর তালিকা
        </Text>
      </LinearGradient>

      <View className="flex-1 items-center justify-center p-6">
        <View className="w-24 h-24 bg-teal-50 rounded-full items-center justify-center mb-4 border border-teal-100">
          <Ionicons name="time-outline" size={48} color="#0d9488" />
        </View>
        <Text className="text-gray-800 text-lg font-bold text-center">
          কোনো ইতিহাস নেই
        </Text>
        <Text className="text-gray-500 text-sm text-center mt-2 px-8">
          আপনি যে অধ্যায়গুলো শেষ করবেন বা পড়বেন, তা এখানে স্বয়ংক্রিয়ভাবে দেখাবে।
        </Text>
      </View>
    </View>
  );
}
