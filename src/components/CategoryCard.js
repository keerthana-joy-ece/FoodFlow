
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { COLORS } from "../constants/colors";

const CategoryCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>

      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 65,
    marginHorizontal: 5,
  },

  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 25,
  },

  name: {
    fontSize: 11,
    color: COLORS.black,
    marginTop: 6,
    fontFamily: "Poppins_400Regular",
  },
});

export default CategoryCard;
