import { Ionicons } from "@expo/vector-icons";
import { Directory, File, Paths } from 'expo-file-system';
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import "../../global.css";

// File Status Icon Component (matching the document outline + badge style)
const FileStatusIcon = ({ color, downloaded }: { color: string; downloaded: boolean }) => {
  const iconColor = downloaded ? "#0d9488" : color;
  const badgeColor = downloaded ? "#10b981" : color;
  const badgeIcon = downloaded ? "checkmark-sharp" : "arrow-down-sharp";

  return (
    <View className="relative w-10 h-10 items-center justify-center">
      <Ionicons name="document-text-outline" size={26} color={iconColor} />
      <View className="absolute bottom-1 right-1 bg-white rounded-full p-[1px] shadow-sm">
        <View
          style={{ backgroundColor: badgeColor }}
          className="w-4 h-4 rounded-full items-center justify-center"
        >
          <Ionicons name={badgeIcon as any} size={10} color="#ffffff" />
        </View>
      </View>
    </View>
  );
};

export default function Index() {
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = React.useState(insets.top + 260);
  const bottomTabHeight = 54 + Math.max(insets.bottom, Platform.OS === "ios" ? 24 : 12);

  const chapters = [
    {
      id: 1,
      title: "স্বাভাবিক সংখ্যা ও ভগ্নাংশ",
      downloaded: true,
      color: "#0d9488", // Teal
    },
    {
      id: 2,
      title: "অনুপাতে ও শতকরা",
      downloaded: true,
      color: "#10b981", // Emerald
    },
    {
      id: 3,
      title: "পূর্ণসংখ্যা",
      downloaded: true,
      color: "#84cc16", // Lime
    },
    {
      id: 4,
      title: "বীজগণিতীয় রাশি",
      downloaded: false,
      color: "#3b82f6", // Blue
    },
    {
      id: 5,
      title: "সরল সমীকরণ",
      downloaded: false,
      color: "#8b5cf6", // Purple
    },
    {
      id: 6,
      title: "জ্যামিতির মৌলিক ধারণা",
      downloaded: false,
      color: "#ec4899", // Pink
    },
    {
      id: 7,
      title: "ব্যবহারিক জ্যামিতি",
      downloaded: false,
      color: "#f97316", // Orange
    },
    {
      id: 8,
      title: "তথ্য ও উপাত্ত",
      downloaded: false,
      color: "#eab308", // Yellow
    },
  ];

// Download Start
  async function downloadPdf(chapterId: number) {
    const url = 'https://scared-chocolate-jvsmjwyi.edgeone.dev/অধ্যায়%20১_%20স্বাভাবিক%20সংখ্যা%20ও%20ভগ্নাংশ.pdf';
    const destinationDir = new Directory(Paths.cache, 'pdfs');
    const destinationFile = new File(Paths.cache, 'pdfs', `chapter-${chapterId}.pdf`);

    try {
      destinationDir.create({ idempotent: true });
      const output = await File.downloadFileAsync(url, destinationFile, { idempotent: true });
      console.log(output.exists); // true
      console.log(output.uri); // path to the downloaded file, e.g., '${cacheDirectory}/pdfs/chapter-1.pdf'
      alert('PDF downloaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to download the PDF. Please try again later.');
    }
  }
  // Download End
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }} edges={["left", "right"]}>
      <StatusBar style="light" />

      {/* Header Container (Sticky / Absolutely Positioned) */}
      <View
        onLayout={(event) => {
          setHeaderHeight(event.nativeEvent.layout.height);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          elevation: 10,
        }}
      >
        {/* Header Banner with LinearGradient */}
        <LinearGradient
          colors={["#0a5c5a", "#0b666a", "#0d9488"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="pb-6"
          style={{ paddingTop: insets.top + 16 }}
        >
          {/* Main Info Row */}
          <View className="flex-row justify-between items-center px-6">
            <View className="flex-1 pr-4">
              <Text className="text-white text-3xl font-extrabold tracking-tight">
                Class 6 Math
              </Text>
              <Text className="text-teal-100 text-lg font-bold mt-0.5 tracking-wide">
                Solution Guide
              </Text>
            </View>
            <View className="relative">
              {/* Premium 3D Book Illustration */}
              <Image
                source={require("../../assets/images/math_illustration.png")}
                style={{ width: 110, height: 110 }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Bengali text section */}
          <View className="px-6 mt-4">
            <Text className="text-white text-xl font-bold tracking-wide">
              ষষ্ঠ শ্রেণির গণিত সমাধান গাইড
            </Text>
            <Text className="text-teal-50 text-xs mt-1 opacity-90 font-medium">
              অধ্যায়ভিত্তিক সহজ ও বিস্তারিত সমাধান
            </Text>
          </View>
        </LinearGradient>

        {/* Wavy shape overlay below the gradient banner */}
        {/* <View className="w-full h-12 -mt-1 bg-transparent overflow-hidden">
          <Svg
            height="48"
            width="100%"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <Path
              fill="#f8fafc" // Slate-50 background of the ScrollView
              d="M0,60 C400,120 1000,10 1440,0 L1440,120 L0,120 Z"
            />
          </Svg>
        </View> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: bottomTabHeight + 24,
        }}
        className="flex-1"
      >
        {/* Chapters Cards List */}
        <View className="px-4 pt-4">
          {chapters.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => downloadPdf(item.id)}
              className="flex-row items-center bg-white mb-3 p-3.5 rounded-2xl border border-slate-100/80"
              style={{
                shadowColor: "#0f172a",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              {/* Colored Chapter Index Box */}
              <View
                style={{ backgroundColor: item.color }}
                className="w-12 h-12 rounded-xl items-center justify-center shadow-sm"
              >
                <Text className="text-white text-xl font-extrabold">{item.id}</Text>
              </View>

              {/* Chapter Title */}
              <Text className="flex-1 ml-4 text-[15px] font-semibold text-slate-800 leading-snug">
                {item.title}
              </Text>

              {/* Chevron Right */}
              <View className="mr-3">
                <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
              </View>

              {/* File Icon Status */}
              <FileStatusIcon color={item.color} downloaded={item.downloaded} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

