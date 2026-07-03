import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, Text, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../../global.css";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "অধ্যায়",
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "বুকমার্ক",
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "সম্প্রতি দেখা",
        }}
      />
    </Tabs>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        elevation: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        paddingBottom: Math.max(insets.bottom, Platform.OS === "ios" ? 24 : 12),
        paddingTop: 12,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName: any = "book-outline";
        if (route.name === "index") {
          iconName = isFocused ? "book" : "book-outline";
        } else if (route.name === "bookmark") {
          iconName = isFocused ? "bookmark" : "bookmark-outline";
        } else if (route.name === "history") {
          iconName = isFocused ? "time" : "time-outline";
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.85}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Ionicons
              name={iconName}
              size={22}
              color={isFocused ? "#0d9488" : "#9ca3af"}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: isFocused ? "#0d9488" : "#64748b",
                marginTop: 4,
              }}
              numberOfLines={1}
            >
              {label}
            </Text>
            {isFocused && (
              <View
                style={{
                  position: "absolute",
                  bottom: -8,
                  width: 48,
                  height: 3,
                  backgroundColor: "#0d9488",
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
