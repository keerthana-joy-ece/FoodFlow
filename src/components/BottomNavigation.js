
import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "../constants/colors";

const tabs = [
  { name: "Home", icon: "⌂" },
  { name: "Order", icon: "◷" },
  { name: "Cart", icon: "🛒" },
  { name: "Profile", icon: "◎" },
];

const BottomNavigation = ({
  activeTab = "Home",
  onTabPress = () => {},
}) => {

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      {tabs.map((tab) => {

        const isActive = activeTab === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.icon,
                isActive && styles.activeIcon,
              ]}
            >
              {tab.icon}
            </Text>

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {tab.name}
            </Text>

          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 4,
  },

  icon: {
    fontSize: 23,
    color: COLORS.grey,
    marginBottom: 4,
  },

  activeIcon: {
    color: COLORS.primary,
  },

  label: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: COLORS.grey,
  },

  activeLabel: {
    color: COLORS.primary,
    fontFamily: "Poppins_700Bold",
  },

});

export default BottomNavigation;
